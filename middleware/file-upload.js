import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

const fileUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100, // Limit of 100MB
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/horeca");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];

      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

export default fileUpload;
