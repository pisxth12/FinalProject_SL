import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <h1 className="title_style text-3xl font-bold mb-8 text-center">Contact Us <div className="wrap_border"><div className="border1"></div><div className="border2"></div></div></h1>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 mt-10">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-600">
            We'd love to hear from you! Reach out for questions, feedback, or support.
          </p>

          <div className="flex flex-col gap-4 text-gray-700">
            <div>
              <span className="font-semibold">Address: </span>
              123 MyStore St, Phnom Penh, Cambodia
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              <a href="">sreyleak@gmail.com</a>
            </div>
            <div>
              <span className="font-semibold">Phone: </span>
              +855 96 889 441
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="bg-white p-6 rounded-xl shadow flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold">Send a Message</h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500 resize-none"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
