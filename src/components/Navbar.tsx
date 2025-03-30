
import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RedPandaMascot from './RedPandaMascot';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`w-full py-4 transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 z-50 bg-green-01 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2">
              <RedPandaMascot pose="excited" size="sm" />
            </div>
            <span className={`text-xl font-bold font-quicksand ${isSticky ? 'text-cream' : 'text-green-01'}`}>
              EcoQuest
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Accueil', 'Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`font-medium transition-colors hover:text-green-02 ${
                  isSticky ? 'text-cream' : 'text-black'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className={`px-4 py-2 rounded-xl font-bold ${
              isSticky 
                ? 'bg-cream text-green-01 hover:bg-green-03 hover:text-green-01' 
                : 'bg-green-01 text-cream hover:bg-green-02'
            } hover:scale-105 transition-all duration-300`}>
              Demander une démo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-green-01"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? 
              <X className={`h-6 w-6 ${isSticky ? 'text-cream' : 'text-green-01'}`} /> : 
              <Menu className={`h-6 w-6 ${isSticky ? 'text-cream' : 'text-green-01'}`} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              {['Accueil', 'Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-medium text-black hover:text-green-01"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center space-x-2">
                <RedPandaMascot pose="victory" size="sm" />
                <Button className="game-button-primary w-full rounded-xl">
                  Demander une démo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
