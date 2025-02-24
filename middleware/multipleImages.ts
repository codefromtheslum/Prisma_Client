import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 }, // 500KB file size limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(null, false);
        }
        cb(null, true);
    },
}).array("image", 3); // Max 5 images
