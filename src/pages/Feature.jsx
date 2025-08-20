import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Get your products delivered quickly and safely.",
    icon: <i class="fa-solid fa-car"></i>,
  },
  {
    id: 2,
    title: "Premium Quality",
    description: "Only top-quality products handpicked for you.",
    icon: <i class="fa-solid fa-gem"></i>,
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our support team is always ready to help you.",
    icon:<i class="fa-solid fa-phone-volume"></i>,
  },
  {
    id: 4,
    title: "Secure Payment",
    description: "All transactions are safe and encrypted.",
    icon: <i class="fa-solid fa-lock"></i>,
  },
];

const Feature = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 mt-20">
      <h1 className="title_style text-3xl font-bold text-center mb-15">Our Features  <div className="wrap_border"><div className="border1"></div><div className="border2"></div></div></h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
            <Link
              to="/shop"
              className=" mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
