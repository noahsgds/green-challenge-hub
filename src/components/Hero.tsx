
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('fonctionnalités');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="pt-20 pb-16 md:pt-32 md:pb-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block mb-4">
              <span className="badge">Nouveau</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-01 mb-6 leading-tight">
              Faites de l'écologie un jeu d'équipe
            </h1>
            <p className="text-lg md:text-xl text-black mb-8 max-w-lg">
              La première solution de gamification B2B qui transforme les initiatives écologiques en défis ludiques et récompenses pour vos collaborateurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="game-button-primary px-6 py-3 text-base">
                Demander une démo
              </Button>
              <Button variant="outline" className="game-button-outline px-6 py-3 text-base">
                En savoir plus
              </Button>
            </div>
            <div className="mt-10 flex items-center text-green-02">
              <span className="mr-2 text-sm font-medium">Découvrez nos fonctionnalités</span>
              <button 
                onClick={scrollToFeatures}
                className="rounded-full bg-green-03 p-2 hover:bg-green-02 hover:text-cream transition-colors"
                aria-label="Voir les fonctionnalités"
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-green-02 p-3">
              <div className="bg-cream rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Interface de EcoQuest" 
                  className="w-full object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="level-badge">Lvl 3</span>
                      <span className="ml-2 font-quicksand text-green-01">Éco-héros</span>
                    </div>
                    <div className="badge">230 pts</div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium text-green-01">Progression</span>
                      <span className="text-xs font-medium text-green-01">65%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-value" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="p-2 bg-green-03 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium text-green-01">Prochain défi: Co-voiturage</span>
                    <Button className="game-button-secondary text-xs px-3 py-1">
                      Accepter
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-green-01 text-cream rounded-full px-3 py-1 text-xs font-medium transform rotate-12 animate-pulse">
                En temps réel
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-03 rounded-full animate-float z-0"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-02 rounded-full animate-float z-0" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
