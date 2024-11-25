import multer from "multer";
import path from "path";

const storageUploads = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirProfile = `src/assets/profiles`;
        return cb(null, dirProfile);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = `${file.fieldname}-${req.user._id}${ext}`;
        cb(null, fileName);
    },
});
const fileExtFilter = function (req, file, cb) {
    try {
        const validExtensions = [
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
            ".webp",
        ];
        const ext = path.extname(file.originalname).toLowerCase();

        if (validExtensions.indexOf(ext) === -1) {
            cb(
                // Comment: Clean this
                new Error(
                    "Formato inválido. (Admitidos: png, jpg, jpeg, gif are allowed.)"
                )
            );
            return;
        }
        cb(null, true);
    } catch (error) {
        cb(error, null);
    }
};

export const uploads = multer({
    fileFilter: fileExtFilter,
    storage: storageUploads,
});
