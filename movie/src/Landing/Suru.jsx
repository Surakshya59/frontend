import { Link } from "react-router-dom";
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from "../components/Sidebar";
const LandingPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: '0px',
    minHeight: '100vh',
  };

  return (
    <>
      <div style={backgroundStyle} className="min-h-screen flex overflow-hidden">
        <Sidebar/>
        <main className="ml-60 flex-grow flex flex-col justify-between p-10">
          <section className="mb-10 flex-grow">
            <div className="bg-black bg-opacity-50 p-6 rounded-lg h-full">
              <h2 className="text-3xl mb-4 text-white"><br/>

                Movies &<br /> TV recommendations <br />based on your taste<br/>
              </h2>
              <p className="text-lg text-white"><br/>
                Find your next favorite show and stream for free
              </p>
            </div>
          </section>
          <section className="bg-gray-900 bg-opacity-60 p-20 rounded-lg">
            <h3 className="text-yellow-600 text-2xl">Your personal streaming guide</h3>
          </section>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
