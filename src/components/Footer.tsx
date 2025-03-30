
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream text-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Leaf className="h-6 w-6 text-green-01" />
              <span className="ml-2 text-xl font-bold font-quicksand text-green-01">
                EcoQuest
              </span>
            </div>
            <p className="text-sm mb-6">
              La solution B2B qui transforme les initiatives écologiques en expériences ludiques et engageantes pour vos collaborateurs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-01 hover:text-green-02">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-green-01 hover:text-green-02">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-green-01 hover:text-green-02">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-green-01 hover:text-green-02">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-01">Produit</h4>
            <ul className="space-y-2">
              <li><a href="#fonctionnalités" className="hover:text-green-01">Fonctionnalités</a></li>
              <li><a href="#comment-ça-marche" className="hover:text-green-01">Comment ça marche</a></li>
              <li><a href="#tarifs" className="hover:text-green-01">Tarifs</a></li>
              <li><a href="#" className="hover:text-green-01">Études de cas</a></li>
              <li><a href="#" className="hover:text-green-01">Guide d'intégration</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-01">Ressources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-01">Blog</a></li>
              <li><a href="#" className="hover:text-green-01">Centre de ressources</a></li>
              <li><a href="#" className="hover:text-green-01">Partenaires</a></li>
              <li><a href="#" className="hover:text-green-01">Communauté</a></li>
              <li><a href="#" className="hover:text-green-01">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-01">Entreprise</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-01">À propos</a></li>
              <li><a href="#" className="hover:text-green-01">Équipe</a></li>
              <li><a href="#" className="hover:text-green-01">Carrières</a></li>
              <li><a href="#" className="hover:text-green-01">Contact</a></li>
              <li><a href="#" className="hover:text-green-01">Presse</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-03 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} EcoQuest. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-green-01">Mentions légales</a>
              <a href="#" className="text-sm hover:text-green-01">Politique de confidentialité</a>
              <a href="#" className="text-sm hover:text-green-01">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
