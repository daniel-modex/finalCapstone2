// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import path from 'path';

// const app = express();
// const upload = multer({ dest: 'uploads/' }); // Destination folder

// app.use(cors());

// // File upload endpoint
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   res.send({ filePath: join(__dirname, 'uploads', req.file.filename) });
// });

// // Start server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
