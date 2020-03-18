module.exports = function (dir, express, fs, sharAble) {

    return ((exp, fs_, dir_) => {
        var router = exp.Router();
        var path = require('path');


        router.post('/postCreate/uploadImage', function (req, res) {

            if (Object.keys(req.files) != 0) {
                var images = req.files.imgs;
                for (let i = 0; i < images.length; i++) {
                    console.log("Working");
                    console.log(path.join(dir+'/postImages',images[i].name));
                    

                    images[i].mv(path.join(dir + '/postImages', images[i].name), function (err) {
                        if (err) {
                            res.status(500).send("Upload Failed due to some internal server error!");
                        } else {
                            console.log("Uploaded");
                        }

                    });
                }

                var names = [];
                if(!images.pop){
                    images.mv(path.join(dir+'/postImages',images.name),function(err){
                        if(err) throw err;

                        console.log("Image Uploded : "+images.name);
                    });
                    names.push(images.name);
                }else
                for (let x = 0; x < images.length; x++) {
                    names.push(images[x].name);
                }
            }


             sharAble.socketModules.sockets.emit("listRecieved", { images:names});
            // res.status(200).end("Images are uploaded now you can continue further by closing this tab");
        });

        return router;
    })(express, fs, dir);
}