const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    //NOME ORIGINAL
    name: String,
    size: Number,
    //NOME COM O HASH
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Post', PostSchema);