import express from 'express';


const app = express();


app.use(  express.json()  ); //this parse to JSON


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

app.use((req, res) => {
    res.send("The page is not found Express");
});



app.listen(3000, () => {
    console.log('Server is started, click on http://localhost:3000');
} );
