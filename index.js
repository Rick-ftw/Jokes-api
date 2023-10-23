import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;
const Api_URL = "https://v2.jokeapi.dev/joke/"
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    res.render("index.ejs", {
        content: "waiting for content...",
    });

});

app.post("/get-joke", async (req, res)=> {
    
    const searchId = req.body.type;
    console.log(searchId);
    try {
        const result = await axios.get(Api_URL + searchId + "?type=single"); 
        console.log(result.data);
        res.render("index.ejs", {
            content: result.data,
        });  
    } 
    catch (error) {
        res.send(error.message);
    }
});

app.listen(port, ()=> { 
    console.log(`Server is started on port ${port}`);
})