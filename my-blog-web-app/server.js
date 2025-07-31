import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (req, res)=>{
    res.render("index.ejs")
});


let contentDB = [];

app.post("/submit", (req, res)=>{ //this submits and save the post to the mock data base.
   const { title, blogContent} = req.body;

   if(!title || !blogContent){
    res.status(401).json({message: "Please enter required fields!"});
   }

   contentDB.push({title, blogContent});
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});