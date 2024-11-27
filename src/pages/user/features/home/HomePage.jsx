import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

function HomePage() {
  const images = [
    "https://placehold.co/1920x600?text=Image+1",
    "https://placehold.co/1920x600?text=Image+2",
    "https://placehold.co/1920x600?text=Image+3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      <nav className="bg-white shadow"></nav>
      <main>
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            {/* Nút chuyển sang hình trước */}
            <button
              onClick={handlePrev}
              className="bg-gray-500/20 text-white px-4 py-2 rounded hover:bg-opacity-75"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Nút chuyển sang hình sau */}
            <button
              onClick={handleNext}
              className="bg-gray-500/20 text-white px-4 py-2 rounded hover:bg-opacity-75"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
              The best performing products in the world
            </h1>
          </div> */}
        </div>
        <div className="bg-white text-center text-9xl font-bold h-screen">
          CONTENT
        </div>
      </main>
    </div>
  );
}

export default HomePage;
