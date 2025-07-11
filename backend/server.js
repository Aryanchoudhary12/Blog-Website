import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from "cors";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port =process.env.PORT|| 4000;
import multer from 'multer';
// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "blogging website",
//     password: "aryan@123",
//     port: 5432,
// });
// db.connect();


const db = new pg.Client({
  connectionString: process.env.DATABASE_URL, 
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Enable SSL in production
  // ssl: {
  //   rejectUnauthorized: false, // Use `true` in production with proper certificates
  // },

});

db.connect()
  .then(() => console.log('Connected to the PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));


app.post("/signup",async(req,res)=>{
   const user= req.body.username;
   const Email= req.body.email;
   const Password= req.body.password;

    const result ="INSERT INTO userid (username,email,password) VALUES ($1,$2,$3)";
    const values = [user,Email,Password];
    db.query(result,values,(err,results)=>{
      if(err){
        res.send({message: 'Invalid username or password'});
        console.log("error");
      }else{
        res.send("User added");
        console.log("user added");
      }
    })
});

app.post("/signin",async(req,res)=>{

  const sentusername= req.body.loginusername;
  const sentPassword= req.body.loginpassword;
  
  try {
    const query = 'SELECT * FROM userid WHERE username = $1 AND password = $2';
    const result = await db.query(query, [sentusername, sentPassword]);

    if (result.rows.length > 0) {
      res.json({ success: true , value:result.rows[0].id});
      const value = result.rows[0].id;
      console.log('Login successful')
      console.log(value)
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
      console.log("Invalid username or password")
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }


})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null,"../frontend/blogweb/src/assets")
  },
  filename: function (req, file, cb) {
  cb(null,file.originalname)
  }
})

const upload = multer({storage })

app.post("/new",upload.single('image'),async(req,res)=>{
  const ID = req.body.id;
  const Image = req.file.filename;
  const Title = req.body.title;
  const Type = req.body.type;
  const Content= req.body.content;

   const result ="INSERT INTO posts (user_id,image,title,type,content) VALUES ($1,$2,$3,$4,$5)";
   const values = [ID,Image,Title,Type,Content];
   db.query(result,values,(err,results)=>{
     if(err || !req.file){
       res.send({message: 'Invalid'});
       console.log("error");
     }else{
       res.send("posted");
       console.log("posted");
     }
   })
});

app.post("/blogs",async(req,res)=>{
  try {
    const query = 'SELECT * FROM posts';
    const result = await db.query(query);

    if (result.rows.length > 0) {
      res.json(result.rows);
      const value = result.rows;
      console.log('Posts available')
      console.log(value)
    } else {
      res.json({ success: false, message: 'No Posts available' });
      console.log(" No Posts available")
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }

});

app.post("/profile",async(req,res)=>{
  const User = req.body.user;
  try {
    const query = 'SELECT * FROM userid WHERE id = $1' ;
    const result = await db.query(query,[User]);

    if (result.rows.length > 0) {
      res.json({value:result.rows,username:result.rows[0].username,email:result.rows[0].email});
      const value = result.rows;
      console.log('Posts available')
      console.log(value)
    } else {
      res.json({ success: false, message: 'No Posts available' });
      console.log(" No Posts available")
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



app.post("/profile/posts",async(req,res)=>{
  const User = req.body.user;
  try {
    const query = 'SELECT * FROM posts WHERE user_id = $1' ;
    const result = await db.query(query,[User]);

    if (result.rows.length > 0) {
      res.json({value:result.rows});
      const value = result.rows;
      console.log('Posts available')
      console.log(value)
    } else {
      res.json({ success: false, message: 'No Posts available' });
      console.log(" No Posts available")
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put("/blogs/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, type, content } = req.body;
  const image = req.file.filename;

  const query = `
    UPDATE posts
    SET title = $1, type = $2, content = $3, image = $4
    WHERE id = $5
  `;
  const values = [title, type, content, image, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ message: "Error updating blog post." });
    } else {
      res.status(200).json(result);
    }
  });
});
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const result = await db.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", blog: result.rows[0] });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
});
app.listen(port,()=>{
  console.log("App is listening on port:", process.env.PORT);
})