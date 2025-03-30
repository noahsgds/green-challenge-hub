
import { Leaf, Trophy, LineChart, Users, BadgeCheck, Repeat, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import RedPandaMascot from './RedPandaMascot';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  mascotPose 
}: { 
  icon: any, 
  title: string, 
  description: string,
  mascotPose?: "default" | "bamboo" | "victory" | "sitting" | "log" | "reading" | "excited" | "love"
}) => {
  return (
    <div className="eco-card group hover:border-green-01 reveal hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="bg-gradient-to-br from-green-03 to-green-02 p-3 rounded-full inline-flex mb-4 group-hover:bg-green-01 transition-colors">
          <Icon className="h-6 w-6 text-green-01 group-hover:text-cream transition-colors" />
        </div>
        {mascotPose && (
          <div className="transform -translate-y-6 -translate-x-2 opacity-90 scale-75">
            <RedPandaMascot pose={mascotPose} size="sm" />
          </div>
        )}
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
      description: "Proposez des challenges environnementaux personnalisés selon votre secteur d'activité et vos objectifs RSE.",
      mascotPose: "bamboo" as const
    },
    {
      icon: Trophy,
      title: "Système de récompenses",
      description: "Motivez vos équipes avec des badges, points et récompenses réelles pour les actions écologiques accomplies.",
      mascotPose: "victory" as const
    },
    {
      icon: LineChart,
      title: "Métriques d'impact",
      description: "Mesurez l'impact environnemental réel des actions de vos collaborateurs avec des KPIs précis.",
      mascotPose: "reading" as const
    },
    {
      icon: Users,
      title: "Compétition d'équipes",
      description: "Créez une émulation positive entre départements avec des classements et challenges inter-équipes.",
      mascotPose: "excited" as const
    },
    {
      icon: BadgeCheck,
      title: "Reconnaissance RSE",
      description: "Valorisez vos initiatives dans vos rapports RSE avec des données précises et certifiées.",
      mascotPose: "sitting" as const
    },
    {
      icon: Repeat,
      title: "Habitudes durables",
      description: "Transformez les comportements ponctuels en habitudes écologiques grâce à notre système de progression.",
      mascotPose: "log" as const
    }
  ];

  return (
    <section id="fonctionnalités" className="section bg-gradient-to-br from-green-03 to-green-02/30 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-300 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 badge mb-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full">
              <Sparkles size={16} className="animate-pulse" />
              Fonctionnalités
            </span>
          </div>
          
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
              Un écosystème complet de gamification écologique
            </h2>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 hidden md:block">
              <RedPandaMascot pose="love" size="md" />
            </div>
          </div>
          
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
              mascotPose={feature.mascotPose}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
