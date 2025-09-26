import Navbar from "./Navbar";
import Footer from "./Footer";
import mission from "../assets/mission.png";
import join from "../assets/join.png";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24">
        <div className="container mx-auto px-7 py-12">
          {/* Header Section */}
          <div className="bg-blue-100 rounded-xl p-8 mb-10 text-center">
            <h1 className="font-bold text-4xl text-gray-900 mb-4">About TechNestle</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Your go-to platform for mastering web development and connecting with passionate developers worldwide.
            </p>
          </div>

          {/* Introduction Section */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to TechNestle, your go-to platform for mastering web development. Our mission is to empower developers at every stage, from those just starting out to seasoned pros eager to learn more.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At TechNestle, we believe in the power of community and collaboration. Our platform is designed to bring together passionate developers who share a common goal: to innovate and improve the digital world.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-blue-100 rounded-xl p-8 mb-10">
            <h2 className="font-bold text-3xl text-gray-900 mb-8 text-center">Our Mission 🌟</h2>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <img 
                  src={mission} 
                  alt="Mission Image" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>
              <div className="lg:w-2/3 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At TechNestle, we aim to create an inclusive environment for learning and collaboration. Our mission is to cultivate a community where knowledge is shared, learning is continuous, and every developer can thrive in their professional journey.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are dedicated to offering a variety of resources, including tutorials, workshops, and mentorship opportunities that cater to developers of all skill levels. We envision a space where everyone can contribute and grow.
                </p>
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-10">
            <h2 className="font-bold text-3xl text-gray-900 mb-8 text-center">Join Us Today! 🚀</h2>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether your passion lies in frontend design, backend programming, or creating user-friendly experiences, TechNestle is here for you. Become part of our dynamic community and take your web development skills to new heights. Together, we can redefine the future of web technology!
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By joining TechNestle, you gain access to a wealth of knowledge, practical experience, and a network of like-minded individuals. Let us collaborate, share ideas, and create exceptional digital experiences together!
                </p>
              </div>
              <div className="lg:w-1/3">
                <img 
                  src={join} 
                  alt="Join Image" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 hover:border-blue-600 transition-all transform hover:-translate-y-2">
              <div className="text-blue-600 text-4xl mb-4 text-center">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Learn</h3>
              <p className="text-gray-700 text-center">
                Access comprehensive tutorials and resources designed to help you master web development technologies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 hover:border-blue-600 transition-all transform hover:-translate-y-2">
              <div className="text-blue-600 text-4xl mb-4 text-center">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Connect</h3>
              <p className="text-gray-700 text-center">
                Network with developers worldwide and build meaningful relationships that last throughout your career.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-xl border-2 hover:border-blue-600 transition-all transform hover:-translate-y-2">
              <div className="text-blue-600 text-4xl mb-4 text-center">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Grow</h3>
              <p className="text-gray-700 text-center">
                Take advantage of mentorship opportunities and collaborative projects to accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;