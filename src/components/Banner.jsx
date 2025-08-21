import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const slides = [
    {
      id: 1,
      img: "https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/online-websites-cover.jpg",
      text: (
        <div className="text-center md:text-left space-y-2 px-4 ">
          <h5 className="Banner_titel text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            New Arrivals
          </h5>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, voluptatibus.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="btn_banner btn_banner1 mt-2 inline-block px-4 py-2  text-white rounded-lg transition z-50"
          >
            Shop Now
          </button>
        </div>
      ),
    },
    {
      id: 2,
      img: "https://www.chivalrymen.com/wp-content/uploads/2022/04/Well-Dressed-Man.jpg",
      text: (
        <div className="text-center md:text-left right-0 space-y-2 px-4">
          <h5 className="Banner_titel text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Summer Collection
          </h5>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, voluptatibus.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="btn_banner btn_banner2 mt-2 inline-block px-4 py-2  text-white rounded-lg transition"
          >
            Shop Now
          </button>
        </div>
      ),
    },
    {
      id: 3,
      img: "https://www.nordicmaid.com/wp-content/uploads/2021/05/jewelry....jpg",
      text: (
         <div className="text-center md:text-left space-y-2 px-4 ">
          <h5 className="Banner_titel text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            New Arrivals
          </h5>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, voluptatibus.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="btn_banner btn_banner3 mt-2 inline-block px-4 py-2  text-white rounded-lg transition"
          >
            Shop Now
          </button>
        </div>
      ),
    },
    {
      id: 4,
      img: "https://assets.entrepreneur.com/content/3x2/2000/1593437687-GettyImages-1187743109.jpg",
      text: (
         <div className="text-center md:text-left space-y-2 px-4 ">
          <h5 className="Banner_titel text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            New Arrivals
          </h5>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, voluptatibus.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="btn_banner btn_banner4 mt-2 inline-block px-4 py-2  text-white rounded-lg transition"
          >
            Shop Now
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="banner_content relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden max-h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.img}
            alt={`slide-${slide.id}`}
            className={`w-full h-full object-cover transition-transform duration-500 transform ${
              index === current ? "scale-110" : "scale-100"
            } rounded-xl`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <div className="pointer-events-auto">{slide.text}</div>
          </div>
        </div>
      ))}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Banner;
