import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import Navbar from './nav';
import Footer from './foot';

const LuxusInterior = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let intervalId;

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('https://angry-equinox-amusement.glitch.me/homes');
        const data = await response.json();
        console.log('API data:', data);

        if (Array.isArray(data) && data.length > 0) {
          const allImages = data.flatMap(item => item.gallery);

          if (allImages.length > 0) {
            setImages(allImages);
            setLoading(false);
          } else {
            setError('No images found.');
            setLoading(false);
          }
        } else {
          setError('Invalid data structure.');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching images.');
        setLoading(false);
        console.error('Error fetching images:', err);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    function showNextImage() {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }

    if (images.length > 0) {
      intervalId = setInterval(showNextImage, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [images]);

  // Hàm để lùi lại ảnh
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  // Hàm để tiến tới ảnh tiếp theo
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      <Navbar />

      <main className="image-container position-relative">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : images.length > 0 ? (
          <>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={`slide ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
            {/* Nút mũi tên trái */}
            <button className=" muiten-trai position-absolute top-50 start-0 translate-middle-y" onClick={handlePrev}>
              &lt; {/* Mũi tên trái */}
            </button>
            {/* Nút mũi tên phải */}
            <button className=" muiten-phai position-absolute top-50 end-0 translate-middle-y" onClick={handleNext}>
              &gt; {/* Mũi tên phải */}
            </button>
          </>
        ) : (
          <div className="no-images">No images available</div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LuxusInterior;
