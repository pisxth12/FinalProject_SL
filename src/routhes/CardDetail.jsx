// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const CardDetail = () => {
//   const { id } = useParams(); // get product id from URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`https://fakestoreapi.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="text-center mt-6">Loading...</p>;
//   if (!product) return <p className="text-center mt-6">Product not found.</p>;

//   return (
//     <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
//       <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6">
//         <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-4">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="object-contain h-80"
//           />
//         </div>

//         <div className="flex-1 flex flex-col">
//           <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <span className="text-2xl font-bold text-amber-600 mb-2">
//             ${product.price}
//           </span>
//           <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded mb-4">
//             {product.category}
//           </span>
//           <button className="bg-blue-500 text-white p-2 rounded w-full md:w-auto">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardDetail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardDetail = ({ cardItem, setCardItem }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
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

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!product) return <p className="text-center mt-6">Product not found.</p>;

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg p-4">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-80"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <span className="text-2xl font-bold text-amber-600 mb-2">
            ${product.price}
          </span>
          <span className="text-sm bg-slate-200 w-fit font-bold text-amber-700 px-2 py-1 rounded mb-4">
            {product.category}
          </span>
          <button
            className="bg-blue-500 text-white p-2 rounded w-full md:w-auto"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
