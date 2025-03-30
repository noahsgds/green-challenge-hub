
import { useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import RedPandaMascot from './RedPandaMascot';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
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

  const steps = [
    {
      number: "01",
      title: "Configuration personnalisée",
      description: "Nous adaptons la plateforme à vos objectifs écologiques spécifiques et à votre culture d'entreprise.",
      mascotPose: "reading" as const
    },
    {
      number: "02",
      title: "Déploiement & Formation",
      description: "Installation simple et formation rapide de vos ambassadeurs internes pour une adoption optimale.",
      mascotPose: "sitting" as const
    },
    {
      number: "03",
      title: "Engagement des équipes",
      description: "Vos collaborateurs rejoignent la plateforme, forment des équipes et commencent à relever des défis écologiques.",
      mascotPose: "excited" as const
    },
    {
      number: "04",
      title: "Suivi & Optimisation",
      description: "Analyse des données, ajustement des défis et célébration des succès pour maximiser l'impact dans la durée.",
      mascotPose: "victory" as const
    }
  ];

  return (
    <section id="comment-ça-marche" className="section bg-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-green-03 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-56 h-56 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 badge mb-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full">
              <Sparkles size={16} className="animate-pulse" />
              Processus
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Comment fonctionne EcoQuest ?
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto text-black">
            Une mise en place simple pour un impact maximal sur l'engagement écologique de vos équipes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="bg-white rounded-xl p-6 h-full border-b-4 border-green-01 hover:shadow-xl transition-all duration-300 relative group">
                <div className="absolute -top-8 -right-6 transform scale-75 opacity-90 transition-all duration-300 group-hover:rotate-12">
                  <RedPandaMascot pose={step.mascotPose} size="sm" />
                </div>
                
                <div className="text-4xl font-quicksand font-bold bg-gradient-to-r from-green-01 to-green-02 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-green-01">{step.title}</h3>
                <p className="text-black">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform translate-x-0 -translate-y-1/2 text-green-02">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-br from-green-01 to-green-02 rounded-2xl p-8 text-cream reveal shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -top-8 -left-8 hidden md:block">
            <RedPandaMascot pose="bamboo" size="lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 md:pl-16">
              <h3 className="text-2xl font-bold mb-4">Prêt à révolutionner l'engagement écologique dans votre entreprise ?</h3>
              <p className="mb-4">
                EcoQuest s'adapte à toutes les tailles d'entreprises et tous les secteurs d'activité. Notre équipe vous accompagne à chaque étape.
              </p>
              <ul className="list-none pl-0 mb-6 space-y-2">
                {[
                  "Mise en place en moins de 2 semaines",
                  "Compatible avec vos outils existants",
                  "Accompagnement personnalisé"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-03 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green-01"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Button className="game-button-primary px-6 py-6 text-base font-bold bg-cream text-green-01 hover:bg-green-03 hover:text-green-01 hover:scale-105 transition-all duration-300 rounded-xl shadow-lg">
                <Sparkles size={18} className="mr-2" />
                Planifier une démo
              </Button>
            </div>
          </div>
          
          <div className="absolute -bottom-8 -right-8 hidden md:block">
            <RedPandaMascot pose="excited" size="md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
