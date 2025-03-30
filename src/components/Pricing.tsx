
import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface PlanProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
}

const PricingPlan = ({ title, description, price, features, highlight = false, buttonText }: PlanProps) => {
  return (
    <div className={`reveal eco-card h-full flex flex-col ${
      highlight 
        ? 'border-2 border-green-01 shadow-lg relative' 
        : ''
    }`}>
      {highlight && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-01 text-cream px-4 py-1 rounded-full text-sm font-medium">
          Recommandé
        </div>
      )}
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold mb-2 text-green-01">{title}</h3>
        <p className="text-sm text-black mb-6">{description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold text-green-01">{price}</span>
          {price !== 'Sur mesure' && <span className="text-black"> /mois</span>}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <Check className="h-5 w-5 text-green-01" />
              </div>
              <span className="ml-3 text-sm text-black">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <Button className={highlight ? "game-button-primary w-full" : "game-button-outline w-full"}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const Pricing = () => {
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

  const plans = [
    {
      title: "Starter",
      description: "Idéal pour les petites entreprises qui débutent leur transition écologique",
      price: "299€",
      features: [
        "Jusqu'à 50 utilisateurs",
        "10 défis pré-configurés",
        "Tableau de bord basique",
        "Support par email",
        "Rapport d'impact mensuel"
      ],
      buttonText: "Commencer"
    },
    {
      title: "Business",
      description: "Pour les entreprises qui veulent accélérer leur engagement écologique",
      price: "599€",
      features: [
        "Jusqu'à 200 utilisateurs",
        "Défis personnalisés illimités",
        "Tableaux de bord avancés",
        "Support prioritaire",
        "Rapports d'impact détaillés",
        "Intégration avec vos outils existants"
      ],
      highlight: true,
      buttonText: "Essai gratuit"
    },
    {
      title: "Enterprise",
      description: "Solution complète pour les grandes organisations avec des besoins spécifiques",
      price: "Sur mesure",
      features: [
        "Utilisateurs illimités",
        "Défis sur mesure selon vos objectifs RSE",
        "Tableaux de bord personnalisés",
        "Support dédié 24/7",
        "API complète et intégrations avancées",
        "Formation des ambassadeurs internes",
        "Co-branding possible"
      ],
      buttonText: "Nous contacter"
    }
  ];

  return (
    <section id="tarifs" className="section bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="inline-block badge mb-4">Tarifs</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Des forfaits adaptés à vos besoins
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black">
            Trouvez la formule qui correspond à vos objectifs et à la taille de votre organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              highlight={plan.highlight}
              buttonText={plan.buttonText}
            />
          ))}
        </div>

        <div className="mt-20 text-center reveal">
          <h3 className="text-2xl font-bold mb-4 text-green-01">Besoin d'une solution personnalisée ?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Nous pouvons adapter EcoQuest à vos besoins spécifiques, quelle que soit la taille ou le secteur de votre entreprise.
          </p>
          <Button className="game-button-primary px-8 py-3 text-base">
            Discuter avec un expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
