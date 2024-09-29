import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/nav.css';
import logo from '../images/z5725037049407_9a59401620e8db106e00537f646305d9.jpg';

const Navbar = () => {
  // Hàm để đóng menu
  const handleClose = () => {
    const element = document.getElementById('navbarSupportedContent');
    if (element) {
      element.classList.remove('show'); // Xóa class 'show' để đóng menu
    }
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
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <button className="close-btn" onClick={handleClose}>
            &times; {/* Ký tự "X" */}
          </button>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/about">Giới thiệu / About</a>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
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
