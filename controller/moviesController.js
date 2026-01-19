import connetion from "../database/dbConnetion.js";

function index (req, res, next) {
    const query = "SELECT * FROM movies";

    connetion.query(query,(err, result) =>{
        if(err) return next(err);
        return res.json({
            results: result,
        });
    });

}

function show (req, res, next) {
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
    const movie = result[0];

    const reviewsQuery = "SELECT * FROM reviews WHERE movie_id = ?";
    connetion.query(reviewsQuery,[id],(err, reviewsResult)=>{
        if(err) return next(err);
        res.json({
            ...movie,
            reviews: reviewsResult,
        })
    })
})
}
export default {index, show};