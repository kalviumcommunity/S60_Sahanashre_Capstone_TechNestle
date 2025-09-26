import { useNavigate } from "react-router-dom";
import techlogo from "../assets/schoolbg.png";
import tech1 from "../assets/tech1.png";
import tech2 from "../assets/tech2.png";
// import tech3 from "../assets/tech3.png";
import tech4 from "../assets/tech4.png";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Mainpg() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const images = [tech1, tech2, tech4];
  const texts = [
    "Connect with Top Developers",
    "Find Your Perfect Tech Partner",
    "Build Amazing Projects Together",
    "Join the Tech Community"
  ];

  // Image carousel
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  // Text typing animation
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    if (typedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText("");
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentTextIndex, texts]);

  // Page load animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar>
        <div className="flex items-center space-x-2 transform hover:scale-105 transition-all duration-300">
          <img src={techlogo} alt="TechLogo" className="h-8 animate-pulse" />
          <h1 className="font-bold text-xl">Tech Nestle</h1>
        </div>
      </Navbar>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white pt-32 pb-16">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-teal-100/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          </div>

          <div className="relative container mx-auto px-6">
            {/* Main Header */}
            <div className={`text-center mb-12 transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}>
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={techlogo} 
                  alt="TechLogo" 
                  className="h-16 transform hover:rotate-12 transition-transform duration-500 animate-bounce" 
                />
                <h1 className="font-bold text-6xl ml-4 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 bg-clip-text text-transparent animate-pulse">
                  Tech Nestle
                </h1>
              </div>
              
              {/* Typing Animation with different effects per text */}
              <div className="h-16 flex items-center justify-center">
                <p className={`text-2xl font-semibold text-gray-700 transition-all duration-500 ${
                  currentTextIndex === 0 ? 'animate-bounce' : 
                  currentTextIndex === 1 ? 'animate-pulse' : 
                  currentTextIndex === 2 ? 'transform hover:scale-105' : 
                  'animate-fade-in-out'
                }`}>
                  {typedText}
                  <span className="animate-ping inline-block w-1 h-6 bg-blue-600 ml-1"></span>
                </p>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The ultimate platform to connect with talented developers, collaborate on projects, 
                and bring your ideas to life with the right technical expertise.
              </p>
            </div>

            {/* Image Carousel & CTA */}
            <div className={`flex flex-col lg:flex-row items-center justify-center gap-12 mb-16 transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Carousel */}
              <div className="w-full lg:w-1/2 max-w-lg">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/50 to-teal-400/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-blue-100">
                    <img
                      src={images[currentIndex]}
                      alt={`Tech Image ${currentIndex + 1}`}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                              ? 'bg-blue-500 scale-125 shadow-lg' 
                              : 'bg-blue-300/50 hover:bg-blue-400/80'
                          }`}
                          onClick={() => setCurrentIndex(index)}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in-up">
                  Ready to Start Your Next Project?
                </h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Join thousands of developers and project creators who are building the future together. Whether you’re a seasoned developer or just starting your coding journey, TechNestle has the tools, resources, and community to help you grow.
                </p>
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-xl rounded-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  <span className="relative z-10">Get Started Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`py-20 bg-white transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg mb-16 border border-blue-100">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-down">How Tech Nestle Works</h2>
                <p className="text-gray-600 text-lg">Simple steps to connect with the perfect developer</p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center lg:w-1/3 animate-slide-in-left">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                    1
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Browse Developers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore profiles of talented developers with diverse skills and experience levels
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block text-4xl text-blue-300 transform hover:text-blue-500 hover:scale-110 transition-all duration-300 animate-pulse">
                →
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center lg:w-1/3 animate-fade-in-up delay-200">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                    2
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full animate-ping delay-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Send Request</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect instantly with developers who match your project requirements
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden lg:block text-4xl text-teal-300 transform hover:text-teal-500 hover:scale-110 transition-all duration-300 animate-pulse delay-300">
                →
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center lg:w-1/3 animate-slide-in-right">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                    3
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-ping delay-1000"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Start Building</h3>
                <p className="text-gray-600 leading-relaxed">
                  Collaborate and bring your amazing project ideas to life together
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`py-20 bg-gradient-to-br from-blue-50/50 to-white transform transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-xl shadow-lg mb-16 border border-blue-100">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce-in">What Our Users Say</h2>
                <p className="text-gray-600 text-lg">Real experiences from our amazing community</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-300 group border border-blue-100 animate-slide-in-up">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:animate-spin">
                    J
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Johnson</h4>
                    <p className="text-gray-500 text-sm">Startup Founder</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  Tech Nestle helped me find the perfect React developer for my startup. The process was smooth and the quality of developers is outstanding!
                </p>
                <div className="flex text-yellow-400 mt-4 animate-pulse">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:-rotate-1 transition-all duration-300 group border border-teal-100 animate-slide-in-up delay-200">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:animate-spin">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Sasdi</h4>
                    <p className="text-gray-500 text-sm">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  As a developer, I love how easy it is to showcase my skills and connect with exciting projects. The platform is intuitive and effective.
                </p>
                <div className="flex text-yellow-400 mt-4 animate-pulse delay-100">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-300 group border border-purple-100 animate-slide-in-up delay-400">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:animate-spin">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Alex</h4>
                    <p className="text-gray-500 text-sm">Project Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  The quality of developers and the seamless collaboration tools make Tech Nestle the go-to platform for any tech project.
                </p>
                <div className="flex text-yellow-400 mt-4 animate-pulse delay-200">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      <Footer/>
    </div>
  );
}

export default Mainpg;