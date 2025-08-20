
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Feature from "./pages/Feature";
import Contact from "./pages/Contact";
import CardDetail from "./routhes/CardDetail";

const App = () => {
  const [cardItem, setCardItem] = useState([]);

  return (
    <BrowserRouter>
    <div className="giv_for_web fixed z-50 bottom-5 right-0">
      <img className="w-[13vw] max-w-[150px] bottom-0 right-0 relative z-20 rounded-full" src="https://i.pinimg.com/originals/0b/f2/ba/0bf2baebc370e83b26b1e5ef6a558f07.gif" alt="" />
    </div>
      <Header cardItem={cardItem} setCardItem={setCardItem} />
      <Routes>
        <Route path="/" element={<Home cardItem={cardItem} setCardItem={setCardItem} />} />
        <Route path="/shop" element={<Shop cardItem={cardItem} setCardItem={setCardItem} />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<CardDetail cardItem={cardItem} setCardItem={setCardItem} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
