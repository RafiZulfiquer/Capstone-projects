import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));




// const YOUR_ACCESS_KEY = "a35f6d4fe299100adeb262f5ee3dd29e";
// const URL = "https://api.exchangeratesapi.io/v1/"
// const link="https://api.exchangeratesapi.io/v1/latest?access_key=a35f6d4fe299100adeb262f5ee3dd29e"




app.get("/", async (req,res)=>{
    try {
        const result = await axios.get("https://api.exchangeratesapi.io/v1/latest?access_key=a35f6d4fe299100adeb262f5ee3dd29e"); 
        res.render("index.ejs", {
          activity: result.data,
          date:result.data.date,
          base:result.data.base,
          rates:result.data.rates,
        }
         );
        //  console.log(result)
      } catch (error) {
        console.log("error API:", error.message);
        res.status(500).send("API ERROR")
      }
})


app.post("/submit", async (req,res)=>{
  const date=req.body.date;
  const YOUR_ACCESS_KEY = "a35f6d4fe299100adeb262f5ee3dd29e";
  const ApiURL=`https://api.exchangeratesapi.io/v1/${date}?access_key=${YOUR_ACCESS_KEY}&symbols=USD,AUD,CAD,PLN,MXN`; 
  try {
      const result = await axios.get(ApiURL); 
      res.render("index.ejs", {
        date: result.data.date,
        base: result.data.base,
        rates: result.data.rates
      });

    } catch (error) {
      console.log("error API:", error.message);
      res.status(500).send("API ERROR")
    }
})







app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})





