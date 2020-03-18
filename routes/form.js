
module.exports = function (express ,fs ,dir ,ejs) {
    return ((exp) => {
        var router = exp.Router();
        var _render = ejs.render ;
 
        return router.get('/form', function (req, res) {

            fs.readFile(dir+"/login/loginForm.html", function (err, _data) {

                if(err) {res.status(500).send("Internel Server Error! :("); return;};
                
                res.render('index', { "data": _data.toString() ,"title":"Welcome to our Login Form." ,errors:[]});
            });
        });
    })(express)
};