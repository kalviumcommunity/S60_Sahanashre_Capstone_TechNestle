import Navbar from "./Navbar";
import mission from "../assets/mission.png";
import join from "../assets/join.png";

function About() {
  return (
    <div>
      <Navbar />

      <p className="font-bold text-2xl text-center mt-28 mb-10">About TechNestle</p>
      <div>
        <p className="text-xl mt-5 m-20">
          Welcome to TechNestle, your go-to platform for mastering web development. Our mission is to empower developers at every stage, from those just starting out to seasoned pros eager to learn more.
        </p>
        <p className="text-xl mt-5 m-20">
          At TechNestle, we believe in the power of community and collaboration. Our platform is designed to bring together passionate developers who share a common goal: to innovate and improve the digital world.
        </p>
      </div>

      <p className="font-bold text-2xl ml-10">Our Mission🌟</p>

      <div className="m-14 flex justify-center items-center place-content-center gap-14">
        <img src={mission} alt="Mission Image" className="h-64 w-96 rounded-xl" />
        <p className="text-xl">
          At TechNestle, we aim to create an inclusive environment for learning and collaboration. Our mission is to cultivate a community where knowledge is shared, learning is continuous, and every developer can thrive in their professional journey.
        </p>
        <p className="text-xl">
          We are dedicated to offering a variety of resources, including tutorials, workshops, and mentorship opportunities that cater to developers of all skill levels. We envision a space where everyone can contribute and grow.
        </p>
      </div>

      <p className="font-bold text-2xl ml-10">Join Us Today!🚀</p>
      <div className="m-14 flex justify-center items-center place-content-center gap-14">
        <p className="text-xl">
          Whether your passion lies in frontend design, backend programming, or creating user-friendly experiences, TechNestle is here for you. Become part of our dynamic community and take your web development skills to new heights. Together, we can redefine the future of web technology!
        </p>
        <p className="text-xl">
          By joining TechNestle, you gain access to a wealth of knowledge, practical experience, and a network of like-minded individuals. Let's collaborate, share ideas, and create exceptional digital experiences together!
        </p>
        <img src={join} alt="Join Image" className="w-96 rounded-xl" />
      </div>
    </div>
  );
}

export default About;