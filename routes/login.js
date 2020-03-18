
module.exports = function (express, expressValidator, fs, dir, models) {

    return ((exp) => {

        var router = exp.Router();

        return router.post('/login', [
            //Adding validation layer
            expressValidator.check('userEmail').isEmail(),   //return middleware
            expressValidator.check('password').isLength({ min: 8 }),   //return middleware
            (req, res, next) => {
                var { userEmail, password } = req.body;
                console.log("user Id:" + userEmail + "\npassword:" + password);
                //Checking if user is registered or not
                isValidUser(userEmail, password, models, next, req);

            },
            (req, res, next) => {

                var { userEmail, password } = req.body;
                var acc = req.session.acc;

                (userEmail == acc[0].userName && password == acc[0].password) ? req.session.user = acc[0] : (req.session.user = null);
                if (req.session.user == null)
                    if (userEmail != acc[0].userName) {

                        next();
                        return;
                    } else {

                        req.session.authLogError = [{ param: "Authentication Failed", msg: "Invalid password!" }];

                    }

                next();
            }
        ], function (req, res, next) {  //render middleware
            //console.dir(expressValidator.check('userName').isLength({ min: 3 }));
            var { validationResult } = expressValidator;

            var error_ = validationResult(req);//req.session.error 
            fs.readFile(dir + '/myviews/Home.html' , (err, data) => {
                if (err) throw err;

                if (req.session.user) {
                    res.redirect('/auth/home');
                    return;
                } else {
                    if (req.session.authLogError) {
                        req.session.authLogError.forEach(errLog => {
                            error_.errors.push(errLog);
                        });
                    } else {
                        error_.errors.push({ param: "Invalid user", msg: "No user exist!" });
                    }
                  
                      req.session.user=null;
                      
                      res.render('index', { "title": "Home", "errors": error_.errors, data: data });
                  
                }
            });
            //create authonicate session 
            //redireact to Blog post page with post 
        });
    })(express)
};

function isValidUser(userID, password, models, next, req) {

    var acc = [{ userName: 'null', password: 'null' ,name:'null',id:'null'}];
    var { User } = models;

    User.findOne({ email: userID }).populate('auth').exec((err, data) => {

        if (err) {
            console.log(err);
            req.session.acc = acc;
            next();
            return;
        } else if (data == null) {
            req.session.acc = acc;
            next();
            return;
        } else {

            if (data.auth.validPassword(password)) {

                acc[0].userName = userID  ;
                acc[0].password = password;
                acc[0].name     = data.userName;
                acc[0].id       = data._id;
                req.session.acc = acc     ;
                 req.session.admin ="Validated"; 
                console.log("Validated!");
                next();
                return;
            } else {
                req.session.acc = [{ userName: userID, password: "null" }];
                next();
                return;
            }
        }
    });
}