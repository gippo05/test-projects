import express from 'express';
import bcrypt from 'bcrypt';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "loginPage.html"));
});

const mockDataBase = [];
let isLoggedIn = false;

app.post("/register", async (req, res) =>{
    
    const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).send("Email and Password required!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {email , password: hashedPassword};
    mockDataBase.push(newUser);

    return res.redirect("/");
});

app.post("/login", async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send("Enter required fields!")
    }

    const existingUser = mockDataBase.find(user => user.email === email);
    
    if(existingUser){
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if(passwordMatch){
            isLoggedIn = true;
            res.redirect("/login")
        }
    }
    else{
        return res.send("User not found!")
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});