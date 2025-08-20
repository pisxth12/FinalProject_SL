import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Shop = ({ cardItem, setCardItem }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Filter by search term AND category
        let filteredData = data;
        if (searchTerm) {
          filteredData = filteredData.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (selectedCategory !== "all") {
          const categoryMap = {
            Men: "men's clothing",
            Women: "women's clothing",
            Jewelery: "jewelery",
            Electronic: "electronics",
          };
          filteredData = filteredData.filter(
            (p) => p.category === categoryMap[selectedCategory]
          );
        }

        setFiltered(filteredData);
      })
      .catch((err) => console.error(err));
  }, [searchTerm, selectedCategory]);

  const addToCart = (product) => {
    const existing = (cardItem || []).find((item) => item.id === product.id);
    if (existing) {
      setCardItem(
        (cardItem || []).map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCardItem([...(cardItem || []), { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="title_style text-3xl font-bold mb-6 text-center">
        Shop Products
        <div className="wrap_border">
          <div className="border1"></div>
          <div className="border2"></div>
        </div>
      </h1>

      {/* Category Buttons */}
      <div className="type_product flex mx-auto justify-center w-full  flex-wrap gap-3 mb-6">
        {["all", "Men", "Women", "Jewelery", "Electronic"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-32 object-contain"
                />
              </div>
              <h2 className="mt-3 text-lg font-semibold line-clamp-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2 flex-1">
                {product.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-bold text-amber-600">
                  ${product.price}
                </span>
                <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </Link>
            <button
              className="mt-2 btn_add_to_card text-white p-2 rounded hover:scale-95 transition-all hover:bg-blue-700 active:bg-green-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
