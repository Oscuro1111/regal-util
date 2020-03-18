var fs = require("fs");
var crypto= require("crypto");
var dir_;
var models_;
module.exports = function (express, shareAble, dir, models) {
    return (exp => {

        dir_ = dir;
        models_ = models;
        var router = exp.Router();

        router.post('/getPost', [createFile , setRecord],function (req, res) {

            //Put a identifier in post componets
            //set A router or post Show up 
           fs.readFile(dir+"/public/createPost/postedMsg.html",function(err ,data){

            if(err) res.status(500).send("Enternal Server Error!");
            else
               res.status(200).send({data:data.toString()});
               
           });

        });

        return router;
    })(express);
}

function validateUser(req, res, next) {
    if (!req.session.acc) {
        console.log("no logined");
        res.status(300).send("Not valid user!\nplease login for access these posts!");

        return;
    } else {
        console.log("logined");
        console.log(req.session.acc);
        next();
    }
}

function createFile(req, res, next) {

    var { title, doc, coverImg } = req.body;

    console.log(title + " " + coverImg);
   
    var fileName = crypto.randomBytes(8).toString('hex');
    fileName += "_"+req.session.acc[0].id + ".html";

console.log(fileName);


      fs.writeFile(dir_ + "/public/postRecord/" + fileName, doc, function (err, data) {

        if (err){
            console.log(err);
            return;
        }

        console.log("File created:" + fileName);

        req.session.temp = "/postRecord/" + fileName;

        next();
    });

}

function setRecord(req, res, next) {

    var { User, Post } = models_;

    var { doc, coverImg, title } = req.body;


    
    
    User.findOne({ _id: req.session.acc[0].id }).exec((err, user) => {
        if (err) {
            req.status(500).send("Internal Server Error!");
            return;
        } else {
            var post = new Post();
            
            post.title = title;
            
            post.author = user._id;
            
            post.body= req.session.temp;

            post.img=coverImg;

            user.posts.push(post._id);

            post.save((err,p)=>{
                if(err) req.status(500).send();

            });

            user.save((err ,u)=>{
                if(err) req.status(500).send();
            });

            next();
        }

    });
}

