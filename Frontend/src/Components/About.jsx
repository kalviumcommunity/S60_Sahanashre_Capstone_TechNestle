import Navbar from "./Navbar";
import mission from "../assets/mission.png";
import join from "../assets/join.png";

function About() {
  return (
    <div>
      <Navbar />

      <p className="font-bold text-2xl text-center mt-20 mb-10">About TechNestle</p>
      <div>
        <p className="text-xl mt-5 m-20">
          Welcome to TechNestle, the ultimate destination for individuals
          passionate about mastering web development skills and shaping the
          digital landscape of tomorrow. At TechNestle, we believe in empowering
          developers of all levels, from beginners taking their first steps into
          the world of coding to seasoned professionals looking to expand their
          skill sets.
        </p>
      </div>

      <p className="font-bold text-2xl ml-10">Our Mission🌟</p>

      <div className="m-14 flex justify-center items-center place-content-center gap-14">
        <img src={mission} alt="Mission Image" className="h-64 w-96" />
        <p className="text-xl">
          TechNestle is dedicated to providing a comprehensive platform where
          developers can learn, teach, and collaborate effectively. Our mission
          is to foster a vibrant community that promotes continuous learning,
          knowledge sharing, and professional growth in the field of web
          development.
        </p>
      </div>

      <p className="font-bold text-2xl ml-10">Join Us Today!🚀</p>
      <div className="m-14 flex justify-center items-center place-content-center gap-14">
        <img src={join} alt="Join Image" className="w-96" />
        <p className="text-xl">
          Whether you are passionate about crafting visually stunning frontend
          interfaces, mastering the intricacies of backend development, or
          designing seamless user experiences, TechNestle has something for you.
          Join our vibrant community today and embark on your journey to
          becoming a proficient web developer. Together, let us shape the future
          of the web!
        </p>
      </div>
    </div>
  );
}

export default About;
