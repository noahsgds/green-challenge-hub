import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const TestPage = () => {
  console.log('TestPage rendered');
  
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-01 mb-4">Page de Test</h1>
        <p className="text-gray-700 mb-6">
          Cette page est visible, ce qui signifie que le routage fonctionne correctement.
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TestPage; 