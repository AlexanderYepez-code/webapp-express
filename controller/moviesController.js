import connection from "../database/dbConnetion.js";

function index(req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const itemsFrrPage = 3;
    const offset = (page - 1) * itemsFrrPage;


    const query = `SELECT movies.*, cast(avg(reviews.vote)as float) as avg_vote FROM movies left join reviews on movies.id = reviews.movie_id group by movies.id limit ? offset ?`;

    connection.query(query, [itemsFrrPage, offset], (err, result) => {
        if (err) return next(err);
        const querytotal = "select count(id) as total from movies"
        connection.query(querytotal, (err, resultTotal) => {
            if (err) next(err);
            const totalMovies = resultTotal[0].total;
            return res.json({
                info:{
                    total: totalMovies,
                    pages: Math.ceil(totalMovies/itemsFrrPage),
                    current: page,
                }, results: result,
            });

        })

    })



  

}

function show(req, res, next) {
    const slug = req.params.slug;

    const query = `SELECT movies.*, cast(avg(reviews.vote)as float) as avg_vote FROM movies left join reviews on movies.id = reviews.movie_id  WHERE movies.slug = ?`;

    connection.query(query, [slug], (err, result) => {
        if (err) return next(err);

        if (result.length === 0) {
            res.staus(404);
            return res.json({
                error: "NOT FOUND",
                message: "Movie not found"
            });
        }
        const movie = result[0];

        const reviewsQuery = "SELECT * FROM reviews WHERE movie_id = ?";
        connection.query(reviewsQuery, [movie.id], (err, reviewsResult) => {
            if (err) return next(err);
            res.json({
                ...movie,
                reviews: reviewsResult,
            })
        })
    })
}
export default { index, show };