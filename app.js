import express from "express"
import moviesRouter from "./routers/movies.js"
import cors from "cors"

const app = express()

const port = process.env.SERVER_PORT;

app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use(express.json())
app.use(express.static("public"));                          
app.use ("/api/movies", moviesRouter);



app.listen(port,() => {
    console.log("Il server sta funzionando nella porta" + port)

});
