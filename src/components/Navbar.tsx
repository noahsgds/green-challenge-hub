import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

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
            <Link to="/">
              <div className="flex items-center">
                <Leaf className={`h-8 w-8 ${isSticky ? 'text-cream' : 'text-green-01'}`} />
                <span className={`ml-2 text-xl font-bold font-quicksand ${isSticky ? 'text-cream' : 'text-green-01'}`}>
                  EcoQuest
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Accueil', 'Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map((item) => {
              const path = item === 'Accueil' ? '/' : `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Link
                  key={item}
                  to={path}
                  className={`font-medium transition-colors hover:text-green-02 ${
                    isSticky ? 'text-cream' : 'text-black'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            <Link to="/test" className={`font-medium transition-colors hover:text-green-02 ${isSticky ? 'text-cream' : 'text-black'}`}>
              Test
            </Link>
            <Link to="/simulateur-avance" className={`font-medium transition-colors hover:text-green-02 ${isSticky ? 'text-cream' : 'text-black'}`}>
              Simulateur
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="game-button-primary px-4 py-2">
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
          <div className="md:hidden mt-4 py-4 bg-cream rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              {['Accueil', 'Fonctionnalités', 'Comment ça marche', 'Témoignages', 'Tarifs'].map((item) => {
                const path = item === 'Accueil' ? '/' : `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <Link
                    key={item}
                    to={path}
                    className="font-medium text-black hover:text-green-01"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                );
              })}
              <Link to="/test" className="font-medium text-black hover:text-green-01" onClick={() => setIsMenuOpen(false)}>
                Test
              </Link>
              <Link to="/simulateur-avance" className="font-medium text-black hover:text-green-01" onClick={() => setIsMenuOpen(false)}>
                Simulateur
              </Link>
              <Button className="game-button-primary w-full">
                Demander une démo
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
