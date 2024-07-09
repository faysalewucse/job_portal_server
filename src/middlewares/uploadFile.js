const multer = require("multer");
const path = require("path");
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require("../config");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error("File size exceeds the maximum limit"), false);
  }
  if (
    !ALLOWED_FILE_TYPES.includes(path.extname(file.originalname).substring(1))
  ) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;
