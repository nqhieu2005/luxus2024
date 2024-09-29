const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json({ limit: '50mb' })); // Để xử lý base64 lớn hơn

app.post('/housing', (req, res) => {
  const { img } = req.body;

  if (img) {
    // Xử lý định dạng ảnh
    const base64Data = img.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
    const fileExtension = img.split(';')[0].split('/')[1];
    const filePath = path.join(__dirname, 'public/images', `image-${Date.now()}.${fileExtension}`);
    console.log('Saving image to:', filePath);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).send('Failed to save image');
      }
      res.send('Product added successfully');
    });
  } else {
    res.status(400).send('No image provided');
  }
});

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
