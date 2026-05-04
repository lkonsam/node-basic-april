<!-- Installation -->

1. Install which are required in production also
   npm install express, mongoose, dotenv
   npm install fs path csv-parser
   npm install jsonwebtoken bcrypt

2. install which are required only at the time of development
   npm install --save-dev nodemon

3. env
   NODE_ENV = 'development'
   PORT = 3000

MONGODB_URL = mongodb://127.0.0.1:27017/basic-nodejs

. = one character
.\* = zero or more characters
.+ = one or more characters
^ = start of string
$ = end of string
[] = character class
() = grouping
[^] = negation
{} = quantifier
? = optional
