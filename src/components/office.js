import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from './nav';
import Footer from './foot';
import "../css/office.css";


function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('https://angry-equinox-amusement.glitch.me/offices'); // Updated endpoint
        setOffices(response.data);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dữ liệu văn phòng. Vui lòng đổi mạng hoặc thử lại sau.');
        console.error('Error fetching offices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-message">Vui lòng chờ 1 chút, chúng tôi đang lấy dữ liệu văn phòng...</div>
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

  const handleOfficeClick = (officeId) => {
    navigate(`/office/${officeId}`); // Navigate to office detail page
  };

  return (
    <div>
      <Navbar />
      <div className="office-list">
        <ul className="office-items">
          {offices.map((office, index) => (
            <OfficeItem
              key={index}
              office={office}
              onClick={() => handleOfficeClick(office.id)} // Handle click event
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

const OfficeItem = ({ office, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="office-item" onClick={onClick}>
      <div className="office-content">
        <div className="office-gallery" onClick={toggleExpanded}>
          <img
            src={office.gallery[0]}
            alt={office.name}
            className="office-image main-image"
          />
          <div className="office-info-overlay">
            <div className="office-name">{office.name}</div>
            <div className="office-separator"></div>
            <div className="office-price">{`Ngân sách: ${office.budget}`}</div>
          </div>
        </div>
        {isExpanded && (
          <div className="office-details">
            <h2 className="office-name">{office.name}</h2>
            <p className="office-description">{office.description}</p>
            {office.gallery.length > 1 && (
              <div className="office-gallery">
                {office.gallery.slice(1).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Office ${idx}`}
                    className="office-image"
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

export default OfficeList;
