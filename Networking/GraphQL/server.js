// server.js
// ==========================================
// Chhota GraphQL server — Book Library example
// Idea: hum kuch books ka data rakhenge memory mein,
// aur GraphQL se query karke sirf WOHI fields maangenge jo chahiye
// ==========================================

const { ApolloServer } = require('@apollo/server');
// ^ Apollo Server ka main class — ye hi GraphQL engine chalata hai

const { startStandaloneServer } = require('@apollo/server/standalone');
// ^ Ye helper function server ko khud http pe listen karwa deta hai
// (humein alag se express setup nahi karna padta)

// ------------------------------------------
// STEP 1: SCHEMA — "contract" jo batata hai kaunsa data available hai
// ------------------------------------------
const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    year: Int
    genre: String
  }
  # ^ 'Book' naam ka ek "shape" define kiya — jaise TypeScript interface hota hai
  # String, Int — ye GraphQL ke built-in types hain

  type Query {
    books: [Book]
    bookByTitle(title: String): Book
  }
  # ^ 'Query' woh entry point hai jahan se client data maang sakta hai
  # 'books' → saari books ki list dega ([Book] = Book ka array)
  # 'bookByTitle' → ek specific book dhoondega title se (argument leta hai)
`;

// ------------------------------------------
// STEP 2: DATA — asli data jo hum serve karenge (real app mein ye database se aata)
// ------------------------------------------
const books = [
  { title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011, genre: 'History' },
  { title: 'Atomic Habits', author: 'James Clear', year: 2018, genre: 'Self-help' },
  { title: 'The Alchemist', author: 'Paulo Coelho', year: 1988, genre: 'Fiction' },
];
// ^ Ye ek simple JS array hai — teen books ka fake/dummy data

// ------------------------------------------
// STEP 3: RESOLVERS — "logic" jo batata hai HAR query ka jawab kaise nikalna hai
// ------------------------------------------
const resolvers = {
  Query: {
    // ^ Query ke andar har function schema ke 'Query' type ke fields se match karta hai

    books: () => books,
    // ^ jab client 'books' maange, to poora array return kar do

    bookByTitle: (parent, args) => {
      // ^ 'args' mein wo values aati hain jo client ne query ke saath bheji
      // jaise: bookByTitle(title: "Sapiens") → args.title = "Sapiens"

      return books.find((book) => book.title === args.title);
      // ^ array mein dhoondo jiska title match ho, wahi ek book return karo
    },
  },
};

// ------------------------------------------
// STEP 4: SERVER — sab kuch jod ke server start karna
// ------------------------------------------
const server = new ApolloServer({ typeDefs, resolvers });
// ^ schema aur resolvers dono Apollo ko de diye — ye engine ban gaya

startStandaloneServer(server, {
  listen: { port: 4000 },
  // ^ server ko port 4000 pe sunna shuru karwaya
}).then(({ url }) => {
  console.log(`GraphQL server chal raha hai: ${url}`);
  // ^ jab server start ho jaaye, uska URL print karo
});

// ==========================================
// CHALANE KA TAREEKA:
//   node server.js
// Phir browser mein kholo: http://localhost:4000
// (Apollo ka "Sandbox" UI khulega — usme query likh ke test kar sakte ho)
// ==========================================
