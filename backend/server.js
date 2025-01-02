import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from "cors";
import path from 'path';
const app = express();
const port = process.env.PORT;
import multer from 'multer';
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blogging website",
    password: "aryan@123",
    port: 5432,
});
db.connect();

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

//  const database = ' SELECT * FROM userid WHERE username = $1 AND password = $2 ' 
//    const Values = [sentusername , sentPassword]

//    db.query(database , Values,(err,results)=>{

//      if(err){
//        res.send(err);
//        console.log("error");
//      }
//      if( results.length > 0){
//        res.send(results);
//      }
//      else{
//        res.send("Credentials don't found");
//        console.log("Credentials don't found");
//        console.log(sentusername);
//        console.log(sentPassword);
//      }
//    })
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

app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})