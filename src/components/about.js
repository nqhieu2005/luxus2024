// About.js

import React, { useEffect } from 'react';
import '../css/about.css';
import Navbar from './nav';
import images1 from '../images/8.jpg';
import images2 from '../images/19.jpg';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineWechat } from 'react-icons/ai';

const About = () => {

    useEffect(() => {
        const loadHTML = (file, elementId) => {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    document.getElementById(elementId).innerHTML = data;
                });
        };

        loadHTML("nav.html", "nav-placeholder");
        loadHTML("footer.html", "footer-placeholder");
    }, []);

    return (
        <>
            <Navbar />
            <div id="nav-placeholder"></div>
            <main>
                <div className="main-about">
                    <p>LUXUS - KIẾN TẠO KHÔNG GIAN VƯỢT TRỘI</p>
                    <p>
                        Chào mừng bạn đến với trang web của LUXUS – nơi bạn sẽ khám phá vẻ đẹp và ý nghĩa của kiến trúc. Hơn thế nữa, đây cũng chính là điểm bắt đầu trong cuộc thám hiểm tâm hồn và ý tưởng của bạn. <span className="translated" style={{ color: 'rgb(153, 147, 140)' }}>/ Welcome to LUXUS website – where you’ll explore the beauty and meaning of architecture. Moreover, this is your starting point for a journey into your soul and ideas.</span>
                    </p>
                    <p>
                        LUXUS –  đặt trụ sở tại Hà Nội đã thực hiện nhiều dự án kiến trúc và nội thất cho các khách hàng Việt Nam và Đông Nam Á. LUXUS lấy tiêu chí về chất lượng cuộc sống con người, tinh thần, thẩm mĩ và công năng. Chúng tôi mong muốn mang lại cho khách hàng những trải nghiệm mới về “ Không Gian Sống”, từ việc chỉnh chu về công năng, tối ưu về tiện ích và đa dạng về thẩm mỹ. Nhằm nâng cao chất lượng cuộc sống của con người hiện đại ngày nay.
                        Tuy nhiên để làm được điều này chúng tôi đã phải trải qua các bước chọn lọc về đội ngũ Kiến trúc Sư thiết kế tài năng nhất, nâng cấp nhà máy với những công nghệ hiện đại hàng đầu hiện nay.   <span className="translated" style={{ color: 'rgb(153, 147, 140)' }}>/ LUXUS –  based in Hanoi, has executed numerous architectural and interior design projects for clients in Vietnam and Southeast Asia. LUXUS takes the criteria of human life quality, spirit, aesthetics and functionality. We want to bring customers new experiences of "Living Space", from the perfection of function, optimization of utilities and diversity of aesthetics. In order to improve the quality of life of modern people today. However, to do this, we had to go through the steps of selecting the most talented team of Architects, upgrading the factory with the most modern technology today.</span>
                    </p>
                    <img src={images1} alt='' />
                    <p>
                        LUXUS cam kết cung cấp dịch vụ chất lượng cao nhất, tiếp nhận và phản hồi yêu cầu của khách hàng một cách tích cực,
                        nỗ lực để đảm bảo quá trình làm việc trở nên hiệu quả nhất có thể. Là một công ty hoạt động chuyên nghiệp trong lĩnh vực tư vấn và thi công,
                        chúng tôi nhanh chóng và quyết liệt đáp ứng yêu cầu của khách hàng, linh hoạt điều chỉnh quy trình làm việc để phù hợp với từng khách hàng và từng dự án.
                        <span className="translated" style={{ color: 'rgb(153, 147, 140)' }}>/ LUXUS is committed to delivering the highest level of service,
                            actively embracing and responding to client requests, and striving to ensure the most efficient work processes possible. As a professionally-driven
                            consultancy and construction company, we promptly and resolutely meet our clients’ demands, flexibly adjusting our workflows to suit each client and project.</span>
                    </p>
                    <img src={images2} alt='' />
                    <p>
                        Tính chi tiết của mỗi thành phần thiết kế là nguyên tắc cốt lõi trong phương pháp làm việc của chúng tôi. Bằng cách đánh giá cẩn thận từng vị trí, từng yếu tố, chúng tôi tạo ra các công trình vốn đã phù hợp với vị trí của chúng, thích hợp với môi trường và phản ánh bản sắc cũng như ngữ cảnh lịch sử độc đáo. Hơn hết, tinh thần và tính cách của chủ đầu tư cũng được ưu tiên rất cao trong các thiết kế của LUXUS.
                        <span className="translated" style={{ color: 'rgb(153, 147, 140)' }}>/ Meticulous attention to detail in every design component is a fundamental principle of our working method. By carefully evaluating each site and each element, we create structures inherently harmonious with their surroundings, environmentally suitable, and reflective of the unique historical context. Above all, the spirit and preferences of the client are of paramount importance in KPA Vietnam’s designs.</span>
                    </p>
                </div>
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
            <div id="footer-placeholder"></div>
            <div className="about">
            <p>
                <a href="https://www.facebook.com/Interior.luxus" target="_blank" rel="noopener noreferrer">Facebook</a>
              
            </p>
            <p>&copy; LUXUS 2024</p>
        </div>
        </>
    );
}

export default About;
