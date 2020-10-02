const express = require('express');
const app = express();
const port = 3050;
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler')


app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',routes);
app.use(errorHandler);

app.listen(port , () => {
    console.log(`app is running on ${port}`);
})

