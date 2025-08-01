import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let contentStorage = [];

app.get("/", (req, res) => {
  const blogTitles = contentStorage.map(({ id, title }) => ({ id, title }));
  res.render("index.ejs", { blogPost: blogTitles });
});

app.get("/blog/:id", (req, res) => {
  const { id } = req.params;
  const content = contentStorage.find((post) => post.id === parseInt(id));

  if(!content){
   return res.status(404).json({message: "Blog post not found."})
  }
  
  res.render("blog.ejs", { content: content });
});

let lastId = 0;

app.post("/submit", (req, res) => {
  const { title, blogContent } = req.body;

  if (!title || !blogContent) {
    return res
      .status(400)
      .json({ message: "Please complete required fields!" });
  }

  lastId++;
  let newPost = { id: lastId, title, blogContent };
  contentStorage.push(newPost);
  return res.status(200).json({ message: "Blog successfuly posted!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
