import express from 'express';
import userRouter from './src/routes/user.route.js';


const app = express();


app.use(  express.json()  ); //this parse to JSON

app.get( "/", (req, res) => {
    res.send("Home Page in GET Method Express1");
});


app.use("/user", userRouter);

/*
app.get( "/", (req, res) => {
    res.send("Home Page in GET Method Express1");
    res.send("Home Page in GET Method Express2");
});

app.post( "/", (req, res) => {
    res.send("Home Page in POST Method Express");
});

app.get( "/about", (req, res) => {
    res.status(201);
    res.send("This is about page Express");
});

app.get( "/json", (req, res) => {  
    res.status(400).json({name: "Konsam", roll: 12});
});
*/

// 200 = OK , 201 = created, 400 = Bad Request, 401 = authentication error, 403 = authorization error   404 = Page not found
// 500 = Internal Server Error, 503 = Service Unavailable


app.use((req, res) => {
    res.status(404).send("The page is not found Express");
});



app.listen(3000, () => {
    console.log('Server is started, click on http://localhost:3000');
} );
