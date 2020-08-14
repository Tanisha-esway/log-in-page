const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const firstname = req.body.fName;
const lastname= req.body.lname;
const email= req.body.email;

const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_feilds:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
  ]
};
const jsondata=JSON.stringify(data);
const url="https://us17.api.mailchimp.com/3.0/lists/6f1e84de07";
const options={
  method:"POST",
  auth:"tanisha2:481840863ff4fcb78ad74cef3a4fc3b2-us17"
}
const request=https.request(url,options,function(response){
  if(response.statusCode == 200){
    res.sendFile(__dirname+"/success.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsondata);
request.end();
});

app.post("failure",function(req,res){
  res.redirect("/signup.html");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running");
});
// 481840863ff4fcb78ad74cef3a4fc3b2-us17
// 6f1e84de07
