const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
 const app=express();
 app.use(bodyParser.urlencoded({extended:true}));
 app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
   
   });
   app.post("/",function(req,res){
     const query=req.body.cityName;
     const apikey="1f1265353e1fd47815c71c2574d392a7"
     const unit="metric"
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
     
    https.get(url,function(response){
     console.log(response.statusCode)
     response.on("data",function(data){
     const weatherData=JSON.parse(data)
     const temp =weatherData.main.temp
     const place=weatherData.name
     const weatherDescription=weatherData.weather[0].description
     const icon=weatherData.weather[0].icon
     const imageURL="http://openweathermap.org/img/wn/" +icon + "@2x.png" 
        res.write("<h1>the temperature in"+query +" is" +temp   + "degrees</h1>")
        res.write("the weather is currently "+weatherDescription )
        res.write("<img src="+imageURL+">");
        res.send()
     })
       
     })
   })
  
 app.listen(3000,function(){
   console.log("server is running on 3000")
 })