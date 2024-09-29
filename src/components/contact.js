import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contact.css';
import Navbar from './nav';
import Footer from './foot';
import images1 from '../images/d2d4d2d1-4b54-4e55-b80d-7ab5bed34446.jfif';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineWechat } from 'react-icons/ai';

const CompanyInfo = () => {
    return (
        <div>
            <Navbar />
            <main>
                <div className="company-info">
                    <img src={images1} alt="Company" />
                    <div className="company-details">
                        <h2>LUXUS INTERIOR</h2>
                        <p>Chi nhánh Hà Nội: 45 - Võ Chí Công - Nghĩa Đô - Quận Cầu Giấy - Hà Nội.</p>
                        <p>Hotline: <span>0376787191</span></p>
                        <p>Chi nhánh Ninh Bình: 05 - Ngõ 8 - Lý Thường Kiệt - Tam Điệp - Ninh Bình</p>
                        <p>Hotline: <span>0973921418</span></p>
                        <p>Xưởng sản xuất: Phượng Cách - Quốc Oai - Hà Nội.</p>
                        <p>Email: <span>info.luxus2024@gmail.com</span></p>
                    </div>
                </div>

                {/* Contact buttons */}
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
            </main>
            <Footer />
        </div>
    );
};

export default CompanyInfo;
