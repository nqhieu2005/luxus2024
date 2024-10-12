import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import logo from '../images/z5725037049407_9a59401620e8db106e00537f646305d9.jpg';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái mở/đóng menu
  const [menuHeight, setMenuHeight] = useState('0vh'); // Chiều cao ban đầu của navbar-collapse

  // Hàm toggle chiều cao khi nhấn vào "Dự án"
  const handleProjectsClick = () => {
    // Toggle chiều cao giữa 20vh và 40vh
    if (menuHeight === '0vh' || menuHeight === '20vh') {
      setMenuHeight('40vh'); // Mở rộng menu
    } else {
      setMenuHeight('20vh'); // Thu nhỏ menu lại
    }
  };

  
  const handleToggleMenu = () => {
    setIsExpanded(prevState => {
      if (!prevState) {
        
        setMenuHeight('20vh');
      } else {
        
        setMenuHeight('40vh');
      }
      return !prevState; // Toggle trạng thái
    });
  };

  // Hàm đóng menu khi nhấn vào nút "X"
  const handleClose = () => {
    setIsExpanded(false);  // Đóng menu
    setMenuHeight('0vh');  // Trở về chiều cao 0vh khi đóng
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Brand Logo"
            style={{ width: '140px', height: '50px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleMenu} // Toggle menu khi nhấn vào button
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} // Đảm bảo menu toggle mượt mà
          id="navbarSupportedContent"
          style={{
            height: menuHeight, // Thay đổi chiều cao của menu khi mở rộng
            transition: 'height 0.3s ease', // Mượt mà khi thay đổi chiều cao
          }}
        >
          <button className="close-btn" onClick={handleClose}>
            &times; {/* Ký tự "X" */}
          </button>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/about">Giới thiệu / About</a>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded={isExpanded ? "true" : "false"}
                // onClick={handleProjectsClick} // Gọi hàm khi nhấn vào "Dự án"
              >
                Dự án / Projects
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/housing">Nhà ở / Housing</a></li>
                <li><a className="dropdown-item" href="/commercial">Thương mại / Commercial</a></li>
                <li><a className="dropdown-item" href="/office">Văn phòng / Office</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Liên hệ / Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
