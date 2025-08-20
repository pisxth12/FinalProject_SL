import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUser, FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg' 

const Header = ({ cardItem, setCardItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Pay modal
  const [userModalOpen, setUserModalOpen] = useState(false); // User login/register modal
  const [searchTerm, setSearchTerm] = useState("");

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || null
  );

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Feature", path: "/feature" },
    { name: "Contact", path: "/contact" },
  ];

  const removeItem = (id) => {
    setCardItem((cardItem || []).filter((item) => item.id !== id));
  };

  const clearAll = () => setCardItem([]);

  const totalItems = (cardItem || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = (cardItem || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // User auth functions
  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      alert("Email already exists!");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully! You can now login.");
    setIsRegister(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid credentials!");
      return;
    }
    localStorage.setItem("loggedInUser", email);
    setLoggedInUser(email);
    setUserModalOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="bg-white text-slate-900 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold cursor-pointer">
          <img
            className="w-[150px] hover:animate-pulse"
            src={logo}
            alt="img"
          />
        </h1>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? " font-bold bg-slate-200 px-2 rounded-xl "
                  : "hover:border-b-2 hover:border-black transition-all"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-8 relative">
          {/* Desktop Search */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className={`transition-all duration-300 w-0 ${
                searchOpen ? "w-64 opacity-100" : "opacity-0"
              } p-2 rounded-full text-black border-2 focus:outline-none`}
            />
            <FaSearch
              className="cursor-pointer text-black ml-2 text-xl"
              onClick={() => setSearchOpen(!searchOpen)}
            />
          </div>

          {/* User */}
          <div className="relative">
            <FaUser
              className="cursor-pointer text-black text-xl"
              onClick={() => setUserModalOpen(true)}
            />
          </div>

          {/* Heart / Cart */}
          <div className="relative">
            <FaHeart
              className="cursor-pointer text-black z-30 text-xl"
              onClick={() => setCartOpen(!cartOpen)}
            />
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-sm rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            {/* Cart panel */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-white border-l shadow-lg p-4 z-50 transform transition-transform duration-300 ${
                cartOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Your Cart</h3>
                <button
                  className="text-black font-bold w-8 h-8 flex justify-center items-center hover:bg-slate-300 active:bg-red-300 hover:rounded-full "
                  onClick={() => setCartOpen(false)}
                >
                  X
                </button>
              </div>
              {(cardItem || []).length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {(cardItem || []).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p>
                            ${item.price} x {item.quantity}
                          </p>
                        </div>
                        <button
                          className="text-red-500 font-bold"
                          onClick={() => removeItem(item.id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={clearAll}
                    >
                      Clear All
                    </button>
                    <button
                      className="bg-green-500 text-white px-6 py-1 rounded"
                      onClick={() => setModalOpen(true)}
                    >
                      Pay
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white flex flex-col gap-4 p-4 shadow">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full p-2 rounded-full text-black focus:outline-none"
            />
            <FaSearch className="text-black" />
          </div>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="hover:bg-gray-200 p-2 rounded transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      )}

      {/* Pay Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative w-80">
            <button
              className="absolute top-2 right-2 text-black text-lg font-bold"
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Pay QR Code</h2>
            <img
              src="/src/assets/Qr.jpg"
              alt="QR Code"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* User Login/Register Modal */}
      {userModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative w-80">
            <button
              className="absolute top-2 right-2 text-black text-lg font-bold"
              onClick={() => setUserModalOpen(false)}
            >
              <i class="fa-solid fa-xmark hover:bg-red-400 w-[30px] h-[30px] flex justify-center items-center active:text-white"></i>
            </button>
            {loggedInUser ? (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">Hello, {loggedInUser}</h2>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">
                  {isRegister ? "Register" : "Login"}
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-2 p-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-2 p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full mb-2 p-2 border rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2"
                  onClick={isRegister ? handleRegister : handleLogin}
                >
                  {isRegister ? "Register" : "Login"}
                </button>
                <p className="text-center text-sm">
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsRegister(!isRegister)}
                  >
                    {isRegister ? "Login" : "Register"}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
