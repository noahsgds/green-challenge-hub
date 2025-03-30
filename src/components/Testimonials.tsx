
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marie Dupont",
      role: "Directrice RSE",
      company: "Green Solutions Inc.",
      quote: "EcoQuest a complètement transformé notre approche des initiatives écologiques. Nos collaborateurs sont désormais engagés activement et nous avons réduit notre empreinte carbone de 23% en seulement 6 mois.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Thomas Laurent",
      role: "DRH",
      company: "Eco Industries",
      quote: "La gamification proposée par EcoQuest a créé une véritable cohésion d'équipe autour des enjeux environnementaux. C'est devenu un élément central de notre culture d'entreprise.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Sophie Moreau",
      role: "CEO",
      company: "Sustainable Future",
      quote: "Avec EcoQuest, nous avons enfin trouvé une solution qui rend nos objectifs RSE concrets et mesurables. Le ROI est évident, tant sur l'aspect environnemental que sur l'engagement de nos talents.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    }
  ];

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="témoignages" className="section bg-green-03">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <span className="inline-block badge mb-4">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-01 mb-6">
            Ce que nos clients disent
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-black">
            Découvrez comment EcoQuest transforme l'engagement écologique dans diverses entreprises.
          </p>
        </div>

        <div className="max-w-4xl mx-auto reveal">
          <div className="bg-cream rounded-2xl p-8 shadow-lg relative">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-green-01">
                  <img 
                    src={currentTestimonial.image} 
                    alt={currentTestimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-green-01">{currentTestimonial.name}</h4>
                <p className="text-sm text-black mb-1">{currentTestimonial.role}</p>
                <p className="text-sm font-medium text-green-02">{currentTestimonial.company}</p>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < currentTestimonial.rating ? "text-green-01 fill-green-01" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-2/3">
                <blockquote className="text-lg italic text-black">
                  "{currentTestimonial.quote}"
                </blockquote>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full bg-green-02 text-cream hover:bg-green-01 transition-colors"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-green-01" : "bg-green-02 opacity-50"
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-green-02 text-cream hover:bg-green-01 transition-colors"
                aria-label="Témoignage suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
