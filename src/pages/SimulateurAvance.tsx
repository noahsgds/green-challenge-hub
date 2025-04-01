import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calculator, BarChart3, Leaf, Banknote, FileText, Mail, AlertTriangle, 
         Maximize2, X, Table, Download, Share2, Info, Save, BarChart, Layers, Trash2, Target,
         ArrowUpCircle, CheckCircle2, Lightbulb, TrendingUp, Award, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

console.log("SimulateurAvance rendu");

// Définir les types pour Chart.js
declare global {
  interface Window {
    Chart: any;
    html2pdf: any;
  }
}

// Interface pour les résultats des calculs
interface CalculResults {
  totalBaseCo2: number;
  totalCo2Economie: number;
  totalEuro: number;
  coutTotal: number;
  resultatNet: number;
  nbEmployes: number;
  tauxCovoiturage: number;
  tauxTeletravail: number;
  tauxDechets: number;
  prixGoFusion: number;
  employesCovoiturageSupplementaires: number;
  detailsCo2: {
    covoiturage: number;
    dechets: number;
    velo: number;
    joursEteints: number;
    surfaceChauffee: number;
    teletravail: number;
    stockageCloud: number;
    nuitsHotel: number;
    volsAvion: number;
  };
  detailsEconomies: {
    covoiturage: number;
    dechets: number;
    velo: number;
    joursEteints: number;
    surfaceChauffee: number;
    teletravail: number;
    stockageCloud: number;
    nuitsHotel: number;
    volsAvion: number;
  };
  nom?: string;
  dateCreation?: string;
}

// Interface pour les instances de graphiques
interface ChartInstances {
  co2?: any;
  financier?: any;
  repartition?: any;
  progression?: any;
  comparison?: any;
  objectifs?: any;
}

// Interface pour les entrées utilisateur
interface UserInputs {
  nbEmployes: number;
  tauxCovoiturage: number;
  tauxTeletravail: number;
  tauxDechets: number;
  prixGoFusion: number;
}

// Interface pour les objectifs
interface Objectif {
  nom: string;
  co2: number;
  euro: number;
  dateCreation: string;
  dateCible: string;
}

// Interface pour les recommandations
interface Recommandation {
  titre: string;
  description: string;
  impact: number; // Score d'impact de 1 à 10
  difficulte: number; // Score de difficulté de 1 à 10
  categories: string[];
  icon: string;
}

const SimulateurAvance: React.FC = () => {
  // Variables d'état pour les entrées utilisateur
  const [effectif, setEffectif] = useState<number>(100);
  const [covoiturage, setCovoiturage] = useState<number>(10);
  const [dechets, setDechets] = useState<number>(50);
  const [velo, setVelo] = useState<number>(5);
  const [joursEteints, setJoursEteints] = useState<number>(4);
  const [surfaceChauffee, setSurfaceChauffee] = useState<number>(1000);
  const [teletravail, setTeletravail] = useState<number>(20);
  const [stockageCloud, setStockageCloud] = useState<number>(500);
  const [nuitsHotel, setNuitsHotel] = useState<number>(50);
  const [volsAvion, setVolsAvion] = useState<number>(10);
  
  // Variable d'état pour les résultats
  const [resultats, setResultats] = useState<CalculResults>({
    totalBaseCo2: 0,
    totalCo2Economie: 0,
    totalEuro: 0,
    coutTotal: 0,
    resultatNet: 0,
    nbEmployes: 0,
    tauxCovoiturage: 0,
    tauxTeletravail: 0,
    tauxDechets: 0,
    prixGoFusion: 0,
    employesCovoiturageSupplementaires: 0,
    detailsCo2: {
      covoiturage: 0,
      dechets: 0,
      velo: 0,
      joursEteints: 0,
      surfaceChauffee: 0,
      teletravail: 0,
      stockageCloud: 0,
      nuitsHotel: 0,
      volsAvion: 0
    },
    detailsEconomies: {
      covoiturage: 0,
      dechets: 0,
      velo: 0,
      joursEteints: 0,
      surfaceChauffee: 0,
      teletravail: 0,
      stockageCloud: 0,
      nuitsHotel: 0,
      volsAvion: 0
    }
  });
  
  // Références pour les graphiques
  const co2ChartRef = useRef<HTMLCanvasElement>(null);
  const financierChartRef = useRef<HTMLCanvasElement>(null);
  const repartitionChartRef = useRef<HTMLCanvasElement>(null);
  const progressionChartRef = useRef<HTMLCanvasElement>(null);
  
  // Stockage des instances de graphiques
  const charts: ChartInstances = {};

  // Ajout d'un état pour gérer les modes d'affichage des graphiques
  const [fullscreenChart, setFullscreenChart] = useState<string | null>(null);
  const [showDetailedData, setShowDetailedData] = useState<boolean>(false);

  // Ajout d'un état pour gérer les scénarios
  const [scenarios, setScenarios] = useState<CalculResults[]>([]);
  const [showScenarios, setShowScenarios] = useState<boolean>(false);
  const [scenarioName, setScenarioName] = useState<string>('');

  // État pour les entrées utilisateur
  const [inputs, setInputs] = useState<UserInputs>({
    nbEmployes: 100,
    tauxCovoiturage: 10,
    tauxTeletravail: 20,
    tauxDechets: 30,
    prixGoFusion: 5000
  });

  // Ajout d'états pour les objectifs
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [showObjectifs, setShowObjectifs] = useState<boolean>(false);
  const [nouvelObjectif, setNouvelObjectif] = useState<Objectif>({
    nom: '',
    co2: 0,
    euro: 0,
    dateCreation: new Date().toISOString(),
    dateCible: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
  });

  // Effet pour charger les scripts externes
  useEffect(() => {
    console.log("SimulateurAvance useEffect est exécuté - montage du composant");
    
    // Fonction pour charger un script
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Vérifier si le script est déjà chargé
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Échec du chargement du script: ${src}`));
        document.head.appendChild(script);
      });
    };
    
    // Charger les scripts nécessaires
    const loadAllScripts = async () => {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        await loadScript('https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
        // Initialiser les calculs après que tous les scripts sont chargés
        calculerEconomies();
      } catch (error) {
        console.error('Erreur lors du chargement des scripts:', error);
      }
    };
    
    loadAllScripts();
    
    // Nettoyage
    return () => {
      console.log("SimulateurAvance useEffect - nettoyage (démontage)");
      if (charts.financier) {
        charts.financier.destroy();
      }
      if (charts.co2) {
        charts.co2.destroy();
      }
      if (charts.repartition) {
        charts.repartition.destroy();
      }
      if (charts.progression) {
        charts.progression.destroy();
      }
    };
  }, []);

  // Effet pour mettre à jour les graphiques quand les résultats changent
  useEffect(() => {
    if (resultats.totalCo2Economie > 0) {
      // Délai court pour permettre au DOM de se mettre à jour avant de générer les graphiques
      const timeoutId = setTimeout(() => {
        updateCharts();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [resultats]);

  // Fonction pour calculer les économies
  const calculerEconomies = () => {
    const effectifVal = parseInt(effectif.toString()) || 1;
    const covoiturageVal = parseInt(covoiturage.toString()) || 0;
    const dechetsVal = parseInt(dechets.toString()) || 0;
    const veloVal = parseInt(velo.toString()) || 0;
    const joursEteintsVal = parseInt(joursEteints.toString()) || 0;
    const surfaceChauffeVal = parseInt(surfaceChauffee.toString()) || 0;
    const teletravailVal = parseInt(teletravail.toString()) || 0;
    const stockageCloudVal = parseInt(stockageCloud.toString()) || 0;
    const nuitsHotelVal = parseInt(nuitsHotel.toString()) || 0;
    const volsAvionVal = parseInt(volsAvion.toString()) || 0;

    const baseCo2Employes = effectifVal * 2;
    const baseCo2Surface = surfaceChauffeVal * 0.05;
    const baseCo2Cloud = stockageCloudVal * 0.003;
    const baseCo2Hotel = nuitsHotelVal * 0.015;
    const baseCo2Avion = volsAvionVal * 0.5;
    const totalBaseCo2 = baseCo2Employes + baseCo2Surface + baseCo2Cloud + baseCo2Hotel + baseCo2Avion;

    const consoElectriqueBase = effectifVal * 1500;
    const co2Covoiturage = covoiturageVal * 0.375;
    const co2Dechets = dechetsVal * 0.03;
    const co2Velo = veloVal * 0.375;
    const co2JoursEteints = joursEteintsVal * (consoElectriqueBase / 250 * 0.06 / 1000);
    const co2SurfaceChauffee = (surfaceChauffeVal * 0.02) * (1 - teletravailVal / 100);
    const co2Teletravail = (effectifVal * 0.5) * (teletravailVal / 100);
    const co2StockageCloud = stockageCloudVal * 0.003;
    const co2NuitsHotel = nuitsHotelVal * 0.015;
    const co2VolsAvion = volsAvionVal * 0.5;
    
    const totalCo2Economie = co2Covoiturage + co2Dechets + co2Velo + co2JoursEteints + 
                             co2SurfaceChauffee + co2Teletravail - co2StockageCloud - 
                             co2NuitsHotel - co2VolsAvion;

    const euroCovoiturage = covoiturageVal * 187.5;
    const euroDechets = dechetsVal * 1.5;
    const euroVelo = veloVal * 75;
    const euroJoursEteints = joursEteintsVal * (consoElectriqueBase / 250 * 0.1 / 10);
    const euroSurfaceChauffee = surfaceChauffeVal * 0.5 * (1 - teletravailVal / 100);
    const euroTeletravail = effectifVal * 50 * (teletravailVal / 100);
    const euroStockageCloud = stockageCloudVal * 0.02;
    const euroNuitsHotel = nuitsHotelVal * 100;
    const euroVolsAvion = volsAvionVal * 200;
    
    const totalEuro = euroCovoiturage + euroDechets + euroVelo + euroJoursEteints + 
                      euroSurfaceChauffee + euroTeletravail - euroStockageCloud - 
                      euroNuitsHotel - euroVolsAvion;

    let coutLicences = 0;
    let licencesRestantes = effectifVal;
    
    if (licencesRestantes > 0) {
      const licencesPalier1 = Math.min(licencesRestantes, 1000);
      coutLicences += licencesPalier1 * 10;
      licencesRestantes -= licencesPalier1;
    }
    if (licencesRestantes > 0) {
      const licencesPalier2 = Math.min(licencesRestantes, 500);
      coutLicences += licencesPalier2 * 6;
      licencesRestantes -= licencesPalier2;
    }
    if (licencesRestantes > 0) {
      const licencesPalier3 = Math.min(licencesRestantes, 500);
      coutLicences += licencesPalier3 * 4;
      licencesRestantes -= licencesPalier3;
    }
    if (licencesRestantes > 0) {
      coutLicences += licencesRestantes * 1;
    }
    
    const coutPacks = 1500 * 12 + 500 * 12;
    const coutTotal = coutLicences + coutPacks;
    const resultatNet = totalEuro - coutTotal;

    let employesCovoiturageSupplementaires;
    if (resultatNet < 0) {
      employesCovoiturageSupplementaires = Math.ceil(Math.abs(resultatNet) / 187.5);
    }
    
    // Mettre à jour les résultats
    setResultats({
      totalBaseCo2,
      totalCo2Economie,
      totalEuro,
      coutTotal,
      resultatNet,
      nbEmployes: effectifVal,
      tauxCovoiturage: covoiturageVal,
      tauxTeletravail: teletravailVal,
      tauxDechets: dechetsVal,
      prixGoFusion: 5000,
      employesCovoiturageSupplementaires,
      detailsCo2: {
        covoiturage: co2Covoiturage,
        dechets: co2Dechets,
        velo: co2Velo,
        joursEteints: co2JoursEteints,
        surfaceChauffee: co2SurfaceChauffee,
        teletravail: co2Teletravail,
        stockageCloud: co2StockageCloud,
        nuitsHotel: co2NuitsHotel,
        volsAvion: co2VolsAvion
      },
      detailsEconomies: {
        covoiturage: euroCovoiturage,
        dechets: euroDechets,
        velo: euroVelo,
        joursEteints: euroJoursEteints,
        surfaceChauffee: euroSurfaceChauffee,
        teletravail: euroTeletravail,
        stockageCloud: euroStockageCloud,
        nuitsHotel: euroNuitsHotel,
        volsAvion: euroVolsAvion
      }
    });
    
    // Mettre à jour les graphiques une fois les résultats calculés
    setTimeout(() => {
      updateCharts();
    }, 100);
  };

  // Fonction pour gérer les changements d'input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    setter(isNaN(value) ? 0 : value);
  };

  // Formatter les nombres avec séparateurs de milliers
  const formatNumber = (num: number) => {
    // Si le nombre est inférieur à 0.1 et non nul, formatage avec plus de décimales
    if (Math.abs(num) < 0.1 && Math.abs(num) > 0) {
      return new Intl.NumberFormat('fr-FR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(num);
    }
    
    // Si le nombre est un nombre entier, afficher sans décimales
    if (Number.isInteger(num)) {
      return new Intl.NumberFormat('fr-FR', { 
        maximumFractionDigits: 0 
      }).format(num);
    }
    
    // Par défaut, afficher avec une décimale
    return new Intl.NumberFormat('fr-FR', { 
      minimumFractionDigits: 1,
      maximumFractionDigits: 1 
    }).format(num);
  };

  // Fonction pour mettre à jour les graphiques
  const updateCharts = () => {
    updateCo2Chart();
    updateFinancierChart();
    updateRepartitionChart();
    updateProgressionChart();
  };

  // Fonction pour mettre à jour le graphique CO2
  const updateCo2Chart = () => {
    const ctx = co2ChartRef.current?.getContext('2d');
    if (!ctx) return;
    
    if (charts.co2) {
      charts.co2.destroy();
    }
    
    // Configuration améliorée du graphique
    charts.co2 = new (window as any).Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Économies', 'Consommation restante'],
        datasets: [{
          data: [
            resultats.totalCo2Economie, 
            Math.max(0, resultats.totalBaseCo2 - resultats.totalCo2Economie)
          ],
          backgroundColor: ['#209653', '#E2E8F0'],
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${formatNumber(value)} tonnes CO₂ (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };

  // Fonction pour mettre à jour le graphique financier
  const updateFinancierChart = () => {
    const ctx = financierChartRef.current?.getContext('2d');
    if (!ctx) return;
    
    if (charts.financier) {
      charts.financier.destroy();
    }
    
    charts.financier = new (window as any).Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Économies', 'Coût GoFusion'],
        datasets: [{
          data: [resultats.totalEuro, resultats.coutTotal],
          backgroundColor: ['#209653', '#E2E8F0'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${formatNumber(value)} € (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };

  // Fonction pour mettre à jour le graphique de répartition
  const updateRepartitionChart = () => {
    const ctx = repartitionChartRef.current?.getContext('2d');
    if (!ctx) return;
    
    if (charts.repartition) {
      charts.repartition.destroy();
    }
    
    // Récupérer uniquement les valeurs positives des économies
    const detailsObj = resultats.detailsEconomies;
    const filteredDetails = Object.entries(detailsObj)
      .filter(([_, value]) => value > 0)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, number>);
    
    const labelMap: Record<string, string> = {
      covoiturage: 'Covoiturage',
      dechets: 'Tri des déchets',
      velo: 'Mobilité douce',
      joursEteints: 'Extinction appareils',
      surfaceChauffee: 'Chauffage optimisé',
      teletravail: 'Télétravail',
      stockageCloud: 'Stockage cloud',
      nuitsHotel: 'Nuits d\'hôtel',
      volsAvion: 'Vols en avion'
    };
    
    const labels = Object.keys(filteredDetails).map(key => labelMap[key] || key);
    const data = Object.values(filteredDetails);
    const colors = [
      '#209653', '#27AE60', '#2ECC71', '#68D391', '#9AE6B4',
      '#C6F6D5', '#F0FFF4', '#81C784', '#4CAF50'
    ];
    
    // Configuration améliorée du graphique
    charts.repartition = new (window as any).Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 1,
          borderColor: '#FFFFFF',
          hoverBorderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 800
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${formatNumber(value)} € (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  };

  // Fonction pour mettre à jour le graphique de progression
  const updateProgressionChart = () => {
    const ctx = progressionChartRef.current?.getContext('2d');
    if (!ctx) return;
    
    if (charts.progression) {
      charts.progression.destroy();
    }
    
    const co2Base = resultats.totalCo2Economie;
    const euroBase = resultats.totalEuro;
    
    // Projection sur 5 ans avec un taux de croissance progressif
    const co2Data = [0];
    const euroData = [0];
    
    // Taux de croissance amélioré : 10% la première année, puis +5% par an supplémentaire
    for (let i = 1; i <= 5; i++) {
      // Formule plus réaliste: base * (1 + 0.1 + (i-1)*0.05) 
      // Année 1: +10%, Année 2: +15%, Année 3: +20%, etc.
      co2Data.push(co2Base * (1 + 0.1 + (i-1) * 0.05));
      euroData.push(euroBase * (1 + 0.1 + (i-1) * 0.05));
    }
    
    // Configuration améliorée du graphique avec plus d'options visuelles
    charts.progression = new (window as any).Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Aujourd\'hui', 'Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5'],
        datasets: [
          {
            label: 'Tonnes CO₂ économisées',
            data: co2Data,
            backgroundColor: [
              'rgba(220, 220, 220, 0.7)',
              'rgba(32, 150, 83, 0.7)',
              'rgba(32, 150, 83, 0.75)',
              'rgba(32, 150, 83, 0.8)',
              'rgba(32, 150, 83, 0.85)',
              'rgba(32, 150, 83, 0.9)'
            ],
            borderColor: [
              'rgba(220, 220, 220, 1)',
              'rgba(32, 150, 83, 1)',
              'rgba(32, 150, 83, 1)',
              'rgba(32, 150, 83, 1)',
              'rgba(32, 150, 83, 1)',
              'rgba(32, 150, 83, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'y',
          },
          {
            label: 'Euros économisés',
            data: euroData,
            backgroundColor: [
              'rgba(220, 220, 220, 0.7)',
              'rgba(111, 207, 151, 0.7)',
              'rgba(111, 207, 151, 0.75)',
              'rgba(111, 207, 151, 0.8)',
              'rgba(111, 207, 151, 0.85)',
              'rgba(111, 207, 151, 0.9)'
            ],
            borderColor: [
              'rgba(220, 220, 220, 1)',
              'rgba(111, 207, 151, 1)',
              'rgba(111, 207, 151, 1)',
              'rgba(111, 207, 151, 1)',
              'rgba(111, 207, 151, 1)',
              'rgba(111, 207, 151, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                weight: 'bold'
              }
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Tonnes CO₂',
              color: '#209653',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(32, 150, 83, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return formatNumber(Number(value));
              },
              font: {
                size: 10
              }
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Euros',
              color: '#6FCF97',
              font: {
                weight: 'bold'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              callback: function(value) {
                return formatNumber(Number(value)) + ' €';
              },
              font: {
                size: 10
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                size: 12
              },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            titleFont: {
              weight: 'bold'
            },
            bodyColor: '#333',
            borderColor: '#209653',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              title: function(tooltipItems: any) {
                return tooltipItems[0].label;
              },
              label: function(context: any) {
                const value = context.raw;
                if (context.datasetIndex === 0) {
                  if (value === 0) return 'Point de départ';
                  return `Économisé: ${formatNumber(value)} tonnes CO₂`;
                } else {
                  if (value === 0) return 'Point de départ';
                  return `Économisé: ${formatNumber(value)} €`;
                }
              },
              footer: function(tooltipItems: any) {
                if (tooltipItems[0].dataIndex === 0) {
                  return '';
                }
                return `Estimations basées sur une croissance progressive de votre engagement écologique`;
              }
            }
          }
        }
      }
    });
  };

  // Fonction pour exporter en PDF avec graphiques intégrés
  const exportToPDF = async () => {
    try {
      // Mettre à jour l'état pour afficher les données détaillées temporairement
      setShowDetailedData(true);
      
      // Afficher un indicateur de chargement
      const loadingElement = document.createElement('div');
      loadingElement.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
      loadingElement.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-01 mx-auto mb-4"></div>
          <p class="text-gray-800 font-semibold">Préparation du PDF en cours...</p>
        </div>
      `;
      document.body.appendChild(loadingElement);
      
      // Attendre que les graphiques soient complètement rendus
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // S'assurer que tous les graphiques sont mis à jour
      updateCharts();
      
      // Attendre à nouveau pour garantir le rendu
      await new Promise(resolve => setTimeout(resolve, 500));

      // Préparer le contenu du PDF
      const resultatContainer = document.getElementById('resultat-container');
      if (!resultatContainer) {
        console.error("Conteneur de résultats non trouvé");
        document.body.removeChild(loadingElement);
        return;
      }

      // Créer un clone pour ne pas perturber l'affichage actuel
      const clone = resultatContainer.cloneNode(true) as HTMLElement;
      
      // Styliser pour le PDF
      const style = document.createElement('style');
      style.innerHTML = `
        body { font-family: Arial, sans-serif; color: #333; }
        h1, h2, h3 { color: #2D6A4F; }
        .page-break { page-break-after: always; }
        .header { text-align: center; margin-bottom: 20px; }
        .header img { max-height: 50px; }
        .footer { text-align: center; font-size: 10px; color: #666; margin-top: 20px; }
        .chart-container { height: 300px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 8px; border: 1px solid #ddd; }
        th { background-color: #f5f5f5; text-align: left; }
        .total-row { font-weight: bold; background-color: #f0f0f0; }
      `;
      
      // Capturer les graphiques actuels en tant qu'images
      const captureChart = async (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return '';
        return canvas.toDataURL('image/png');
      };
      
      const co2ChartImg = await captureChart(co2ChartRef.current);
      const financierChartImg = await captureChart(financierChartRef.current);
      const repartitionChartImg = await captureChart(repartitionChartRef.current);
      const progressionChartImg = await captureChart(progressionChartRef.current);
      
      // Créer un contenu HTML pour le PDF
      const pdfContent = document.createElement('div');
      pdfContent.innerHTML = `
        <div class="header">
          <img src="/assets/images/logo-text.png" alt="GoFusion Logo" />
          <h1>Rapport d'Impact Environnemental et Financier</h1>
          <p>Généré le ${new Date().toLocaleDateString()}</p>
        </div>
        
        <h2>Résumé des économies potentielles</h2>
        <div style="display: flex; justify-content: space-between; margin: 20px 0;">
          <div style="text-align: center; width: 48%;">
            <h3>Impact environnemental</h3>
            <p style="font-size: 24px; color: #2D6A4F; font-weight: bold;">
              ${formatNumber(resultats.totalCo2Economie)} tonnes CO₂
            </p>
            <p>économisées chaque année</p>
            ${co2ChartImg ? `<img src="${co2ChartImg}" style="max-width: 100%; height: auto;" />` : ''}
          </div>
          <div style="text-align: center; width: 48%;">
            <h3>Impact financier</h3>
            <p style="font-size: 24px; color: #2D6A4F; font-weight: bold;">
              ${formatNumber(resultats.totalEuro)} €
            </p>
            <p>économisés chaque année</p>
            ${financierChartImg ? `<img src="${financierChartImg}" style="max-width: 100%; height: auto;" />` : ''}
          </div>
        </div>
        
        <div class="page-break"></div>
        
        <h2>Répartition des économies par action</h2>
        <div style="text-align: center; margin: 20px 0;">
          ${repartitionChartImg ? `<img src="${repartitionChartImg}" style="max-width: 80%; height: auto;" />` : ''}
        </div>
        
        <h3>Détails des économies</h3>
        <table>
          <thead>
            <tr>
              <th style="width: 40%;">Action</th>
              <th style="width: 30%; text-align: right;">Économies (€)</th>
              <th style="width: 30%; text-align: right;">Impact CO₂ (tonnes)</th>
            </tr>
          </thead>
          <tbody>
            ${generateDetailedTable().positiveImpacts.map(item => `
              <tr>
                <td>${item.label}</td>
                <td style="text-align: right; color: #2D6A4F;">${formatNumber(item.economie)} €</td>
                <td style="text-align: right; color: #2D6A4F;">${formatNumber(item.co2)}</td>
              </tr>
            `).join('')}
            
            ${generateDetailedTable().negativeImpacts.length > 0 ? `
              <tr>
                <td colspan="3" style="font-weight: bold; background-color: #f5f5f5;">Coûts environnementaux</td>
              </tr>
              ${generateDetailedTable().negativeImpacts.map(item => `
                <tr>
                  <td>${item.label}</td>
                  <td style="text-align: right; color: #DC2626;">${formatNumber(item.economie)} €</td>
                  <td style="text-align: right; color: #DC2626;">${formatNumber(item.co2)}</td>
                </tr>
              `).join('')}
            ` : ''}
            
            <tr class="total-row">
              <td>Total</td>
              <td style="text-align: right; color: #2D6A4F; font-weight: bold;">${formatNumber(resultats.totalEuro)} €</td>
              <td style="text-align: right; color: #2D6A4F; font-weight: bold;">${formatNumber(resultats.totalCo2Economie)}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="page-break"></div>
        
        <h2>Projection sur 5 ans</h2>
        <div style="text-align: center; margin: 20px 0;">
          ${progressionChartImg ? `<img src="${progressionChartImg}" style="max-width: 80%; height: auto;" />` : ''}
        </div>
        
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-size: 12px;">
          Cette projection est basée sur une croissance progressive de votre engagement écologique, 
          avec une augmentation de 10% la première année, puis 5% supplémentaires chaque année suivante.
        </p>
        
        <div class="footer">
          <p>Rapport généré par GoFusion - Solution d'optimisation écologique pour entreprises</p>
          <p>www.gofusion.fr | contact@gofusion.fr | 01 23 45 67 89</p>
        </div>
      `;
      
      // Configuration avancée pour html2pdf
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `GoFusion_Impact_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          dpi: 192,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };
      
      // Générer le PDF
      const html2pdf = (window as any).html2pdf;
      await html2pdf().from(pdfContent).set(opt).save();
      
      // Supprimer l'indicateur de chargement
      document.body.removeChild(loadingElement);
      
      // Remettre l'état d'affichage des données détaillées à sa valeur précédente
      setShowDetailedData(false);
      
      console.log("PDF généré avec succès");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.");
      
      // Supprimer l'indicateur de chargement en cas d'erreur
      const loadingElement = document.querySelector('.fixed.inset-0.flex.items-center.justify-center.bg-black.bg-opacity-50');
      if (loadingElement) {
        document.body.removeChild(loadingElement as Node);
      }
    }
  };

  // Fonction pour afficher un graphique en plein écran
  const toggleFullscreenChart = (chartId: string | null) => {
    setFullscreenChart(chartId);
    // Si on ferme le mode plein écran, on s'assure que les graphiques sont mis à jour
    if (chartId === null) {
      setTimeout(() => {
        updateCharts();
      }, 100);
    }
  };

  // Fonction pour générer un tableau de données détaillées
  const generateDetailedTable = () => {
    // Filtrer seulement les valeurs positives pour le tableau
    const positiveImpacts = Object.entries(resultats.detailsEconomies)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => {
        const co2Value = resultats.detailsCo2[key as keyof typeof resultats.detailsCo2];
        return {
          action: key,
          label: getLabelForAction(key),
          economie: value,
          co2: co2Value
        };
      })
      .sort((a, b) => b.economie - a.economie);

    const negativeImpacts = Object.entries(resultats.detailsEconomies)
      .filter(([_, value]) => value < 0)
      .map(([key, value]) => {
        const co2Value = resultats.detailsCo2[key as keyof typeof resultats.detailsCo2];
        return {
          action: key,
          label: getLabelForAction(key),
          economie: value,
          co2: co2Value
        };
      })
      .sort((a, b) => a.economie - b.economie);

    return { positiveImpacts, negativeImpacts };
  };

  // Fonction pour obtenir le label d'une action
  const getLabelForAction = (key: string): string => {
    const labelMap: Record<string, string> = {
      covoiturage: 'Covoiturage',
      dechets: 'Tri des déchets',
      velo: 'Mobilité douce',
      joursEteints: 'Extinction appareils',
      surfaceChauffee: 'Chauffage optimisé',
      teletravail: 'Télétravail',
      stockageCloud: 'Stockage cloud',
      nuitsHotel: 'Nuits d\'hôtel',
      volsAvion: 'Vols en avion'
    };
    
    return labelMap[key] || key;
  };

  // Fonction pour partager les résultats
  const shareResults = () => {
    const shareText = `J'ai calculé mon impact écologique avec GoFusion! Économies: ${formatNumber(resultats.totalEuro)}€ et ${formatNumber(resultats.totalCo2Economie)} tonnes de CO₂ par an. Faites votre calcul sur: `;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mes résultats GoFusion',
        text: shareText,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage', error));
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(shareText + window.location.href)
        .then(() => alert('Lien copié dans le presse-papier!'))
        .catch(err => console.error('Erreur de copie', err));
    }
  };

  // Fonction pour sauvegarder le scénario actuel
  const saveScenario = () => {
    const nom = scenarioName.trim() !== '' ? 
      scenarioName : 
      `Scénario ${scenarios.length + 1}`;
      
    const scenarioToSave: CalculResults = {
      ...resultats,
      nom: nom,
      dateCreation: new Date().toISOString()
    };
    
    const updatedScenarios = [...scenarios, scenarioToSave];
    setScenarios(updatedScenarios);
    setScenarioName('');
    
    // Sauvegarder dans le localStorage pour persistance
    localStorage.setItem('gofusion_scenarios', JSON.stringify(updatedScenarios));
    
    alert(`Scénario "${nom}" sauvegardé avec succès !`);
  };

  // Fonction pour charger un scénario - correction des références
  const loadScenario = (scenario: CalculResults) => {
    setResultats(scenario);
    setInputs({
      ...inputs,
      nbEmployes: scenario.nbEmployes || inputs.nbEmployes,
      tauxCovoiturage: scenario.tauxCovoiturage || inputs.tauxCovoiturage,
      tauxTeletravail: scenario.tauxTeletravail || inputs.tauxTeletravail,
      tauxDechets: scenario.tauxDechets || inputs.tauxDechets,
      prixGoFusion: scenario.prixGoFusion || inputs.prixGoFusion
    });
    
    setTimeout(() => {
      updateCharts();
    }, 100);
  };

  // Fonction pour supprimer un scénario
  const deleteScenario = (index: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce scénario ?")) {
      const updatedScenarios = [...scenarios];
      updatedScenarios.splice(index, 1);
      setScenarios(updatedScenarios);
      
      // Mettre à jour le localStorage
      localStorage.setItem('gofusion_scenarios', JSON.stringify(updatedScenarios));
    }
  };

  // Fonction pour comparer les scénarios sélectionnés sur un graphique
  const compareScenarios = () => {
    // Mettre à jour l'état pour montrer le graphique de comparaison
    setFullscreenChart('comparison');
    
    // Configuration pour le graphique de comparaison
    setTimeout(() => {
      const ctx = document.getElementById('comparison-chart') as HTMLCanvasElement;
      if (!ctx) return;
      
      // Générer les données de comparaison
      const labels = scenarios.map(s => s.nom || 'Sans nom');
      const co2Data = scenarios.map(s => s.totalCo2Economie || 0);
      const euroData = scenarios.map(s => s.totalEuro || 0);
      
      // Créer le graphique de comparaison
      if (charts.comparison) {
        charts.comparison.destroy();
      }
      
      const Chart = (window as any).Chart;
      charts.comparison = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Économies CO₂ (tonnes)',
              data: co2Data,
              backgroundColor: 'rgba(45, 106, 79, 0.7)',
              borderColor: 'rgba(45, 106, 79, 1)',
              borderWidth: 1
            },
            {
              label: 'Économies € (milliers)',
              data: euroData.map(value => value / 1000), // Convertir en milliers pour meilleure échelle
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              grid: {
                display: true
              },
              ticks: {
                callback: function(value) {
                  return value;
                }
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.parsed.x;
                  
                  if (label.includes('CO₂')) {
                    return `${label}: ${formatNumber(value)} tonnes`;
                  }
                  
                  if (label.includes('€')) {
                    return `${label}: ${formatNumber(value * 1000)} €`;
                  }
                  
                  return `${label}: ${value}`;
                }
              }
            }
          }
        }
      });
    }, 100);
  };

  // Charger les scénarios sauvegardés au démarrage
  useEffect(() => {
    const savedScenarios = localStorage.getItem('gofusion_scenarios');
    if (savedScenarios) {
      try {
        const parsedScenarios = JSON.parse(savedScenarios);
        setScenarios(parsedScenarios);
      } catch (error) {
        console.error("Erreur lors du chargement des scénarios:", error);
      }
    }
  }, []);

  // Fonction pour gérer les changements dans les champs du nouvel objectif
  const handleObjectifChange = (field: keyof Objectif, value: string | number) => {
    setNouvelObjectif({
      ...nouvelObjectif,
      [field]: value
    });
  };

  // Fonction pour ajouter un nouvel objectif
  const ajouterObjectif = () => {
    if (nouvelObjectif.nom.trim() === '') {
      alert('Veuillez donner un nom à votre objectif');
      return;
    }
    
    if (nouvelObjectif.co2 <= 0 && nouvelObjectif.euro <= 0) {
      alert('Veuillez définir au moins un objectif (CO₂ ou €)');
      return;
    }
    
    const updatedObjectifs = [...objectifs, {
      ...nouvelObjectif,
      dateCreation: new Date().toISOString()
    }];
    
    setObjectifs(updatedObjectifs);
    
    // Réinitialiser le formulaire
    setNouvelObjectif({
      nom: '',
      co2: 0,
      euro: 0,
      dateCreation: new Date().toISOString(),
      dateCible: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    });
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('gofusion_objectifs', JSON.stringify(updatedObjectifs));
    
    // Mettre à jour le graphique des objectifs
    setTimeout(() => {
      afficherObjectifs();
    }, 100);
  };

  // Fonction pour supprimer un objectif
  const supprimerObjectif = (index: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet objectif ?")) {
      const updatedObjectifs = [...objectifs];
      updatedObjectifs.splice(index, 1);
      setObjectifs(updatedObjectifs);
      localStorage.setItem('gofusion_objectifs', JSON.stringify(updatedObjectifs));
    }
  };

  // Fonction pour afficher les objectifs dans un graphique
  const afficherObjectifs = () => {
    setFullscreenChart('objectifs');
    
    setTimeout(() => {
      const ctx = document.getElementById('objectifs-chart') as HTMLCanvasElement;
      if (!ctx) return;
      
      // Calculer les pourcentages d'atteinte des objectifs
      const objectifsData = objectifs.map(obj => {
        const progressCo2 = obj.co2 > 0 ? Math.min(100, (resultats.totalCo2Economie / obj.co2) * 100) : 0;
        const progressEuro = obj.euro > 0 ? Math.min(100, (resultats.totalEuro / obj.euro) * 100) : 0;
        
        return {
          nom: obj.nom,
          progressCo2,
          progressEuro,
          remainingCo2: obj.co2 > 0 ? Math.max(0, obj.co2 - resultats.totalCo2Economie) : 0,
          remainingEuro: obj.euro > 0 ? Math.max(0, obj.euro - resultats.totalEuro) : 0,
          dateCible: new Date(obj.dateCible).toLocaleDateString()
        };
      });
      
      if (charts.objectifs) {
        charts.objectifs.destroy();
      }
      
      const Chart = (window as any).Chart;
      charts.objectifs = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: objectifsData.map(obj => obj.nom),
          datasets: [
            {
              label: 'Progrès CO₂ (%)',
              data: objectifsData.map(obj => obj.progressCo2),
              backgroundColor: 'rgba(45, 106, 79, 0.7)',
              borderColor: 'rgba(45, 106, 79, 1)',
              borderWidth: 1,
              stack: 'Stack 0'
            },
            {
              label: 'Progrès € (%)',
              data: objectifsData.map(obj => obj.progressEuro),
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              stack: 'Stack 1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: true
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const dataIndex = context.dataIndex;
                  const datasetIndex = context.datasetIndex;
                  const value = context.parsed.y;
                  
                  const objectif = objectifsData[dataIndex];
                  
                  if (datasetIndex === 0) { // CO2
                    return [
                      `Progrès CO₂: ${formatNumber(value)}%`,
                      `Actuel: ${formatNumber(resultats.totalCo2Economie)} tonnes`,
                      `Objectif: ${formatNumber(objectif.progressCo2 >= 100 ? resultats.totalCo2Economie : resultats.totalCo2Economie + objectif.remainingCo2)} tonnes`,
                      `Échéance: ${objectif.dateCible}`
                    ];
                  } else { // Euro
                    return [
                      `Progrès €: ${formatNumber(value)}%`,
                      `Actuel: ${formatNumber(resultats.totalEuro)} €`,
                      `Objectif: ${formatNumber(objectif.progressEuro >= 100 ? resultats.totalEuro : resultats.totalEuro + objectif.remainingEuro)} €`,
                      `Échéance: ${objectif.dateCible}`
                    ];
                  }
                },
                title: function(context) {
                  return context[0].label;
                }
              }
            }
          }
        }
      });
    }, 100);
  };

  // Charger les objectifs au démarrage
  useEffect(() => {
    const savedObjectifs = localStorage.getItem('gofusion_objectifs');
    if (savedObjectifs) {
      try {
        const parsedObjectifs = JSON.parse(savedObjectifs);
        setObjectifs(parsedObjectifs);
      } catch (error) {
        console.error("Erreur lors du chargement des objectifs:", error);
      }
    }
  }, []);

  // Fonction pour générer des recommandations personnalisées
  const genererRecommandations = (): Recommandation[] => {
    const recs: Recommandation[] = [];
    
    // Vérifier si le taux de covoiturage est bas
    if (inputs.tauxCovoiturage < 20) {
      recs.push({
        titre: "Augmenter le covoiturage",
        description: "Mettez en place un programme incitatif pour le covoiturage avec des places de parking réservées et des primes mensuelles. Pour chaque tranche de 5% d'augmentation du taux de covoiturage, vous économiseriez environ " + 
          formatNumber(calculerGainCovoiturageSupplementaire(5)) + "€ et " +
          formatNumber(calculerGainCo2Supplementaire(5)) + " tonnes de CO₂ par an.",
        impact: 8,
        difficulte: 3,
        categories: ["mobilité", "économies"],
        icon: "car"
      });
    }
    
    // Recommandation pour le télétravail
    if (inputs.tauxTeletravail < 30) {
      recs.push({
        titre: "Développer le télétravail",
        description: "Augmentez le nombre de jours de télétravail par semaine pour réduire les émissions liées aux déplacements. Si vous passiez à 30% de télétravail, vous économiseriez environ " +
          formatNumber(calculerGainTeletravailSupplementaire(Math.max(30 - inputs.tauxTeletravail, 0))) + "€ et " +
          formatNumber(calculerGainCo2TeletravailSupplementaire(Math.max(30 - inputs.tauxTeletravail, 0))) + " tonnes de CO₂ par an.",
        impact: 7,
        difficulte: 4,
        categories: ["organisation", "qualité de vie"],
        icon: "home"
      });
    }
    
    // Recommandation pour le tri des déchets
    if (inputs.tauxDechets < 50) {
      recs.push({
        titre: "Améliorer le tri des déchets",
        description: "Installez des stations de tri claires et formez vos employés aux bonnes pratiques. En atteignant 50% de tri, vous économiseriez environ " +
          formatNumber(calculerGainDechetsSupplementaire(Math.max(50 - inputs.tauxDechets, 0))) + "€ et " +
          formatNumber(calculerGainCo2DechetsSupplementaire(Math.max(50 - inputs.tauxDechets, 0))) + " tonnes de CO₂ par an.",
        impact: 6,
        difficulte: 3,
        categories: ["bureaux", "économie circulaire"],
        icon: "trash"
      });
    }
    
    // Recommandation énergétique
    recs.push({
      titre: "Optimiser votre consommation énergétique",
      description: "Programmez l'extinction automatique des appareils après les heures de bureau et installez des capteurs de présence. Avec ces mesures, vous pourriez économiser environ " +
        formatNumber(5 * inputs.nbEmployes * 12) + "€ et " +
        formatNumber(0.08 * inputs.nbEmployes) + " tonnes de CO₂ par an.",
      impact: 7,
      difficulte: 5,
      categories: ["énergie", "bureaux"],
      icon: "zap"
    });
    
    // Recommandation pour les réunions virtuelles
    recs.push({
      titre: "Privilégier les réunions virtuelles",
      description: "Remplacez 50% des déplacements professionnels par des visioconférences. En économisant 5 nuits d'hôtel et 2 vols moyens par mois, vous réduiriez vos coûts d'environ " +
        formatNumber(5 * 150 * 12 + 2 * 500 * 12) + "€ et " +
        formatNumber(5 * 0.025 * 12 + 2 * 0.5 * 12) + " tonnes de CO₂ par an.",
      impact: 9,
      difficulte: 2,
      categories: ["organisation", "mobilité"],
      icon: "video"
    });
    
    // Recommandation pour le chauffage/climatisation
    recs.push({
      titre: "Optimiser le chauffage et la climatisation",
      description: "Réduisez de 2°C en hiver et augmentez de 2°C en été la température de vos locaux. Cette simple mesure pourrait générer des économies de " +
        formatNumber(inputs.nbEmployes * 10 * 12) + "€ et " +
        formatNumber(inputs.nbEmployes * 0.15) + " tonnes de CO₂ par an.",
      impact: 8,
      difficulte: 4,
      categories: ["énergie", "bureaux"],
      icon: "thermometer"
    });
    
    // Trier par rapport impact/difficulté
    return recs.sort((a, b) => (b.impact / b.difficulte) - (a.impact / a.difficulte));
  };

  // Fonctions de calcul d'impact pour les recommandations
  const calculerGainCovoiturageSupplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 250€ par employé en covoiturage par an
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 250;
  };

  const calculerGainCo2Supplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 0.5 tonne de CO2 par employé en covoiturage par an
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 0.5;
  };

  const calculerGainTeletravailSupplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 350€ par employé en télétravail par an
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 350;
  };

  const calculerGainCo2TeletravailSupplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 0.35 tonne de CO2 par employé en télétravail par an
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 0.35;
  };

  const calculerGainDechetsSupplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 100€ par employé par an pour le tri des déchets
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 100;
  };

  const calculerGainCo2DechetsSupplementaire = (pourcentageSupplementaire: number): number => {
    // Économie moyenne de 0.1 tonne de CO2 par employé par an pour le tri des déchets
    return (pourcentageSupplementaire / 100) * inputs.nbEmployes * 0.1;
  };

  // Fonction pour obtenir l'icône correspondante
  const getRecommendationIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Zap className="h-7 w-7 text-blue-500" />;
      case 'home':
        return <TrendingUp className="h-7 w-7 text-purple-600" />;
      case 'trash':
        return <Leaf className="h-7 w-7 text-green-500" />;
      case 'zap':
        return <Zap className="h-7 w-7 text-yellow-500" />;
      case 'video':
        return <Zap className="h-7 w-7 text-indigo-500" />;
      case 'thermometer':
        return <TrendingUp className="h-7 w-7 text-red-500" />;
      default:
        return <Lightbulb className="h-7 w-7 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAF7]" data-page="simulateur-avance">
      <Navbar />
      
      {fullscreenChart && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-01">
              {fullscreenChart === 'co2' && 'Impact environnemental détaillé'}
              {fullscreenChart === 'financier' && 'Impact financier détaillé'}
              {fullscreenChart === 'repartition' && 'Répartition des économies par action'}
              {fullscreenChart === 'progression' && 'Projection sur 5 ans'}
              {fullscreenChart === 'comparison' && 'Comparaison des scénarios'}
              {fullscreenChart === 'objectifs' && 'Progression vers les objectifs'}
            </h3>
            <Button 
              type="button"
              onClick={() => toggleFullscreenChart(null)}
              variant="outline"
              className="rounded-full p-2 h-auto"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full h-full max-w-4xl mx-auto">
              {fullscreenChart === 'co2' && (
                <canvas ref={co2ChartRef} />
              )}
              {fullscreenChart === 'financier' && (
                <canvas ref={financierChartRef} />
              )}
              {fullscreenChart === 'repartition' && (
                <canvas ref={repartitionChartRef} />
              )}
              {fullscreenChart === 'progression' && (
                <canvas ref={progressionChartRef} />
              )}
              {fullscreenChart === 'comparison' && (
                <div className="h-full">
                  <canvas id="comparison-chart" height="400"></canvas>
                </div>
              )}
              {fullscreenChart === 'objectifs' && (
                <div className="h-full">
                  <canvas id="objectifs-chart" height="400"></canvas>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link to="/#simulateur" className="text-green-01 hover:text-green-800 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au simulateur simple</span>
          </Link>
        </div>
        
        <div className="bg-[#FDF9F1] rounded-xl shadow-md overflow-hidden p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-green-01 p-2 rounded-full">
              <BarChart3 className="h-6 w-6 text-[#FDF9F1]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-01">
              Calculez vos économies avec GoFusion
            </h1>
          </div>
          
          <p className="text-center text-gray-700 mb-8">
            Transformez vos actions en impact, en quelques clics !
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="effectif" className="block text-green-01 font-semibold text-sm mb-1">
                  Nombre total d'employés dans l'entreprise
                </label>
                <Input
                  type="number"
                  id="effectif"
                  min="1"
                  value={effectif}
                  onChange={(e) => handleInputChange(e, setEffectif)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="covoiturage" className="block text-green-01 font-semibold text-sm mb-1">
                  Combien d'employés covoiturent ?
                </label>
                <Input
                  type="number"
                  id="covoiturage"
                  min="0"
                  value={covoiturage}
                  onChange={(e) => handleInputChange(e, setCovoiturage)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="dechets" className="block text-green-01 font-semibold text-sm mb-1">
                  Combien de sacs triés par mois ?
                </label>
                <Input
                  type="number"
                  id="dechets"
                  min="0"
                  value={dechets}
                  onChange={(e) => handleInputChange(e, setDechets)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="velo" className="block text-green-01 font-semibold text-sm mb-1">
                  Combien d'employés vont à vélo ou à pied ?
                </label>
                <Input
                  type="number"
                  id="velo"
                  min="0"
                  value={velo}
                  onChange={(e) => handleInputChange(e, setVelo)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="joursEteints" className="block text-green-01 font-semibold text-sm mb-1">
                  Combien de jours éteignez-vous tout par mois ?
                </label>
                <Input
                  type="number"
                  id="joursEteints"
                  min="0"
                  value={joursEteints}
                  onChange={(e) => handleInputChange(e, setJoursEteints)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="surfaceChauffee" className="block text-green-01 font-semibold text-sm mb-1">
                  Surface chauffée (en m²)
                </label>
                <Input
                  type="number"
                  id="surfaceChauffee"
                  min="0"
                  value={surfaceChauffee}
                  onChange={(e) => handleInputChange(e, setSurfaceChauffee)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="teletravail" className="block text-green-01 font-semibold text-sm mb-1">
                  Part du travail à domicile (en %)
                </label>
                <Input
                  type="number"
                  id="teletravail"
                  min="0"
                  max="100"
                  value={teletravail}
                  onChange={(e) => handleInputChange(e, setTeletravail)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="stockageCloud" className="block text-green-01 font-semibold text-sm mb-1">
                  Stockage cloud (en GB)
                </label>
                <Input
                  type="number"
                  id="stockageCloud"
                  min="0"
                  value={stockageCloud}
                  onChange={(e) => handleInputChange(e, setStockageCloud)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="nuitsHotel" className="block text-green-01 font-semibold text-sm mb-1">
                  Nombre de nuits d'hôtel par an
                </label>
                <Input
                  type="number"
                  id="nuitsHotel"
                  min="0"
                  value={nuitsHotel}
                  onChange={(e) => handleInputChange(e, setNuitsHotel)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="volsAvion" className="block text-green-01 font-semibold text-sm mb-1">
                  Nombre d'allers-retours en avion par an
                </label>
                <Input
                  type="number"
                  id="volsAvion"
                  min="0"
                  value={volsAvion}
                  onChange={(e) => handleInputChange(e, setVolsAvion)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={calculerEconomies}
              className="bg-green-01 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold text-base flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              <Calculator className="h-5 w-5" />
              <span>Découvrir mon impact avec GoFusion</span>
            </Button>
          </div>
          
          {resultats.totalCo2Economie > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200" id="resultat-container">
              <h2 className="text-xl md:text-2xl font-bold text-green-01 text-center mb-6">
                Voici vos économies potentielles avec GoFusion
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                  <Button
                    type="button"
                    onClick={() => toggleFullscreenChart('co2')}
                    variant="ghost"
                    className="absolute top-2 right-2 p-1 h-auto"
                    title="Voir en plein écran"
                  >
                    <Maximize2 className="h-4 w-4 text-gray-500 hover:text-green-01" />
                  </Button>
                  
                  <Leaf className="h-8 w-8 text-green-01 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Impact environnemental</h3>
                  <p className="text-3xl font-bold text-green-01 mb-2">
                    {formatNumber(resultats.totalCo2Economie)} <span className="text-lg">tonnes CO₂</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    économisées chaque année avec notre solution
                  </p>
                  
                  <div className="chart-container mt-6 h-64">
                    <canvas ref={co2ChartRef} />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center relative">
                  <Button
                    type="button"
                    onClick={() => toggleFullscreenChart('financier')}
                    variant="ghost"
                    className="absolute top-2 right-2 p-1 h-auto"
                    title="Voir en plein écran"
                  >
                    <Maximize2 className="h-4 w-4 text-gray-500 hover:text-green-01" />
                  </Button>
                  
                  <Banknote className="h-8 w-8 text-green-01 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Impact financier</h3>
                  <p className="text-3xl font-bold text-green-01 mb-2">
                    {formatNumber(resultats.totalEuro)} <span className="text-lg">€</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    économisés chaque année avec notre solution
                  </p>
                  
                  <div className="chart-container mt-6 h-64">
                    <canvas ref={financierChartRef} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
                <Button
                  type="button"
                  onClick={() => toggleFullscreenChart('repartition')}
                  variant="ghost"
                  className="absolute top-2 right-2 p-1 h-auto"
                  title="Voir en plein écran"
                >
                  <Maximize2 className="h-4 w-4 text-gray-500 hover:text-green-01" />
                </Button>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Répartition des économies par action
                </h3>
                <div className="chart-container h-72">
                  <canvas ref={repartitionChartRef} />
                </div>
                
                <div className="mt-4">
                  <Button
                    type="button"
                    onClick={() => setShowDetailedData(!showDetailedData)}
                    variant="outline"
                    className="text-green-01 border-green-01 hover:bg-green-03 flex items-center gap-2 mx-auto"
                  >
                    <Table className="h-4 w-4" />
                    <span>{showDetailedData ? "Masquer" : "Afficher"} les données détaillées</span>
                  </Button>
                </div>
                
                {showDetailedData && (
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Action
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Économies (€)
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Impact CO₂ (tonnes)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateDetailedTable().positiveImpacts.map(item => (
                          <tr key={item.action} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200 text-sm">{item.label}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-green-01 font-medium">{formatNumber(item.economie)} €</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-green-01 font-medium">{formatNumber(item.co2)}</td>
                          </tr>
                        ))}
                        
                        {generateDetailedTable().negativeImpacts.length > 0 && (
                          <>
                            <tr>
                              <td colSpan={3} className="py-2 px-4 border-b border-gray-200 text-sm font-semibold bg-gray-50">
                                Coûts environnementaux
                              </td>
                            </tr>
                            {generateDetailedTable().negativeImpacts.map(item => (
                              <tr key={item.action} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">{item.label}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-red-500 font-medium">{formatNumber(item.economie)} €</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-right text-sm text-red-500 font-medium">{formatNumber(item.co2)}</td>
                              </tr>
                            ))}
                          </>
                        )}
                        
                        <tr className="bg-gray-50">
                          <td className="py-2 px-4 border-b border-gray-200 text-sm font-bold">Total</td>
                          <td className="py-2 px-4 border-b border-gray-200 text-right text-sm font-bold text-green-01">{formatNumber(resultats.totalEuro)} €</td>
                          <td className="py-2 px-4 border-b border-gray-200 text-right text-sm font-bold text-green-01">{formatNumber(resultats.totalCo2Economie)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Target className="h-5 w-5 text-green-01 mr-2" />
                    <span>Objectifs environnementaux</span>
                  </h3>
                  <Button 
                    type="button" 
                    onClick={() => setShowObjectifs(!showObjectifs)}
                    variant="outline"
                    className="text-green-01 border-green-01 hover:bg-green-03"
                  >
                    {showObjectifs ? "Masquer" : "Afficher"}
                  </Button>
                </div>
                
                {showObjectifs && (
                  <>
                    <div className="bg-green-50 p-4 rounded-md mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Définir un nouvel objectif</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom de l'objectif
                          </label>
                          <Input
                            type="text"
                            placeholder="Ex: Objectif annuel 2023"
                            value={nouvelObjectif.nom}
                            onChange={(e) => handleObjectifChange('nom', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date cible
                          </label>
                          <Input
                            type="date"
                            value={nouvelObjectif.dateCible.split('T')[0]}
                            onChange={(e) => handleObjectifChange('dateCible', new Date(e.target.value).toISOString())}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Objectif CO₂ (tonnes)
                          </label>
                          <Input
                            type="number"
                            placeholder="Tonnes de CO₂"
                            value={nouvelObjectif.co2}
                            onChange={(e) => handleObjectifChange('co2', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Objectif financier (€)
                          </label>
                          <Input
                            type="number"
                            placeholder="Montant en euros"
                            value={nouvelObjectif.euro}
                            onChange={(e) => handleObjectifChange('euro', parseFloat(e.target.value) || 0)}
                            className="w-full"
                            min="0"
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        onClick={ajouterObjectif}
                        className="bg-green-01 hover:bg-green-800 text-white w-full"
                      >
                        Ajouter cet objectif
                      </Button>
                    </div>
                    
                    {objectifs.length > 0 ? (
                      <>
                        <div className="overflow-x-auto mb-4">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Objectif
                                </th>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  CO₂ (tonnes)
                                </th>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Économies (€)
                                </th>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Échéance
                                </th>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Progrès
                                </th>
                                <th className="py-2 px-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {objectifs.map((objectif, index) => {
                                const progressCo2 = objectif.co2 > 0 ? Math.min(100, (resultats.totalCo2Economie / objectif.co2) * 100) : 0;
                                const progressEuro = objectif.euro > 0 ? Math.min(100, (resultats.totalEuro / objectif.euro) * 100) : 0;
                                const overallProgress = Math.round((progressCo2 + progressEuro) / (objectif.co2 > 0 && objectif.euro > 0 ? 2 : (objectif.co2 > 0 || objectif.euro > 0 ? 1 : 1)));
                                
                                const progressColor = overallProgress >= 100 ? 'bg-green-500' : 
                                                    overallProgress >= 75 ? 'bg-green-400' : 
                                                    overallProgress >= 50 ? 'bg-yellow-400' :
                                                    overallProgress >= 25 ? 'bg-orange-400' : 'bg-red-400';
                                
                                return (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="py-2 px-3 border-b border-gray-200 text-sm">
                                      {objectif.nom}
                                    </td>
                                    <td className="py-2 px-3 border-b border-gray-200 text-center text-sm">
                                      {objectif.co2 > 0 ? (
                                        <div className="flex items-center justify-center gap-1">
                                          <span>{formatNumber(objectif.co2)}</span>
                                          {progressCo2 >= 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 border-b border-gray-200 text-center text-sm">
                                      {objectif.euro > 0 ? (
                                        <div className="flex items-center justify-center gap-1">
                                          <span>{formatNumber(objectif.euro)}</span>
                                          {progressEuro >= 100 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                        </div>
                                      ) : (
                                        <span className="text-gray-400">-</span>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 border-b border-gray-200 text-center text-sm">
                                      {new Date(objectif.dateCible).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-3 border-b border-gray-200 text-center">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                                        <div 
                                          className={`h-2.5 rounded-full ${progressColor}`} 
                                          style={{width: `${overallProgress}%`}}
                                        ></div>
                                      </div>
                                      <span className="text-xs mt-1 inline-block font-medium">
                                        {overallProgress}%
                                      </span>
                                    </td>
                                    <td className="py-2 px-3 border-b border-gray-200 text-center">
                                      <Button 
                                        type="button" 
                                        onClick={() => supprimerObjectif(index)}
                                        variant="ghost" 
                                        className="p-1 h-auto text-red-600 hover:text-red-800"
                                        title="Supprimer cet objectif"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button 
                            type="button"
                            onClick={afficherObjectifs}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                          >
                            <ArrowUpCircle className="h-4 w-4" />
                            <span>Voir la progression en détail</span>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Target className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                        <p>Aucun objectif défini</p>
                        <p className="text-sm mt-1">Commencez par ajouter votre premier objectif</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
                <Button
                  type="button"
                  onClick={() => toggleFullscreenChart('progression')}
                  variant="ghost"
                  className="absolute top-2 right-2 p-1 h-auto"
                  title="Voir en plein écran"
                >
                  <Maximize2 className="h-4 w-4 text-gray-500 hover:text-green-01" />
                </Button>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Projection sur 5 ans
                </h3>
                <div className="chart-container h-72">
                  <canvas ref={progressionChartRef} />
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-green-01 mt-0.5 flex-shrink-0" />
                    <p>Cette projection est basée sur une croissance progressive de votre engagement écologique, avec une augmentation de 10% la première année, puis 5% supplémentaires chaque année suivante.</p>
                  </div>
                </div>
              </div>
              
              {resultats.resultatNet < 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-700">
                        Pour atteindre la rentabilité avec GoFusion
                      </p>
                      <p className="text-amber-600">
                        Il faudrait {resultats.employesCovoiturageSupplementaires} employés supplémentaires 
                        en covoiturage pour équilibrer le coût de la solution.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-6">
                  <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                  <span>Recommandations personnalisées</span>
                </h3>
                
                <div className="space-y-6">
                  {genererRecommandations().map((rec, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-01 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-white p-2 rounded-full shadow-sm">
                          {getRecommendationIcon(rec.icon)}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-800 mb-1 flex items-center">
                            {rec.titre}
                            <span className="ml-2 bg-green-100 text-green-01 text-xs px-2 py-1 rounded-full font-medium">
                              Impact: {rec.impact}/10
                            </span>
                          </h4>
                          
                          <p className="text-gray-600 mb-3">{rec.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {rec.categories.map((cat, catIndex) => (
                              <span key={catIndex} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                                {cat}
                              </span>
                            ))}
                            
                            <span className={`ml-auto text-xs px-2 py-1 rounded-full font-medium
                              ${rec.difficulte <= 3 ? 'bg-green-100 text-green-800' : 
                                rec.difficulte <= 6 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}
                            >
                              Difficulté: {rec.difficulte}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Ces recommandations sont basées sur vos données actuelles. Contactez nos conseillers pour un plan d'action personnalisé.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button
                  type="button"
                  onClick={exportToPDF}
                  className="bg-green-01 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold text-base flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <FileText className="h-5 w-5" />
                  <span>Télécharger en PDF</span>
                </Button>
                
                <Button
                  type="button"
                  onClick={shareResults}
                  className="bg-white border-2 border-green-01 hover:bg-green-01 text-green-01 hover:text-white px-6 py-3 rounded-full font-semibold text-base flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Partager les résultats</span>
                </Button>
                
                <Button
                  type="button"
                  onClick={() => window.location.href = "/#contact"}
                  className="bg-white border-2 border-green-01 hover:bg-green-01 text-green-01 hover:text-white px-6 py-3 rounded-full font-semibold text-base flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contacter un conseiller</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SimulateurAvance; 