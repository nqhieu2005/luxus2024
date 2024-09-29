import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./addProduct.css";
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState('housing');

  const handleGoBack = () => {
    navigate(-1); // Trở lại trang trước đó
  };

  useEffect(() => {
    const form = document.querySelector('form');
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (window.confirm('Bạn chắc chắn muốn thêm sản phẩm? Hành động này không thể hoàn tác.')) {
        setLoading(true);
        try {
          let urls = [];
          if (productType !== 'home') {
            const productImages = document.getElementById('product-images');
            urls = await uploadFiles(productImages.files);
          }

          const id = uuidv4();

          const productData = {
            id,
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            budget: document.getElementById('product-budget').value,
            location: document.getElementById('product-location').value,
            floorArea: document.getElementById('product-floor-area').value,
            functionality: document.getElementById('product-functionality').value,
            gallery: urls,
            type: productType,
          };

          if (productType === 'home') {
            productData.gallery = await uploadFiles(document.getElementById('product-images').files);
          }

          await addProduct(productData);
          toast.success('Thêm dự án thành công!');
          form.reset(); // Reset the form fields
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
  }, [productType]);

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

  const addProduct = async (product) => {
    try {
      let endpoint;
      switch (product.type) {
        case 'housing':
          endpoint = 'https://angry-equinox-amusement.glitch.me/products';
          break;
        case 'commercial':
          endpoint = 'https://angry-equinox-amusement.glitch.me/commercials';
          break;
        case 'office':
          endpoint = 'https://angry-equinox-amusement.glitch.me/offices';
          break;
        case 'home':
          endpoint = 'https://angry-equinox-amusement.glitch.me/home';
          break;
        default:
          throw new Error('Invalid product type');
      }
      await axios.post(endpoint, product);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  return (
    <div className='add-product-admin'>
      <h1>Thêm sản phẩm</h1>
      <form>
        <div className="form-group mb-3">
          <label>Nhập Tên</label>
          <input type='text' id='product-name' className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Nhập Giới Thiệu</label>
          <textarea
            id="product-description"
            className="form-control"
            rows="5"
            placeholder="Enter the product description here..."
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label>Ngân Sách</label>
          <input type='text' id='product-budget' className="form-control" placeholder="Enter the budget" />
        </div>
        <div className="form-group mb-3">
          <label>Vị Trí</label>
          <input type='text' id='product-location' className="form-control" placeholder="Enter the location" />
        </div>
        <div className="form-group mb-3">
          <label>Diện Tích</label>
          <input type='text' id='product-floor-area' className="form-control" placeholder="Enter the floor area" />
        </div>
        <div className="form-group mb-3">
          <label>Công Năng</label>
          <input type='text' id='product-functionality' className="form-control" placeholder="Enter the functionality" />
        </div>
        <div className="form-group mb-3">
          <label>Thêm Ảnh</label>
          <input type='file' id='product-images' multiple className="form-control" />
        </div>
        <div className="form-group mb-3">
          <label>Chọn Loại</label>
          <select id='product-type' className="form-control" onChange={(e) => setProductType(e.target.value)}>
            <option value="housing">Housing</option>
            <option value="commercial">Commercial</option>
            <option value="office">Office</option>
          </select>
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

export default AddProduct;
