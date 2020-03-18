module.exports=function(express ,dir,fs){
    return (exp=>{
        var router = exp.Router();

        router.get('/logout' ,function(req,res){
            if(req.session.admin){
                delete req.session.acc;
                delete req.session.admin;

                fs.readFile(dir+'/static/Login/login.html', (err, data) => {
                    if (err) throw err;
                    res.render('index', { title: 'Home', errors: [], data: data });
                  });

            }else{
                fs.readFile(dir+'/static/Login/login.html', (err, data) => {
                    if (err) throw err;
                    res.render('index', { title: 'Home', errors: [], data: data });
                  });
            }
        });

        return router;
    })(express);
}