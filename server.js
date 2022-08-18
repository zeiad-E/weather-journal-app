// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});



    projectData = {};  // To store received data
    data=JSON.stringify(projectData);
    //Get request
app.get('/add',(req, res)=>{
    res.status(200).send(projectData);
    console.log(data);   //attrack progress 
    console.log('get method server side');
});
//Post request
app.post('/add',(req, res)=>{
   // const newEntry={
     //   city:req.body.city,
       // country:req.body.country,
        //temp:req.body.temp,
        //description:req.body.description
   // }
    projectData=req.body;
    console.log(projectData);  //attrack progress 
    res.status(200).send(projectData);
   // console.log(projectData);
    console.log('post method server side');

})