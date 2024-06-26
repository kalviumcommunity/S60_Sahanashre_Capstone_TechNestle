import Navbar from "./Navbar";

const BackendRoadmap = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto mt-28 px-4 mb-10">
        <div className="max-w-3xl mx-auto bg-blue-200 rounded-lg shadow-md px-8 py-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Backend Developer Roadmap</h1>
          <div className="space-y-8 text-center">
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">1. Node.js</h2>
              <ul className="list-disc pl-6">
                <li>Introduction to Node.js</li>
                <li>Event Loop</li>
                <li>Asynchronous Programming</li>
                <li>Modules and NPM</li>
                <li>File System</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">2. Express.js</h2>
              <ul className="list-disc pl-6">
                <li>Introduction to Express</li>
                <li>Routing</li>
                <li>Middleware</li>
                <li>Templating Engines</li>
                <li>RESTful API Design</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">3. Database Management</h2>
              <ul className="list-disc pl-6">
                <li>SQL Databases (PostgreSQL, MySQL)</li>
                <li>NoSQL Databases (MongoDB)</li>
                <li>ORM/ODM (Sequelize, Mongoose)</li>
                <li>Database Design and Normalization</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">4. Authentication and Authorization</h2>
              <ul className="list-disc pl-6">
                <li>JWT (JSON Web Tokens)</li>
                <li>OAuth</li>
                <li>Passport.js</li>
                <li>Session Management</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">5. Deployment and DevOps</h2>
              <ul className="list-disc pl-6">
                <li>Version Control (Git)</li>
                <li>CI/CD Pipelines</li>
                <li>Cloud Providers (AWS, Heroku)</li>
                <li>Containerization (Docker)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">6. Testing</h2>
              <ul className="list-disc pl-6">
                <li>Unit Testing</li>
                <li>Integration Testing</li>
                <li>End-to-End Testing</li>
                <li>Testing Libraries (Jest, Mocha)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendRoadmap;
