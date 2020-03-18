module.exports =function(express ,dir ,fs){

    return (exp=>{
        var router = exp.Router();

        router.get('/temp' , [temp]);

        return router;
    })(express)
}

function temp(req , res ,next){

    console.log(req.url);

    console.log(req);
  var data = {d:'hello'};
  
    res.format({ "application/json":function(){
        res.send(data);
    },
      "application/xml":function(){
          res.write("<p>Hello</p>");
      }
});
    
    res.end("Welcome to work place");

}
