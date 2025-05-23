import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const plants = [
  { id: 1, name: "Fiddle Leaf Fig", category: "Large", price: 45, image: "fig.jpg" },
  { id: 2, name: "Snake Plant", category: "Easy Care", price: 25, image: "snake.jpg" },
  { id: 3, name: "Pothos", category: "Hanging", price: 15, image: "pothos.jpg" },
  { id: 4, name: "Peace Lily", category: "Flowering", price: 30, image: "peace.jpg" },
  { id: 5, name: "ZZ Plant", category: "Easy Care", price: 35, image: "zz.jpg" },
  { id: 6, name: "Spider Plant", category: "Hanging", price: 20, image: "spider.jpg" }
];

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) => {
      const newCount = (prev[id] || 0) + amount;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <Router>
      <Header totalItems={totalItems} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListing addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
      </Routes>
    </Router>
  );
}

const Header = ({ totalItems }) => (
  <header className="flex justify-between items-center p-4 shadow-md">
    <Link to="/" className="text-xl font-bold">Paradise Nursery</Link>
    <nav className="flex gap-4 items-center">
      <Link to="/products">Products</Link>
      <Link to="/cart" className="flex items-center gap-1">
        <ShoppingCart /> {totalItems}
      </Link>
    </nav>
  </header>
);

const LandingPage = () => (
  <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('nursery-bg.jpg')" }}>
    <div className="bg-white bg-opacity-80 p-10 m-10 rounded-xl">
      <h1 className="text-4xl font-bold mb-4">Paradise Nursery</h1>
      <p className="mb-6">Your one-stop shop for beautiful and healthy houseplants. Transform your home into a green paradise today!</p>
      <Link to="/products" className="bg-green-600 text-white px-4 py-2 rounded">Get Started</Link>
    </div>
  </div>
);

const ProductListing = ({ addToCart }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
    {plants.map((plant) => (
      <div key={plant.id} className="border p-4 rounded-lg shadow-md">
        <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover rounded" />
        <h2 className="text-lg font-bold mt-2">{plant.name}</h2>
        <p>${plant.price}</p>
        <button onClick={() => addToCart(plant.id)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Add to Cart</button>
      </div>
    ))}
  </div>
);

const Cart = ({ cart, updateQuantity }) => {
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const plant = plants.find(p => p.id === parseInt(id));
    return { ...plant, qty };
  });

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
          <div className="flex-1 ml-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>${item.price} x {item.qty} = ${item.price * item.qty}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-red-400 text-white rounded">-</button>
              <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-green-400 text-white rounded">+</button>
              <button onClick={() => updateQuantity(item.id, -item.qty)} className="ml-4 text-red-600">Delete</button>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6">
        <p className="text-xl font-bold">Total: ${totalCost}</p>
        <div className="mt-4 flex gap-4">
          <Link to="/products" className="bg-gray-400 text-white px-4 py-2 rounded">Continue Shopping</Link>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default App;
