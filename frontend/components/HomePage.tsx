import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-800 text-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Footer/> 
    </div>
  );
};

export default HomePage;
