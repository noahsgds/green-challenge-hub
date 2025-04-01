
import { Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-16 bg-green-01 text-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-02">
            <Leaf className="h-8 w-8 text-cream" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer l'engagement écologique dans votre entreprise ?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez les entreprises qui font de l'écologie un moteur d'engagement et d'innovation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-cream text-green-01 hover:bg-green-03 hover:text-black game-button px-8 py-3 text-base h-auto">
              Demander une démo
            </Button>
            <Button className="bg-transparent border-2 border-cream text-cream hover:bg-green-02 game-button px-8 py-3 text-base h-auto">
              Télécharger la brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
