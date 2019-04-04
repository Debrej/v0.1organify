const bcrypt = require("bcrypt-nodejs");
let salt = "$2a$10$yu40Y4WxBNNuGq2h2mCLYu";

let pwd = process.argv.slice(2)[0];
bcrypt.hash(pwd, salt, null, function(err, hash){
    console.log("Mot de passe : "+pwd+"\nHash : "+hash);
});