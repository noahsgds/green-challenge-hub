
import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CarbonCalculator = () => {
  const [effectif, setEffectif] = useState<number>(1000);
  const [covoiturage, setCovoiturage] = useState<number>(0);
  const [dechets, setDechets] = useState<number>(0);
  const [velo, setVelo] = useState<number>(0);
  const [joursEteints, setJoursEteints] = useState<number>(0);
  const [resultat, setResultat] = useState<string | null>(null);

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

  const calculerEconomies = () => {
    let consoElectriqueBase = effectif * 1500;

    let co2Covoiturage = covoiturage * 0.375;
    let co2Dechets = dechets * 0.03;
    let co2Velo = velo * 0.375;
    let co2JoursEteints = joursEteints * (consoElectriqueBase / 250 * 0.06 / 1000);
    let totalCo2 = co2Covoiturage + co2Dechets + co2Velo + co2JoursEteints;

    let euroCovoiturage = covoiturage * 187.5;
    let euroDechets = dechets * 1.5;
    let euroVelo = velo * 75;
    let euroJoursEteints = joursEteints * (consoElectriqueBase / 250 * 0.1 / 10);
    let totalEuro = euroCovoiturage + euroDechets + euroVelo + euroJoursEteints;

    let coutLicences = 0;
    let licencesRestantes = effectif;

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
    let coutTotal = coutLicences + coutPacks;

    let resultatNet = totalEuro - coutTotal;
    let resultatNetClass = resultatNet >= 0 ? 'text-green-01 font-bold' : 'text-red-500 font-bold';

    setResultat(`
      <div>
        <p class="mb-2"><span class="text-green-01">🌍 Économie de CO₂ :</span> ${totalCo2.toFixed(1)} tonnes/an</p>
        <p class="mb-2"><span class="text-green-01">💰 Économie financière :</span> ${totalEuro.toFixed(0)} €/an</p>
        <p class="mb-2"><span class="text-green-01">📊 Coût de l'abonnement EcoQuest :</span> ${coutTotal.toFixed(0)} €/an (Pack Initial + IA inclus)</p>
        <p class="${resultatNetClass} mb-2">Résultat net : ${resultatNet.toFixed(0)} €/an</p>
        <p class="font-bold mb-2">Économie totale : ${totalCo2.toFixed(1)} t CO₂ + ${resultatNet.toFixed(0)} € par an</p>
        <p class="text-sm italic mt-4">Décuplez votre impact écologique sans effort avec EcoQuest !</p>
      </div>
    `);
  };

  // Calculer automatiquement au chargement
  useEffect(() => {
    calculerEconomies();
  }, []);

  return (
    <section id="simulateur" className="section py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="inline-block badge mb-4">Simulateur</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Calculez votre impact écologique
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black">
            Transformez vos actions en impact mesurable, en quelques clics !
          </p>
        </div>

        <div className="max-w-3xl mx-auto eco-card p-8 shadow-lg transform hover:translate-y-[-5px] transition-all duration-300 reveal">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-01">
            <Calculator className="h-8 w-8 text-cream" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="effectif" className="block text-green-01 font-semibold mb-2">
                  Nombre total d'employés
                </label>
                <Input 
                  type="number" 
                  id="effectif" 
                  min="1" 
                  value={effectif} 
                  onChange={(e) => setEffectif(parseInt(e.target.value) || 1)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="covoiturage" className="block text-green-01 font-semibold mb-2">
                  Employés qui covoiturent
                </label>
                <Input 
                  type="number" 
                  id="covoiturage" 
                  min="0" 
                  value={covoiturage} 
                  onChange={(e) => setCovoiturage(parseInt(e.target.value) || 0)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="dechets" className="block text-green-01 font-semibold mb-2">
                  Sacs triés par mois
                </label>
                <Input 
                  type="number" 
                  id="dechets" 
                  min="0" 
                  value={dechets} 
                  onChange={(e) => setDechets(parseInt(e.target.value) || 0)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="velo" className="block text-green-01 font-semibold mb-2">
                  Employés à vélo ou à pied
                </label>
                <Input 
                  type="number" 
                  id="velo" 
                  min="0" 
                  value={velo} 
                  onChange={(e) => setVelo(parseInt(e.target.value) || 0)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div>
                <label htmlFor="joursEteints" className="block text-green-01 font-semibold mb-2">
                  Jours d'extinction complète par mois
                </label>
                <Input 
                  type="number" 
                  id="joursEteints" 
                  min="0" 
                  value={joursEteints} 
                  onChange={(e) => setJoursEteints(parseInt(e.target.value) || 0)}
                  className="border-green-03 focus:border-green-01 bg-white"
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={calculerEconomies}
                  className="w-full bg-green-01 hover:bg-black text-cream mt-4 game-button px-8 py-6 h-auto text-lg"
                >
                  Découvrir mon impact
                </Button>
              </div>
            </div>
          </div>
          
          {resultat && (
            <div className="mt-8 p-6 bg-green-03 rounded-xl shadow-inner reveal" dangerouslySetInnerHTML={{ __html: resultat }}>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarbonCalculator;
