import Navbar from "./Navbar";

const FrontendRoadmap = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto mt-28 px-4 mb-10">
        <div className="max-w-3xl mx-auto bg-blue-200 rounded-lg shadow-md px-8 py-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Frontend Developer Roadmap</h1>
          <div className="space-y-8 text-center">
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">1. HTML</h2>
              <ul className="list-disc pl-6">
                <li>Basic HTML Syntax</li>
                <li>Forms and Inputs</li>
                <li>Semantic HTML</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">2. CSS</h2>
              <ul className="list-disc pl-6">
                <li>Learn Basic</li>
                <li>Layouts</li>
                <li>Flex and Grid</li>
                <li>Responsive Design</li>
                <li>CSS Display</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">3. JavaScript</h2>
              <ul className="list-disc pl-6">
                <li>Basic Syntax and Operators</li>
                <li>DOM Manipulation</li>
                <li>ES6+ Features</li>
                <li>Fetch API/AJAX</li>
                <li>Event Handling</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">4. CSS Frameworks</h2>
              <ul className="list-disc pl-6">
                <li>Bootstrap</li>
                <li>Tailwind CSS</li>
                <li>Pure CSS</li>
                <li>Foundation</li>
                <li>Materialize CSS</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">5. JavaScript Frameworks/Libraries</h2>
              <ul className="list-disc pl-6">
                <li>React</li>
                <li>Next.js</li>
                <li>Angular</li>
                <li>Vue</li>
                <li>jQuery</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">6. Mobile Frontend Frameworks</h2>
              <ul className="list-disc pl-6">
                <li>React Native</li>
                <li>Flutter</li>
                <li>Ionic</li>
                <li>NativeScript</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">7. Version Control System</h2>
              <ul className="list-disc pl-6">
                <li>Git</li>
                <li>GitHub</li>
                <li>GitLab</li>
                <li>BitBucket</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendRoadmap;
