

module.exports = function (express, dir, fs) {

    return (( exp, fs) => {
        var router = exp.Router();

        router.get("/signUp", function (req, res) {
            fs.readFile(dir+"/static/Login/index.html" , function(err , data){
                if(err) res.status(500).send("Internal server error:(!");

                res.status(200).send(" " + data);
            });
        });


        return router;
    })(express, fs);

};