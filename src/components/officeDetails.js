import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/housing.css';
import Navbar from './nav';
import Footer from './foot';
import "../css/housingDetails.css";

function OfficeDetail() {
  const { id } = useParams();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // Quản lý ảnh được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái của modal


  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const response = await axios.get('https://angry-equinox-amusement.glitch.me/offices');
        const office = response.data.find(o => o.id === id);
        console.log('Fetched office:', office); // Kiểm tra dữ liệu office
        setOffice(office);
      } catch (error) {
        console.error('Error fetching office details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffice();
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

  if (!office) {
    return <div>Có lỗi xảy ra khi lấy thông tin văn phòng. Vui lòng đổi mạng hoặc thử lại sau.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='housing-details'>
        <div className="office-detail">

          {/* Section 1: Office Name */}
          <div className="section section-name">
            <h1>{office.name}</h1>
          </div>

          {/* Section 2: Description and Main Image */}
          <div className="section section-info">
            <div className="section-description">
              <div className="details-container">
                <div className="details-item">
                  <p><strong>Ngân sách nội thất:</strong> {office.budget}</p>
                </div>
                <div className="details-item">
                  <p><strong>Địa điểm:</strong> {office.location}</p>
                </div>
                {/* <div className="details-item">
                  <p><strong>Diện tích mặt sàn:</strong> {office.floorArea}</p>
                </div> */}
                <div className="details-item">
                  <p><strong>Công năng:</strong> {office.functionality}</p>
                </div>
                <div className="description-divider">
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                </div>
                <div className="details-item">
                  <p><strong></strong> {office.description}</p>
                </div>
              </div>
            </div>
            <div className="section-main-image">
              <img src={office.gallery[0]} alt={office.name} onClick={() => openModal(office.gallery[0])} />
            </div>
          </div>

          {/* Section 3: Full Width Image */}
          <div className="section section-full-image">
            <img src={office.gallery[1]} alt="Full Width " onClick={() => openModal(office.gallery[1])}/>
          </div>

          {/* Section 4: Additional Images */}
          <div className="section section-additional">
            {office.gallery.slice(2).map((image, index) => (
              <img key={index} src={image} alt={`Additional  ${index + 1}`} onClick={() => openModal(image)} />
            ))}
          </div>

        </div>
        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <span className="close">&times;</span>
            <img className="modal-content" src={selectedImage} alt="Selected" />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default OfficeDetail;
