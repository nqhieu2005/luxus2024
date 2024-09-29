import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './adminPage.css';

const AdminHome = () => {
  const [data, setData] = useState({ products: [], commercials: [], offices: [], homes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get('https://angry-equinox-amusement.glitch.me/products');
        const commercialsResponse = await axios.get('https://angry-equinox-amusement.glitch.me/commercials');
        const officesResponse = await axios.get('https://angry-equinox-amusement.glitch.me/offices');
        const homesResponse = await axios.get('https://angry-equinox-amusement.glitch.me/homes');
        setData({
          products: productsResponse.data,
          commercials: commercialsResponse.data,
          offices: officesResponse.data,
          homes: homesResponse.data
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Có lỗi xảy ra khi lấy dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/admin');
  };

  const handleAdd = (type) => {
    navigate(`/admin/add/${type}`);
  };

  // const handleEdit = (type, id) => {
  //   navigate(`/admin/edit/${type}/${id}`);
  // };

  const handleDelete = async (type, id) => {
    const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa? Hành động này không thể hoàn tác.');
    if (confirmDelete) {
      try {
        await axios.delete(`https://angry-equinox-amusement.glitch.me/${type}/${id}`);
        const response = await axios.get(`https://angry-equinox-amusement.glitch.me/${type}`);
        setData({
          ...data,
          [type]: response.data
        });
        toast.success('Xóa thành công!'); // Show success toast notification
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Có lỗi xảy ra khi xóa dữ liệu. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="admin-home">
      <header className='admin-header'>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Đăng xuất</button>
      </header>
      <main>
        {loading && <p className="loading-message">Đang lấy dữ liệu, vui lòng chờ...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && (
          <>
            <section className={!loading && !error ? '' : 'hide-content'}>
              <h2>Products</h2>
              <button onClick={() => handleAdd('products')}>Thêm sản phẩm</button>
              <ul className='admin-ul'>
                {data.products.map((product) => (
                  <li className='admin-li' key={product.id}>
                    <h3>{product.name}</h3>
                    <div>
                      {/* <button onClick={() => handleEdit('products', product.id)}>Chỉnh sửa</button> */}
                      <button onClick={() => handleDelete('products', product.id)}>Xóa</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={!loading && !error ? '' : 'hide-content'}>
              <h2>Commercials</h2>
              <button onClick={() => handleAdd('commercials')}>Thêm sản phẩm</button>
              <ul className='admin-ul'>
                {data.commercials.map((commercial) => (
                  <li className='admin-li' key={commercial.id}>
                    <h3>{commercial.name}</h3>
                    <div>
                      {/* <button onClick={() => handleEdit('commercials', commercial.id)}>Chỉnh sửa</button> */}
                      <button onClick={() => handleDelete('commercials', commercial.id)}>Xóa</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={!loading && !error ? '' : 'hide-content'}>
              <h2>Offices</h2>
              <button onClick={() => handleAdd('offices')}>Thêm sản phẩm</button>
              <ul className='admin-ul'>
                {data.offices.map((office) => (
                  <li className='admin-li' key={office.id}>
                    <h3>{office.name}</h3>
                    <div>
                      {/* <button onClick={() => handleEdit('offices', office.id)}>Chỉnh sửa</button> */}
                      <button onClick={() => handleDelete('offices', office.id)}>Xóa</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={!loading && !error ? '' : 'hide-content'}>
              <h2>Homes</h2>
              <button onClick={() => handleAdd('homes')}>Thêm ảnh</button>
              <ul className='admin-ul'>
                {data.homes.map((home) => (
                  <li className='admin-li' key={home.id}>
                    <img
                      src={home.gallery[0]} 
                      alt={`Gallery for home ${home.id}`}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      {/* <button onClick={() => handleEdit('homes', home.id)}>Chỉnh sửa</button> */}
                      <button onClick={() => handleDelete('homes', home.id)}>Xóa</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
      <ToastContainer /> {/* Toast container to display notifications */}
    </div>
  );
};

export default AdminHome;
