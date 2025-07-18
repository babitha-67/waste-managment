// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const images = [
  { src: "landing1.jpg", alt: "Recycling bins" },
  { src: "landing2.jpg", alt: "Smart waste management" },
  { src: "landing3.jpg", alt: "Clean city" },
  { src: "landing4.jpg", alt: "Community engagement" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-2 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2 justify-start">
            <img
              src="logo.jpeg"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-2xl font-bold">{t("title")}</span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="focus:outline-none text-white text-3xl"
            >
              ☰
            </button>
          </div>

          {/* Navigation + Language (Mobile toggle + Desktop always visible) */}
          <div
            className={`w-full md:w-auto md:flex items-center gap-4 mt-4 md:mt-0 ${
              showMenu ? "block" : "hidden"
            } md:block`}
          >
            <nav className="flex flex-col md:flex-row gap-2 md:gap-4 text-white">
              <Link to="/" className="hover:underline">
                {t("nav.home")}
              </Link>
              <Link to="/login" className="hover:underline">
                {t("nav.admin")}
              </Link>
              <Link to="/login" className="hover:underline">
                {t("nav.user")}
              </Link>
              <Link to="/login" className="hover:underline">
                {t("nav.driver")}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <main className="flex-grow px-4 py-10 md:py-20">
        <div className="max-w-6xl mx-auto px-2 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            {t("home.heading")}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{t("home.description")}</p>

          {/* Image Slider */}
          <div className="relative w-full max-w-3xl mx-auto">
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="rounded-lg shadow-md w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-3 py-1 rounded-full shadow"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-3 py-1 rounded-full shadow"
            >
              ❯
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-6 text-center">
        <p className="font-semibold">📍 {t("footer.office")}</p>
        <p>{t("footer.address")}</p>
        <p>📞 {t("footer.contact")}</p>
      </footer>
    </div>
  );
}
