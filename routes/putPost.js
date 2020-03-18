module.exports = function (dir, express, ejs, models,fs) {
    return ((dir_, express_, ejs_, model_) => {

        var router = express.Router();

    

        router.get('/posts/', function(req,res){

            var path = dir+'/public'+req.query.path;
            var title =req.query.title;
            var img = req.query.img;
            fs.readFile(path , function(err , data){
                
                if(err) 
                 res.render('myviews/post.ejs',{post: ":(" , errorMsg:"Post you are looking for does not exist!",title:"",coverImage:""});
                
                 res.render('myviews/post.ejs',{post:data , errorMsg:"",title:title,coverImage:img});
            });

        });
        return router;
    })(express, dir, ejs, models);
}

function validateUser(req, res, next) {
    console.log(req.session.acc)
    if (req.session.acc) {
        next();
    } else {
        res.status(404).send("Not valid user!\nplease login for access these posts!");
        return;
    }
}

function readyPost(req, res, next) {

}

function sendPosts(req, res, next) {

}