module.exports = function (express, models) {

    return ((exp, mod) => {

        var router = exp.Router();

        router.get('/delete', [validateUser], function (req, res) {
            var { User,Post } = mod;
            User.findOne({ _id: req.session.acc[0].id }).exec(function (err, user) {
                if (err) res.status(404).send("Not found!");

                if(user.posts.length>0)
                for (let i = 0; i < user.posts.length; i++) {
                    Post.deleteOne({_id:user.posts[i]} , function(err,results){


                        if(err) res.status(404).send("No post Found to delete!");

                        console.log(results);
                       let temp= user.posts.pop();
                       delete temp;

                       user.save(function(err ,u){
                           if(err){
                               res.status(500).send("Internal Server error :(!");
                           }
                           console.log(u);
                       });
                    });

                }


            });

            res.status(200).send("Deleted");
        });
        return router;
    })(express, models);
}


function validateUser(req, res, next) {

    console.log("Hello");

    if (!req.session.acc) {

        res.status(400).send("Not valid user!\nplease login for access these posts!");
        return;
    } else {
        console.log("By");
        next();
    }
}