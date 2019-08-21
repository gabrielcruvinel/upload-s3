const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

const Post = require('./models/Post')
routes.get("/", (req, res)=>{
    return res.json({ hello: "word" });
});

//routes.post("/posts", multer().single -> upload de  um unico arquivo
//routes.post("/posts", multer().array ->upload de varios arquivos
routes.post("/posts", multer(multerConfig).single('file'), async(req, res)=>{
    const { originalname: name, size, filename:key} = req.file;
    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    });
    return res.json(post);
});
module.exports = routes