
import { ArrowDown, Sparkles, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RedPandaMascot from './RedPandaMascot';

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('fonctionnalités');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="pt-20 pb-16 md:pt-28 md:pb-24 bg-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-03 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            <div className="absolute -top-10 -left-10 hidden md:block">
              <RedPandaMascot pose="excited" size="md" className="animate-bounce-slow" />
            </div>
            
            <div className="inline-block mb-4">
              <span className="badge bg-gradient-to-r from-orange-400 to-orange-500 text-white py-1 px-3 rounded-full flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse" />
                Nouveau
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-01 mb-6 leading-tight">
              Faites de l'écologie un jeu d'équipe
            </h1>
            
            <p className="text-lg md:text-xl text-black mb-8 max-w-lg">
              La première solution de gamification B2B qui transforme les initiatives écologiques en défis ludiques et récompenses pour vos collaborateurs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-01 text-cream hover:bg-green-02 hover:scale-105 transition-all duration-300 shadow-lg px-6 py-6 text-base font-bold rounded-xl">
                <Trophy size={20} className="mr-2" />
                Demander une démo
              </Button>
              <Button variant="outline" className="border-2 border-green-01 text-green-01 hover:bg-green-03 hover:scale-105 transition-all duration-300 px-6 py-6 text-base font-bold rounded-xl">
                En savoir plus
              </Button>
            </div>
            
            <div className="mt-10 flex items-center text-green-02">
              <span className="mr-2 text-sm font-medium">Découvrez nos fonctionnalités</span>
              <button 
                onClick={scrollToFeatures}
                className="rounded-full bg-green-03 p-2 hover:bg-green-02 hover:text-cream transition-colors animate-bounce"
                aria-label="Voir les fonctionnalités"
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-02 to-green-01 p-4">
              <div className="bg-cream rounded-xl overflow-hidden">
                <div className="bg-green-01 text-cream py-2 px-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <RedPandaMascot pose="default" size="sm" />
                    <span className="ml-2 font-bold">EcoQuest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="badge bg-green-03 text-green-01 text-xs px-2 py-1 rounded-full">Niveau 3</div>
                    <div className="badge bg-orange-400 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Sparkles size={10} />
                      230 pts
                    </div>
                  </div>
                </div>
                
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Interface de EcoQuest" 
                  className="w-full object-cover h-40"
                />
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-green-02 to-green-01 w-10 h-10 rounded-full flex items-center justify-center text-cream font-quicksand font-bold text-sm">Lvl 3</div>
                      <span className="ml-2 font-quicksand text-green-01 font-bold">Éco-héros</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RedPandaMascot pose="victory" size="sm" />
                    </div>
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
                  
                  <div className="p-3 bg-green-03 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <RedPandaMascot pose="bamboo" size="sm" />
                      <span className="text-sm font-medium text-green-01">Prochain défi: Co-voiturage</span>
                    </div>
                    <Button className="bg-gradient-to-r from-green-01 to-green-02 text-cream hover:opacity-90 text-xs px-3 py-1 rounded-lg">
                      Accepter
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-5 right-5 bg-orange-400 text-white rounded-full px-3 py-1 text-xs font-medium transform rotate-12 animate-pulse font-quicksand">
                En temps réel
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 transform rotate-6">
              <RedPandaMascot pose="sitting" size="md" />
            </div>
            
            <div className="absolute -top-10 -right-10 hidden md:block transform -rotate-12">
              <RedPandaMascot pose="love" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
