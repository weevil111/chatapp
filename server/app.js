const express = require("express");

const app = express();
app.use(express.json());
app.get("/", function(req, res){
  console.log(req);
})

app.listen(5500, function(){
  console.log("Server started at port 5500");
})