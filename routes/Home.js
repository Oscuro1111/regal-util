module.exports =function(express,dir,fs){
    return ((exp)=>{
        var router = express.Router();

        router.get('/auth/home',(req,res,next)=>{

            if(!req.session.admin){
               res.status(400).send("No validated user account Found ! plz Login with validated user Id !");
                return;
            }

            next();
            return;
        },function(req,res ,next){
            fs.readFile(dir+'/second.html' ,(err,data)=>{
                if(err) res.status(500).send("Internal server error :( !");

                res.status(302).send(" "+data);
            });

        });

        return router; 
    })(express);
}

