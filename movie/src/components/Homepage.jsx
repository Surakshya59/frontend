import React from 'react';
import backgroundImage from "../images/bgmain.jpg";
import Sidebar from './Sidebar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider component if it's imported from somewhere

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    nextArrow: <div className="text-black">Next</div>,
    prevArrow: <div className="text-black">Prev</div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }; // Define your settings object here

  return (
    <div style={backgroundStyle} className="min-h-screen flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="fixed top-0 left-60 text-white w-full flex flex-col items-center">
          <div className="mywidth mb-10 w-full max-w-7xl p-4">
            <h2 className="text-3xl mb-4 font-bold text-yellow-300">Recommended for you</h2>
            <Slider {...settings}>
            <div className="p-2">
              <div className="w-48 h-50 bg-green-400 overflow-hidden">
                
              </div>
        
          </div>
          </Slider>
          </div>
          <div className="mb-10 w-full max-w-7xl p-4">
            <h2 className="text-3xl mb-4 font-bold text-yellow-300">Popular</h2>
            <Slider {...settings}>
            <div className="p-2">
              <div className="w-48 h-50 bg-green-400 overflow-hidden">
                
              </div>
            
          </div>
          </Slider>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;

