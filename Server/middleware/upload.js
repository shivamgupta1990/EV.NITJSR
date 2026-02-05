// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb("Images only!");
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;


import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // 👈 explicit binding
  params: async (req, file) => {
    console.log("FILE RECEIVED:", file);

    return {
      folder: "event-booking",
      format: file.mimetype.split("/")[1], // jpg/png/webp
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;

