import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-around bg-slate-900 text-white p-4">
        <div className="mt-4 md:mt-0 text-center md:text-right w-full md:w-auto">
        <p className='text-xl font-bold'>© 2024 TechNestle. All rights are reserved.</p>
      </div>
      <div className="flex flex-col items-center">
        <h5 className="font-semibold">Follow Us</h5>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/sahanashre-v-b13775297" target="_blank" className="hover:text-blue-500">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/Sahanashre-V" target="_blank" className="hover:text-gray-300">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
