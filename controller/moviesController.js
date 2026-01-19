import connetion from "../database/dbConnetion.js";

function index (req, res) {
    const query = "SELECT * FROM movies";

    connetion.query(query,(err, result) =>{
        if(err) return next(err);
        return res.json({
            results: result,
        });
    });

}

function show (req, res) {
const id = req.params.id;

const query = "SELECT * FROM movies WHERE id = ?";

connetion.query(query,[id],(err, result)=>{
    if(err) return next(err);

    if(result.length === 0){
        res.staus(404);
        return res.json({
            error: "NOT FOUND",
            message: "Movie not found"
        });
    }
    const movie = result[0]
    res.json(movie)
})
}
export default {index, show};