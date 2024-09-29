import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./addProduct.css"; // Sử dụng lại style từ AddProduct
import { v4 as uuidv4 } from 'uuid';

function AddHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigate(-1); // Trở lại trang trước đó
  };

  useEffect(() => {
    const form = document.querySelector('form');
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (window.confirm('Bạn chắc chắn muốn thêm ảnh vào home? Hành động này không thể hoàn tác.')) {
        setLoading(true);
        try {
          const homeImages = document.getElementById('home-images');
          const gallery = await uploadFiles(homeImages.files);

          const homeData = {
            id: uuidv4(),
            gallery
          };

          await addHome(homeData);
          toast.success('Thêm ảnh vào home thành công!');
          form.reset(); // Reset form sau khi thêm thành công
        } catch (error) {
          console.error('Error:', error);
          toast.error('Thất bại, vui lòng thử lại sau khi đổi mạng');
        } finally {
          setLoading(false);
        }
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  const uploadFiles = async (files) => {
    if (files) {
      const CLOUD_NAME = "dg2iqmelk";
      const PRESET_NAME = "luxus-website";
      const FOLDER_NAME = "LUXUS";
      const urls = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      for (const file of files) {
        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME);
        formData.append("folder", FOLDER_NAME);
        formData.append("file", file);

        try {
          const response = await axios.post(api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          urls.push(response.data.secure_url);
        } catch (error) {
          console.error(error);
          throw new Error('Error uploading files');
        }
      }
      return urls;
    }
  };

  const addHome = async (home) => {
    try {
      const endpoint = 'https://angry-equinox-amusement.glitch.me/homes';
      await axios.post(endpoint, home);
    } catch (error) {
      console.error('Error adding home:', error);
      throw error;
    }
  };

  return (
    <div className='add-home-admin'>
      <h1>Thêm ảnh vào Home</h1>
      <form>
        <div className="form-group mb-3">
          <label>Thêm Ảnh</label>
          <input type='file' id='home-images' multiple className="form-control" />
        </div>
        <div className="button-container">
          <button className="btn btn-secondary" type="button" onClick={handleGoBack}>
            &larr; Trở lại
          </button>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddHome;
