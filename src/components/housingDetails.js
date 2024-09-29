import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/housing.css';
import Navbar from './nav';
import Footer from './foot';
import "../css/housingDetails.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://angry-equinox-amusement.glitch.me/products');
        const product = response.data.find(p => p.id === id);
        console.log('Fetched product:', product); // Kiểm tra dữ liệu product
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-message">Vui lòng chờ 1 chút, chúng tôi đang lấy thông tin chi tiết...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return <div>Có lỗi xảy ra khi lấy dự án. Vui lòng đổi mạng hoặc thử lại sau.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='housing-details'>
        <div className="product-detail">

          {/* Section 1: Product Name */}
          <div className="section section-name">
            <h1>{product.name}</h1>
          </div>

          {/* Section 2: Description and Main Image */}
          <div className="section section-info">
            <div className="section-description">
              <div className="details-container">
                <div className="details-item">
                  <p><strong>Ngân sách nội thất:</strong> {product.budget}</p>
                </div>
                <div className="details-item">
                  <p><strong>Địa điểm:</strong> {product.location}</p>
                </div>
                <div className="details-item">
                  <p><strong>Diện tích mặt sàn:</strong> {product.floorArea}</p>
                </div>
                <div className="details-item">
                  <p><strong>Công năng:</strong> {product.functionality}</p>
                </div>
                <div className="details-item">
                  <p><strong>Mô tả:</strong> {product.description}</p>
                </div>
              </div>
            </div>

            <div className="section-main-image">
              <img src={product.gallery[0]} alt={product.name} />
            </div>
          </div>

          {/* Section 3: Full Width Image */}
          <div className="section section-full-image">
            <img src={product.gallery[1]} alt="Full Width" />
          </div>

          {/* Section 4: Additional Images */}
          <div className="section section-additional">
            {product.gallery.slice(2).map((image, index) => (
              <img key={index} src={image} alt={`Additional  ${index + 1}`} />
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
