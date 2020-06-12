const express = require("express");
const bodyparser = require("body-parser");
const app = express();

var items=[];
var work=[];
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/",(req, res)=> {
  var today = new Date();
  var options = {
    weekday: "long",
    month: "long",
    day:"numeric"
  };
  var day=today.toLocaleDateString("en-US",options);

  res.render("list", {listTitle: day, newitems: items });
});

app.post("/",(req,res) =>{
  console.log(req.body);
  var item=req.body.newItem;
  if(req.body.list==="Work"){
    work.push(item);
    res.redirect("/work");
  }else{
  items.push(item);
  res.redirect("/");
}
});

app.get("/work",(req,res)=>{
  res.render("list", {listTitle: "Work", newitems: work});
});

app.get("/about",(req,res)=>{
  res.render("about");
});

app.listen(3000,()=> {
  console.log("Server has started");
});
