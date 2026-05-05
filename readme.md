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

# GraphQL API Server

A clean, modern GraphQL-only API built with Node.js, Express, and Apollo Server.

## 🏗️ Architecture

```
src/
├── graphql/
│   ├── schema/
│   │   ├── index.js           # Combined schema definitions
│   │   ├── userSchema.js     # User schema
│   │   ├── sellerSchema.js   # Seller schema
│   │   ├── indianFoodSchema.js # IndianFood schema
│   │   └── travelSchema.js   # Travel schema
│   ├── resolvers/
│   │   ├── userResolvers.js      # User-specific resolvers
│   │   ├── sellerResolvers.js    # Seller-specific resolvers
│   │   ├── indianFoodResolvers.js # IndianFood-specific resolvers
│   │   ├── travelResolvers.js    # Travel-specific resolvers
│   │   └── index.js           # Combined resolvers
│   ├── context.js               # GraphQL context creation
│   └── server.js               # Apollo Server setup
├── config/
│   └── config.js               # Environment configuration
└── utils/
    └── jwt.util.js              # JWT utilities
```

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
# or
npm run dev
```

### Start Production Server

```bash
npm run server
# or
npm run graphql
```

## 📊 GraphQL Playground

Access GraphQL Playground at: `http://localhost:8082/graphql`

## 🔗 Sample Queries & Mutations

### Users

#### Get All Users

```graphql
query {
  users {
    id
    name
    email
    isAdmin
  }
}
```

#### Create User

```graphql
mutation {
  createUser(
    input: { name: "John Doe", email: "john@example.com", isAdmin: false }
  ) {
    id
    name
    email
    isAdmin
  }
}
```

### Sellers

#### Get All Sellers

```graphql
query {
  sellers {
    id
    name
    location
    createdAt
  }
}
```

#### Create Seller

```graphql
mutation {
  createSeller(input: { name: "New Restaurant", location: "Mumbai" }) {
    id
    name
    location
    createdAt
  }
}
```

### Indian Foods

#### Get All Indian Foods with Sellers

```graphql
query {
  indianFoods {
    id
    name
    ingredients
    diet
    prepTime
    cookTime
    flavorProfile
    course
    state
    region
    sellers {
      id
      name
      location
    }
  }
}
```

#### Search Indian Foods

```graphql
query {
  searchIndianFoods(query: "spicy") {
    id
    name
    ingredients
    diet
    flavorProfile
  }
}
```

#### Create Indian Food

```graphql
mutation {
  createIndianFood(
    input: {
      name: "Paneer Tikka"
      ingredients: ["paneer", "spices", "cream"]
      diet: "vegetarian"
      prepTime: 25
      cookTime: 30
      flavorProfile: "creamy spicy"
      course: "main"
      state: "Punjab"
      region: "North"
      seller_ids: ["1", "2"]
    }
  ) {
    id
    name
    ingredients
    diet
    sellers {
      id
      name
      location
    }
  }
}
```

### Travels

#### Get All Travels with Users

```graphql
query {
  travels {
    id
    name
    description
    price
    users {
      id
      name
      email
    }
  }
}
```

#### Create Travel with Multiple Users

```graphql
mutation {
  createTravel(
    input: {
      name: "Group Adventure"
      description: "Amazing trip"
      price: 2999.99
      user_ids: ["1", "2"]
    }
  ) {
    id
    name
    description
    price
    users {
      id
      name
      email
    }
  }
}
```

### Authentication

#### Register User

```graphql
mutation {
  register(
    input: { name: "New User", email: "newuser@example.com", isAdmin: false }
  ) {
    token
    user {
      id
      name
      email
      isAdmin
    }
  }
}
```

#### Login User

```graphql
mutation {
  login(input: { email: "user@example.com", password: "password123" }) {
    token
    user {
      id
      name
      email
      isAdmin
    }
  }
}
```

## 🔐 Authentication

Include JWT token in headers:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Environment Variables

Create `.env` file:

```
MONGODB_URL=mongodb://localhost:27017/basic-nodejs
PORT=8082
JWT_SECRET=your-secret-key
BCRYPT_SALT=10
```

## 🎯 Features

- ✅ GraphQL-only API (no REST endpoints)
- ✅ Modular architecture with separated schemas
- ✅ Service-based data layer
- ✅ JWT authentication
- ✅ Input validation
- ✅ Error handling
- ✅ GraphQL Playground
- ✅ CORS enabled
- ✅ Hot reload with nodemon
- ✅ Database integration ready (MongoDB/Mongoose)

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
