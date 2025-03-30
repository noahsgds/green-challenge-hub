
import { Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RedPandaMascot from './RedPandaMascot';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-01 to-green-02 text-cream relative overflow-hidden">
      <div className="absolute -top-6 -right-6 opacity-10 w-64 h-64 rounded-full bg-orange-400 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 opacity-10 w-48 h-48 rounded-full bg-orange-500 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-16 -left-6 transform -rotate-12 hidden md:block">
            <RedPandaMascot pose="victory" size="lg" />
          </div>
          
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-03">
            <Leaf className="h-8 w-8 text-green-01" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer l'engagement écologique dans votre entreprise ?
          </h2>
          
          <p className="text-lg mb-8 opacity-90">
            Rejoignez les entreprises qui font de l'écologie un moteur d'engagement et d'innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-cream text-green-01 hover:bg-green-03 hover:scale-105 transition-all duration-300 shadow-lg px-8 py-6 text-base font-bold rounded-xl">
              Demander une démo
            </Button>
            <Button className="bg-transparent border-2 border-cream text-cream hover:bg-green-02 hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold rounded-xl">
              Télécharger la brochure
            </Button>
          </div>
          
          <div className="absolute -bottom-10 -right-6 transform rotate-12 hidden md:block">
            <RedPandaMascot pose="bamboo" size="md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
