
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from './nav';
import Footer from './foot';

import "../css/commercial.css";

function CommercialList() {
  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khai báo navigate để điều hướng

  useEffect(() => {
    const fetchCommercials = async () => {
      try {
        const response = await axios.get('https://angry-equinox-amusement.glitch.me/commercials');
        setCommercials(response.data);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dữ liệu thương mại. Vui lòng đổi mạng hoặc thử lại sau.');
        console.error('Error fetching commercials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommercials();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-message">Vui lòng chờ 1 chút, chúng tôi đang lấy dữ liệu thương mại...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="error-message">{error}</div>
        <Footer />
      </div>
    );
  }

  const handleCommercialClick = (commercialId) => {
    navigate(`/commercial/${commercialId}`); // Điều hướng đến trang chi tiết thương mại
  };

  return (
    <div>
      <Navbar />
      <div className="commercial-list">
        <ul className="commercial-items">
          {commercials.map((commercial, index) => (
            <CommercialItem
              key={index}
              commercial={commercial}
              onClick={() => handleCommercialClick(commercial.id)} // Truyền ID thương mại cho hàm xử lý click
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

const CommercialItem = ({ commercial, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="commercial-item" onClick={onClick}>
      <div className="commercial-content">
        <div className="commercial-gallery" onClick={toggleExpanded}>
          <img
            src={commercial.gallery[0]}
            alt={commercial.name}
            className="commercial-image main-image"
          />
          <div className="commercial-info-overlay">
            <div className="commercial-name">{commercial.name}</div>
            <div className="commercial-separator"></div>
            <div className="commercial-price">{`Ngân sách: ${commercial.budget}`}</div>
          </div>
        </div>
        {isExpanded && (
          <div className="commercial-details">
            <h2 className="commercial-name">{commercial.name}</h2>
            <p className="commercial-description">{commercial.description}</p>
            {commercial.gallery.length > 1 && (
              <div className="commercial-gallery">
                {commercial.gallery.slice(1).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Commercial ${idx}`}
                    className="commercial-image"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default CommercialList;
