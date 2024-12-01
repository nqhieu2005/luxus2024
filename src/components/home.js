import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import Navbar from './nav';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineWechat } from 'react-icons/ai';

const LuxusInterior = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    let intervalId; // Đặt intervalId ở đây

    function showNextImage() {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }

    if (images.length > 0) {
      intervalId = setInterval(showNextImage, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [images]); // Chỉ cần theo dõi 'images'

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
            <button className="swiper-button-next swiper-button-white" onClick={handleNext}>
  &gt; {/* Mũi tên phải */}
</button>
<button className="swiper-button-prev swiper-button-white" onClick={handlePrev}>
  &lt; {/* Mũi tên trái */}
</button>

          </>
        ) : (
          <div className="no-images">No images available</div>
        )}
      </main>

      <div className="contact-buttons">
                    <a
                        href="https://web.facebook.com/Interior.luxus"
                        className="contact-button facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat Facebook"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://zalo.me/0376787191"
                        className="contact-button zalo"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat Zalo"
                    >
                        <AiOutlineWechat />
                    </a>
                    <a
                        href="tel:+0376787191"
                        className="contact-button phone"
                        title="Gọi ngay"
                    >
                        <FaPhoneAlt />
                    </a>
                </div>

                <div className="about">
            <p>
                <a href="https://www.facebook.com/Interior.luxus" target="_blank" rel="noopener noreferrer">Facebook</a>
              
            </p>
            <p>&copy; LUXUS 2024</p>
        </div>
    </div>
  );
};

export default LuxusInterior;
