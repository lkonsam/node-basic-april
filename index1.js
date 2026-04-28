import http from 'http';

const server = http.createServer( 
    (req, res)  => {

        const {url, method} = req;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        const responseData = {
            method: req.method,
            url: req.url
        };

        // console.log(responseData);
        // res.end(JSON.stringify(responseData));
        

        if( url === "/" && method === "GET"){
            res.end("Home Page in GET Method");
        }
        else if( url === "/" && method === "POST"){
            res.end("Home Page in POST Method");
        }         
        else if( url === "/about" && method === "GET"){
            res.end("This is about page");
        }
        else{

                res.write("Hellow ");
                res.write("Hello1w ");
                res.write("Hello2w ");
                res.write("Hell4ow ");
                res.end("The link broken please try again");
            
        }

});


server.listen(3000, () => {
    console.log('Server is started, click on http://localhost:3000');

} );
