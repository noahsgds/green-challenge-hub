
import { Leaf, Trophy, LineChart, Users, BadgeCheck, Repeat } from 'lucide-react';
import { useEffect } from 'react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="eco-card group hover:border-green-01 reveal">
      <div className="bg-green-03 p-3 rounded-full inline-flex mb-4 group-hover:bg-green-01 transition-colors">
        <Icon className="h-6 w-6 text-green-01 group-hover:text-cream transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-green-01">{title}</h3>
      <p className="text-black">{description}</p>
    </div>
  );
};

const Features = () => {
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

  const features = [
    {
      icon: Leaf,
      title: "Défis écologiques",
      description: "Proposez des challenges environnementaux personnalisés selon votre secteur d'activité et vos objectifs RSE."
    },
    {
      icon: Trophy,
      title: "Système de récompenses",
      description: "Motivez vos équipes avec des badges, points et récompenses réelles pour les actions écologiques accomplies."
    },
    {
      icon: LineChart,
      title: "Métriques d'impact",
      description: "Mesurez l'impact environnemental réel des actions de vos collaborateurs avec des KPIs précis."
    },
    {
      icon: Users,
      title: "Compétition d'équipes",
      description: "Créez une émulation positive entre départements avec des classements et challenges inter-équipes."
    },
    {
      icon: BadgeCheck,
      title: "Reconnaissance RSE",
      description: "Valorisez vos initiatives dans vos rapports RSE avec des données précises et certifiées."
    },
    {
      icon: Repeat,
      title: "Habitudes durables",
      description: "Transformez les comportements ponctuels en habitudes écologiques grâce à notre système de progression."
    }
  ];

  return (
    <section id="fonctionnalités" className="section bg-green-03 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="inline-block badge mb-4">Fonctionnalités</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Un écosystème complet de gamification écologique
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black">
            Notre plateforme intègre tous les outils nécessaires pour engager vos collaborateurs dans une démarche écologique ludique et mesurable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
