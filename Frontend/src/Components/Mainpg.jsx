import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaLaptopCode, FaUsers, FaRocket } from 'react-icons/fa';
import techlogo from "../assets/schoolbg.png";
import tech1 from "../assets/tech1.png";
import tech2 from "../assets/tech2.png";
import tech3 from "../assets/tech3.png";
import tech4 from "../assets/tech4.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Icon className="text-4xl text-teal-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

function Mainpg() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [tech1, tech2, tech3, tech4];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <div className="flex items-center space-x-2">
          <img src={techlogo} alt="TechLogo" className="h-8" />
          <h1 className="font-bold text-xl">Tech Nestle</h1>
        </div>
      </Navbar>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with Top Developers and Engineers</h1>
              <p className="text-xl mb-6">Elevate your skills, find mentors, and explore opportunities in the tech world.</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-teal-600 font-bold py-3 px-6 rounded-full hover:bg-teal-100 transition duration-300"
              >
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 pt-4">
              <img
                src={images[currentIndex]}
                alt={`Tech ${currentIndex + 1}`}
                className="w-full h-64 md:h-96 rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Tech Nestle?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={FaGraduationCap}
                title="Learn from Experts"
                description="Access workshops and tutorials from industry professionals."
              />
              <FeatureCard
                icon={FaLaptopCode}
                title="Real-world Projects"
                description="Collaborate on actual projects to build your portfolio."
              />
              <FeatureCard
                icon={FaUsers}
                title="Networking"
                description="Connect with peers and mentors in the tech community."
              />
              <FeatureCard
                icon={FaRocket}
                title="Career Growth"
                description="Get guidance on career paths and job opportunities."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8">Join Tech Nestle today and take the first step towards a successful tech career.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-teal-100 transition duration-300"
            >
              Sign Up Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Mainpg;