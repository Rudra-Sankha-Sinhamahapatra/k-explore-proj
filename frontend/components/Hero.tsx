import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      <section className="flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-5xl font-bold">
          Welcome to <span className="text-primary-300">Resourcify</span>
        </h1>
        <p className="text-xl max-w-2xl">
          Discover curated resources that will help you grow your skills. Explore tutorials, articles, and guides created to enhance your learning experience.
        </p>
        <Link to="/resources"> 
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
            Explore Resources
          </button>
        </Link>
      </section>
    </div>
  );
};
