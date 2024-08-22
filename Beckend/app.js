import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mainRouter from './router/Main.js';
import cors from 'cors';

// import bodyParser from 'body-parser';
app.use(express.static('public'));

//for Incomming deta in jsonapp.use(bodyParser.json());
//for accespt json data
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// For import router
app.use(mainRouter);




app.listen(3000, () => {
    console.log("server Started")
})
