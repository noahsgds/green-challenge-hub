
import { useEffect } from 'react';

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
      description: "Nous adaptons la plateforme à vos objectifs écologiques spécifiques et à votre culture d'entreprise."
    },
    {
      number: "02",
      title: "Déploiement & Formation",
      description: "Installation simple et formation rapide de vos ambassadeurs internes pour une adoption optimale."
    },
    {
      number: "03",
      title: "Engagement des équipes",
      description: "Vos collaborateurs rejoignent la plateforme, forment des équipes et commencent à relever des défis écologiques."
    },
    {
      number: "04",
      title: "Suivi & Optimisation",
      description: "Analyse des données, ajustement des défis et célébration des succès pour maximiser l'impact dans la durée."
    }
  ];

  return (
    <section id="comment-ça-marche" className="section bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="inline-block badge mb-4">Processus</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Comment fonctionne EcoQuest ?
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black">
            Une mise en place simple pour un impact maximal sur l'engagement écologique de vos équipes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="bg-green-03 rounded-xl p-6 h-full border-b-4 border-green-01 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-quicksand font-bold text-green-01 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-green-01">{step.title}</h3>
                <p className="text-black">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-green-01 rounded-xl p-8 text-cream reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Prêt à révolutionner l'engagement écologique dans votre entreprise ?</h3>
              <p className="mb-4">
                EcoQuest s'adapte à toutes les tailles d'entreprises et tous les secteurs d'activité. Notre équipe vous accompagne à chaque étape.
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Mise en place en moins de 2 semaines</li>
                <li>Compatible avec vos outils existants</li>
                <li>Accompagnement personnalisé</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <button className="game-button-primary px-6 py-3 text-base bg-cream text-green-01 hover:bg-green-03 hover:text-green-01">
                Planifier une démo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
