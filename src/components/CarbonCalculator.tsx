import { useState, useEffect } from 'react';
import { Calculator, Leaf, Users, Car, Bike, Trash2, Power, TrendingUp, ChevronRight, ArrowRight, BarChart3, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const CarbonCalculator = () => {
  // États du calculateur
  const [effectif, setEffectif] = useState<number>(1000);
  const [covoiturage, setCovoiturage] = useState<number>(0);
  const [dechets, setDechets] = useState<number>(0);
  const [velo, setVelo] = useState<number>(0);
  const [joursEteints, setJoursEteints] = useState<number>(0);
  
  // États pour les résultats calculés
  const [totalCo2, setTotalCo2] = useState<number>(0);
  const [totalEuro, setTotalEuro] = useState<number>(0);
  const [coutTotal, setCoutTotal] = useState<number>(0);
  const [resultatNet, setResultatNet] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [animateResults, setAnimateResults] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Effet pour l'animation des sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.reveal').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Calculer automatiquement lorsque les inputs changent mais sans scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculer en silence, sans scroll automatique
      calculerEconomiesSilent();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [effectif, covoiturage, dechets, velo, joursEteints]);

  // Version silencieuse de la fonction qui ne fait pas de scroll
  const calculerEconomiesSilent = () => {
    console.log("Calcul silencieux avec:", { effectif, covoiturage, dechets, velo, joursEteints });
    
    // Indiquer que le calcul est en cours
    setIsUpdating(true);
    
    // Validation des entrées
    const effectifVal = Math.max(1, effectif); // Au moins 1 employé
    const covoiturageVal = Math.max(0, Math.min(covoiturage, effectifVal)); // Ne peut pas dépasser l'effectif
    const veloVal = Math.max(0, Math.min(velo, effectifVal)); // Ne peut pas dépasser l'effectif
    const dechetsVal = Math.max(0, dechets);
    const joursEteintsVal = Math.max(0, joursEteints);

    let consoElectriqueBase = effectifVal * 1500;

    // Calcul CO2
    let co2Covoiturage = covoiturageVal * 0.375;
    let co2Dechets = dechetsVal * 0.03;
    let co2Velo = veloVal * 0.375;
    let co2JoursEteints = joursEteintsVal * (consoElectriqueBase / 250 * 0.06 / 1000);
    const totalCo2Calc = co2Covoiturage + co2Dechets + co2Velo + co2JoursEteints;

    // Calcul financier
    let euroCovoiturage = covoiturageVal * 187.5;
    let euroDechets = dechetsVal * 1.5;
    let euroVelo = veloVal * 75;
    let euroJoursEteints = joursEteintsVal * (consoElectriqueBase / 250 * 0.1 / 10);
    const totalEuroCalc = euroCovoiturage + euroDechets + euroVelo + euroJoursEteints;

    // Calcul des coûts de licence
    let coutLicences = 0;
    let licencesRestantes = effectifVal;

    if (licencesRestantes > 0) {
      let licencesPalier1 = Math.min(licencesRestantes, 1000);
      coutLicences += licencesPalier1 * 10;
      licencesRestantes -= licencesPalier1;
    }
    if (licencesRestantes > 0) {
      let licencesPalier2 = Math.min(licencesRestantes, 500);
      coutLicences += licencesPalier2 * 6;
      licencesRestantes -= licencesPalier2;
    }
    if (licencesRestantes > 0) {
      let licencesPalier3 = Math.min(licencesRestantes, 500);
      coutLicences += licencesPalier3 * 4;
      licencesRestantes -= licencesPalier3;
    }
    if (licencesRestantes > 0) {
      coutLicences += licencesRestantes * 1;
    }

    let coutPacks = 1500 * 12 + 500 * 12;
    const coutTotalCalc = coutLicences + coutPacks;

    // Resultat final
    const resultatNetCalc = totalEuroCalc - coutTotalCalc;
    
    // Mettre à jour les états avec les résultats
    setTotalCo2(totalCo2Calc);
    setTotalEuro(totalEuroCalc);
    setCoutTotal(coutTotalCalc);
    setResultatNet(resultatNetCalc);
    setHasCalculated(true);
    
    // Réinitialiser puis activer l'animation des résultats
    setAnimateResults(false);
    setTimeout(() => {
      setAnimateResults(true);
      // Retirer l'indicateur de mise à jour
      setIsUpdating(false);
    }, 100);
    
    // PAS DE SCROLL AUTOMATIQUE ICI
  };

  // Fonction de calcul avec scroll pour le bouton explicite
  const calculerEconomies = () => {
    // D'abord faire les calculs
    calculerEconomiesSilent();
    
    // Puis faire le scroll, seulement quand le bouton est cliqué
    setTimeout(() => {
      const resultatElement = document.getElementById('resultat-calculateur');
      if (resultatElement) {
        resultatElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Fonction de gestion des changements d'inputs
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    setter(isNaN(numValue) ? 0 : numValue);
  };
  
  // Fonction pour mettre à jour la valeur du slider
  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, values: number[]) => {
    if (values.length > 0) {
      setter(values[0]);
    }
  };

  // Fonction pour calculer le pourcentage pour la jauge
  const calculatePercentage = (value: number, max: number) => {
    return Math.min(100, Math.max(0, (value / max) * 100));
  };

  // Fonction pour formatter les nombres avec séparateurs de milliers
  const formatNumber = (num: number) => {
    // Vérifier si le nombre est NaN, null ou undefined
    if (num === null || num === undefined || isNaN(num)) {
      return '0';
    }
    
    // Arrondir les nombres pour éviter les problèmes de virgule flottante
    let value = num;
    
    // Convertir les nombres très grands en K, M, etc.
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)} M`;
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)} k`;
    }
    
    // Pour les petits nombres, formatter avec la locale correcte
    // En s'assurant qu'ils ne causent pas de problèmes d'affichage
    try {
      // Pour les nombres entiers, ne pas afficher de décimales
      if (Number.isInteger(value)) {
        return new Intl.NumberFormat('fr-FR', {
          maximumFractionDigits: 0
        }).format(value);
      }
      
      // Pour les nombres décimaux, limiter à 1 décimale
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value);
    } catch (error) {
      console.error('Erreur de formatage du nombre:', error);
      // En cas d'erreur, retourner le nombre brut formaté simplement
      return value.toFixed(1);
    }
  };

  // Fonction pour formater les résultats financiers (toujours avec le symbole €)
  const formatCurrency = (num: number) => {
    if (num === null || num === undefined || isNaN(num)) {
      return '0 €';
    }
    
    // Toujours arrondir aux entiers pour les montants financiers
    const value = Math.round(num);
    
    try {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value);
    } catch (error) {
      console.error('Erreur de formatage de la devise:', error);
      return `${value} €`;
    }
  };

  // Navigation manuelle vers le simulateur avancé
  const navigateToAdvancedSimulator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Navigation vers le simulateur avancé... - URL:", window.location.origin + '/simulateur-avance');
    
    // Utiliser window.location.assign pour une redirection plus fiable
    try {
      window.location.assign(window.location.origin + '/simulateur-avance');
    } catch (error) {
      console.error("Erreur lors de la redirection:", error);
      // Fallback
      window.location.href = '/simulateur-avance';
    }
  };

  return (
    <section id="simulateur" className="section py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-01 mb-4">
            <Calculator className="h-6 w-6 text-cream" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-01 mb-3">
            Calculez votre impact écologique
          </h2>
          <p className="text-base max-w-xl mx-auto text-black mb-3">
            Transformez vos actions en impact mesurable, en quelques clics !
          </p>
          <div className="w-16 h-1 bg-green-01 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 reveal">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Users className="h-4 w-4 text-green-01" />
              <h3 className="text-lg font-bold text-green-01">Configuration de l'entreprise</h3>
            </div>
            
            {/* Nombre d'employés */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="bg-green-03 p-1.5 rounded-md">
                  <Users className="h-4 w-4 text-green-01" />
                </div>
                <label htmlFor="effectif" className="text-sm text-green-01 font-semibold">
                  Nombre total d'employés
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  id="effectif" 
                  min="1" 
                  value={effectif || ''}
                  onChange={(e) => handleInputChange(setEffectif, e.target.value)}
                  className="border-green-03 focus:border-green-01 bg-white max-w-[70px] h-8 text-sm"
                />
                <div className="flex-1">
                  <Slider
                    value={[effectif]}
                    min={1}
                    max={5000}
                    step={10}
                    onValueChange={(values) => handleSliderChange(setEffectif, values)}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1</span>
                    <span>2500</span>
                    <span>5000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-4 w-4 text-green-01" />
              <h3 className="text-lg font-bold text-green-01">Actions écologiques</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-6">
              {/* Covoiturage */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="bg-green-03 p-1.5 rounded-md">
                    <Car className="h-3.5 w-3.5 text-green-01" />
                  </div>
                  <label htmlFor="covoiturage" className="text-sm text-green-01 font-semibold">
                    Employés qui covoiturent
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    id="covoiturage" 
                    min="0"
                    max={effectif}
                    value={covoiturage || ''}
                    onChange={(e) => handleInputChange(setCovoiturage, e.target.value)}
                    className="border-green-03 focus:border-green-01 bg-white max-w-[60px] h-8 text-sm"
                  />
                  <div className="flex-1">
                    <Slider
                      value={[covoiturage]}
                      min={0}
                      max={effectif}
                      step={1}
                      onValueChange={(values) => handleSliderChange(setCovoiturage, values)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mr-2">
                    <div 
                      className="bg-green-01 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${calculatePercentage(covoiturage, effectif)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {Math.round(calculatePercentage(covoiturage, effectif))}%
                  </span>
                </div>
              </div>
              
              {/* Vélo */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="bg-green-03 p-1.5 rounded-md">
                    <Bike className="h-3.5 w-3.5 text-green-01" />
                  </div>
                  <label htmlFor="velo" className="text-sm text-green-01 font-semibold">
                    Employés à vélo ou à pied
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    id="velo" 
                    min="0"
                    max={effectif}
                    value={velo || ''}
                    onChange={(e) => handleInputChange(setVelo, e.target.value)}
                    className="border-green-03 focus:border-green-01 bg-white max-w-[60px] h-8 text-sm"
                  />
                  <div className="flex-1">
                    <Slider
                      value={[velo]}
                      min={0}
                      max={effectif}
                      step={1}
                      onValueChange={(values) => handleSliderChange(setVelo, values)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mr-2">
                    <div 
                      className="bg-green-01 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${calculatePercentage(velo, effectif)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {Math.round(calculatePercentage(velo, effectif))}%
                  </span>
                </div>
              </div>
              
              {/* Tri déchets */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="bg-green-03 p-1.5 rounded-md">
                    <Trash2 className="h-3.5 w-3.5 text-green-01" />
                  </div>
                  <label htmlFor="dechets" className="text-sm text-green-01 font-semibold">
                    Sacs triés par mois
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    id="dechets" 
                    min="0" 
                    value={dechets || ''}
                    onChange={(e) => handleInputChange(setDechets, e.target.value)}
                    className="border-green-03 focus:border-green-01 bg-white max-w-[60px] h-8 text-sm"
                  />
                  <div className="flex-1">
                    <Slider
                      value={[dechets]}
                      min={0}
                      max={500}
                      step={5}
                      onValueChange={(values) => handleSliderChange(setDechets, values)}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>250</span>
                  <span>500</span>
                </div>
              </div>
              
              {/* Jours extinction */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="bg-green-03 p-1.5 rounded-md">
                    <Power className="h-3.5 w-3.5 text-green-01" />
                  </div>
                  <label htmlFor="joursEteints" className="text-sm text-green-01 font-semibold">
                    Jours d'extinction par mois
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    id="joursEteints" 
                    min="0"
                    max="30"
                    value={joursEteints || ''}
                    onChange={(e) => handleInputChange(setJoursEteints, e.target.value)}
                    className="border-green-03 focus:border-green-01 bg-white max-w-[60px] h-8 text-sm"
                  />
                  <div className="flex-1">
                    <Slider
                      value={[joursEteints]}
                      min={0}
                      max={30}
                      step={1}
                      onValueChange={(values) => handleSliderChange(setJoursEteints, values)}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0j</span>
                  <span>15j</span>
                  <span>30j</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-6">
              <Button 
                type="button"
                onClick={calculerEconomies}
                className={`w-full md:w-auto bg-green-01 hover:bg-green-800 text-cream px-6 py-2 h-auto text-sm rounded-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-md ${isUpdating ? 'opacity-70' : ''}`}
              >
                <span>{isUpdating ? "Calcul en cours..." : "Recalculer mon impact"}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Bouton unique pour le simulateur avancé avec méthode de navigation améliorée */}
              <a 
                href="/simulateur-avance"
                onClick={navigateToAdvancedSimulator}
                className="inline-block w-full md:w-auto mt-2 md:mt-0"
              >
                <Button 
                  type="button" 
                  className="w-full bg-cream border border-green-01 text-green-01 hover:bg-green-03 px-6 py-2 h-auto text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Simulateur avancé</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
          
          {hasCalculated && (
            <div 
              id="resultat-calculateur" 
              className={`bg-green-03 p-6 transition-all duration-500 ${animateResults ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'} ${isUpdating ? 'opacity-80' : ''}`}
            >
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-green-01">Résultats de l'impact</h3>
                <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-green-01">
                  <TrendingUp className="h-4 w-4 text-cream" />
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Impact environnemental */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-4 w-4 text-green-01" />
                      <h4 className="text-sm font-bold text-green-01">Impact environnemental</h4>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Économie de CO₂</p>
                      <div className="flex items-end">
                        <span className="text-2xl font-bold text-green-01">{formatNumber(totalCo2)}</span>
                        <span className="ml-1 text-xs text-gray-500">tonnes/an</span>
                      </div>
                      <div className="mt-1.5 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-01 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(100, totalCo2 * 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Impact financier */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-01" />
                      <h4 className="text-sm font-bold text-green-01">Impact financier</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Économies</p>
                        <span className="text-base font-bold text-green-01">{formatCurrency(totalEuro)}</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Coût</p>
                        <span className="text-base font-bold text-gray-700">{formatCurrency(coutTotal)}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <p className="text-xs text-gray-500">Résultat net</p>
                      <span className={`text-xl font-bold ${resultatNet >= 0 ? 'text-green-01' : 'text-red-500'}`}>
                        {formatCurrency(resultatNet)}/an
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Résultat total */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-bold text-green-01 mb-3 text-center">Impact total annuel</h4>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">CO₂ économisé</p>
                      <div className="flex items-center justify-center">
                        <span className="text-xl font-bold text-green-01">{formatNumber(totalCo2)}</span>
                        <span className="ml-1 text-xs text-gray-600">t</span>
                      </div>
                    </div>
                    
                    <div className="h-10 w-px bg-gray-200 mx-2"></div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Économies financières</p>
                      <div className="flex items-center justify-center">
                        <span className={`text-xl font-bold ${resultatNet >= 0 ? 'text-green-01' : 'text-gray-400'}`}>
                          {resultatNet >= 0 ? formatCurrency(resultatNet).replace(' €', '') : "0"}
                        </span>
                        <span className="ml-1 text-xs text-gray-600">€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-3 flex-col sm:flex-row justify-center">
                    <Button 
                      type="button"
                      className="bg-green-01 hover:bg-green-800 text-cream px-4 py-1.5 text-xs rounded-md shadow-sm transform hover:scale-105 transition-all duration-300"
                    >
                      Commencer avec EcoQuest
                    </Button>
                    
                    <a 
                      href="/simulateur-avance"
                      onClick={navigateToAdvancedSimulator}
                    >
                      <Button
                        type="button"
                        className="bg-green-03 text-green-01 hover:bg-green-04 border border-green-01 px-4 py-1.5 text-xs rounded-md shadow-sm transition-all duration-300 flex items-center gap-1"
                      >
                        <BarChart3 className="h-3 w-3" />
                        <span>Analyse détaillée</span>
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Indicateur de calcul mis à jour */}
          {hasCalculated && (
            <div className={`text-center text-xs text-gray-500 pb-3 transition-opacity duration-300 ${isUpdating ? 'opacity-100' : 'opacity-0'}`}>
              Mise à jour des calculs en cours...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarbonCalculator;
