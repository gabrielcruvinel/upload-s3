require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');


const storageTypes = {
    //salva o arquivo localmente
    local:multer.diskStorage({
        
        //DESTINO DA IMAGEM
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            //MODIFICA O NOME DA IMAGEM PARA CODIFICAÇAO HASH
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        
        cb(null, fileName);
         });
        }
    }),
    //salva o arquivo no bucket do S3
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'uploadfacerekognition',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            //MODIFICA O NOME DA IMAGEM PARA CODIFICAÇAO HASH
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

            const fileName = `${hash.toString('hex')}-${file.originalname}`;
            
            cb(null, fileName);
         });
        },
    }),

};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: ,
    limits: {
        //recebe o arquivo em bites e multiplica para se tornar megabytes
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