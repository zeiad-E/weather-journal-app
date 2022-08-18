/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// Store Element in variables
const zip=document.querySelector('#zip');
const zipPrint=document.querySelector('#zipPrint');
const feelings=document.querySelector('#feelings');
const generate=document.querySelector('#generate');
// Store sections where results will appear in variables  
const city=document.querySelector('#city');
const country=document.querySelector('#country');
const temp=document.querySelector('#temp');
const date=document.querySelector('#date');
const content=document.querySelector('#content');
const contentFeel=document.querySelector('#contentFeel');


//let zipCode=90650;     //Was written at the begining of writting this code to test Api 

const key='a5f0739c3428b842f090f5807b0b6fb7';
//The functions will run when click event happens
generate.addEventListener('click',()=>{console.log(zip.value)
  let zipCode=zip.value;
    zipPrint.innerHTML="Zip code :  "+zipCode;
    content.innerHTML="Feelings :  "+feelings.value;
    
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`;
    // get data from API
    const getData=( async ()=>{
        const request=await fetch(apiURL);
        try{
            let allData=await request.json();
             console.log(allData);
            console.log('1');
            return allData;
        }
        catch(error){
            console.log('Error',error);
        }
    })
    // handle Data we took from API
    getData().then((info)=>{
         if(info.cod==404){
            let neededDataError={
                city:undefined,
                country:undefined,
                temp:undefined,
                description:undefined
         }
         return neededDataError
        
        }
        else{
        let neededData={
            city:info.name,
            country:info.sys.country,
            temp:info.main.temp,
            description:info.weather[0].description
        }
        //console.log(neededData);       // just for test and attrack errors
        console.log('2');
        return neededData               //attrack progress
    }
    }).then((neededData)=>{
        try{
            console.log('3');           //attrack progress
            postData('http://localhost:3000/add',neededData);
            console.log(neededData);   // just for test and attrack errors
            console.log('4');          //attrack progress
        }
        catch(error){
            console.log('Error',error);
            
        }
        
    })
    // Show results (updateUI)
   setTimeout( async function updateUI(){           //Made as a setTimeout method to make getData() run before upDate()
        const response=await fetch("http://localhost:3000/add")
        try{
            let data=await response.json();
            console.log('5');       //attrack progress
            console.log(data);     // just for test and attrack errors
            
            city.innerHTML="City :"+data.city;
            country.innerHTML="Country :  "+data.country;
            temp.innerHTML="Temperature :  "+data.temp;
            date.innerHTML="Date :  "+newDate;
            contentFeel.innerHTML="Description :  "+data.description;
           
            if(data.city== undefined ||
                data.country== undefined ||
                data.description== undefined ||
            data.temp== undefined){
                console.log('Zip code not found');


                city.innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp Zip code not found";
                country.innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp( Wrong zip code)";
                temp.innerHTML="";
                date.innerHTML="";
                contentFeel.innerHTML="";




            }


            
        }
        catch(error) {
            console.log("error", error);
        }
    }
    
    ,650); 
     
    updateUI()
    getData(); 
});
//Post method
const postData = async ( url = '', data = {})=>{
    
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        // body data type must match "Content-Type" header      
        body: JSON.stringify(data),   
    });
    
    try {
        const newData = await response.json();
        console.log('post succeed');
        return newData
    }catch(error) {
        console.log("error", error);
    }
}






