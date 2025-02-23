import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fieldSize: 500 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/*")) {
            return cb(null, false)
        }
        cb(null, true)
    }
}).array("image", 3) // Max of 3 images