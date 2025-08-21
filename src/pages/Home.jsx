
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner"
import Shop from "../pages/Shop"
import Feature from "./Feature";
import Contact from "./Contact";

const Home = ({ cardItem, setCardItem }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    const existing = (cardItem || []).find((item) => item.id === product.id);
    if (existing) {
      setCardItem(
        (cardItem || []).map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCardItem([...(cardItem || []), { ...product, quantity: 1 }]);
    }
  };

  return (
    
    <div className="min-h-screen bg-slate-50 p-6">
      <Banner/>
      <h1 className="title_style text-3xl font-bold mb-6 text-center">Featured Products  <div className="wrap_border"><div className="border1"></div><div className="border2"></div></div></h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col  sm:max-w-none max-w-[250px] mx-auto">
            <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={product.image} alt={product.title} className="h-32 object-contain" />
              </div>
              <h2 className="mt-3 text-lg font-semibold line-clamp-1">{product.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2 flex-1">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-bold text-amber-600">${product.price}</span>
                <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded">{product.category}</span>
              </div>
            </Link>
            <button
              className="btn_add_to_card mt-2 bg-blue-500 text-white p-2 rounded hover:scale-95 transition-all hover:bg-blue-700 active:bg-green-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Feature/>
      <Contact/>
    </div>
  );
};

export default Home;
