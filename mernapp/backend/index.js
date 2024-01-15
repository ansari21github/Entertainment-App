const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require("./db")
const moviesRoute = require('./Routes/movies');
const tvSeriesRoute = require('./Routes/tvSeries');
const trendingRoute = require('./Routes/trending');
const recommendedRoute = require('./Routes/recommended');
const bodyParser = require('body-parser');
const bookmarkRoutes = require('./Routes/BookmarkRoutes');

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(bodyParser.json());
app.use(express.json())
app.use('/api', require("./Routes/createUser"));
app.use('/api/movies', moviesRoute);
app.use('/api/tv-series', tvSeriesRoute);
app.use('/api/trending', trendingRoute);
app.use('/api/recommended', recommendedRoute);
app.use("/api/bookmark", bookmarkRoutes);



app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
  })