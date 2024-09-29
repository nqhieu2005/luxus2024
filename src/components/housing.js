// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Cập nhật để sử dụng useNavigate
import '../css/housing.css';
import Navbar from './nav';
import Footer from './foot';

function Housing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khai báo navigate để điều hướng

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://angry-equinox-amusement.glitch.me/products');
        setProducts(response.data);
      } catch (error) {
        setError('Có lỗi xảy ra khi tải dự án. Vui lòng đổi mạng hoặc thử lại sau.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-message">Vui lòng chờ 1 chút, chúng tôi đang lấy dự án...</div>
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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div>
      <Navbar />
      <div className="product-list">
        {/* <h1 className="product-list-title">HOUSING</h1> */}
        <ul className="product-items">
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              onClick={() => handleProductClick(product.id)} 
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

const ProductItem = ({ product, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="product-item" onClick={onClick}> {/* Thêm sự kiện click */}
      <div className="product-content">
        <div className="product-gallery" onClick={toggleExpanded}>
          <img
            src={product.gallery[0]}
            alt={product.name}
            className="product-image main-image"
          />
          <div className="product-info-overlay">
            <div className="product-name">{product.name}</div>
            <div className="product-separator"></div>
            <div className="product-price">{`Ngân sách: ${product.budget}`}</div>
          </div>
        </div>
        {isExpanded && (
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            {product.gallery.length > 1 && (
              <div className="product-gallery">
                {product.gallery.slice(1).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Product ${idx}`}
                    className="product-image"
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

export default Housing;
