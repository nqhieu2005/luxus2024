import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import logo from '../images/z5725037049407_9a59401620e8db106e00537f646305d9.jpg';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái mở/đóng menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái mở/đóng dropdown

  const handleToggleMenu = () => {
    setIsExpanded(prevState => !prevState); // Toggle trạng thái menu
  };

  const handleProjectsClick = () => {
    setIsDropdownOpen(prevState => !prevState); // Toggle trạng thái dropdown Dự án
  };

  const handleClose = () => {
    setIsExpanded(false);  // Đóng menu
    setIsDropdownOpen(false); // Đóng dropdown Dự án
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Brand Logo"
            style={{ width: '150px', height: '40px' }}
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
            <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                onClick={handleProjectsClick} // Gọi hàm khi nhấn vào "Dự án"
              >
                Dự án / Projects
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
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
