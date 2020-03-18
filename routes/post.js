var models__ = null;
module.exports=function(dir, express,models){
    models__=models;
    return ((dir_,express_,ejs_,model_)=>{
        var router =express.Router();
        
        router.get('/post',[checkPost]);
        
        return router;

    })(express,dir,models);
}


function validateUser(req,res,next){
    

    if(!req.session.acc){

        res.status(400).send("Not valid user!\nplease login for access these posts!");
        return;
    }else{
        next();
    }
}


function checkPost(req,res,next){
    
    var {Post} = models__;


    Post.find({}).populate('author').exec(function(err ,data){

        if(err){
            res.status(404).send("Not found");
        }else{
            
            res.status(200).json({"posts":data});
        }
    });
}