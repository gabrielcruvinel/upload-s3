const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multer.diskStorage({
        
        //DESTINO DA IMAGEM
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        
        cb(null, fileName);
         });
        },
    }),
    limits: {
        //recebe o arquivo em bites e multiplica para se tornar bytes e em sequencia megabytes
        fileSize: 2 * 1024 * 1024,
    },
        fileFilter: (req, file, cb) =>{
            //FORMATOS PERMITIDOS
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ];

            if(allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type.'));
            }
        }
};