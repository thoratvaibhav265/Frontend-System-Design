# GraphQL Book Library — Learning Project

Ek chhota GraphQL server jo Apollo Server aur Node.js use karke banaya gaya hai. Ye project GraphQL ke core concepts (schema, resolvers, queries) samajhne ke liye banaya gaya hai.

## Tech Stack
- Node.js
- Apollo Server (`@apollo/server`)
- GraphQL

## Features
- `books` query — saari books ki list deta hai
- `bookByTitle` query — title se specific book dhoondta hai
- Client sirf wahi fields maang sakta hai jo use chahiye (over-fetching nahi hota, REST ke uljat)

## How to Run Locally

```bash
# 1. Repo clone karo
git clone <your-repo-url>
cd graphql-demo

# 2. Dependencies install karo
npm install

# 3. Server start karo
npm start
```

Server `http://localhost:4000` pe chalega. Browser mein khol ke Apollo Sandbox se query test kar sakte ho.

## Example Queries

```graphql
{ books { title author } }

{ bookByTitle(title: "Atomic Habits") { author year } }
```

## What I Learned
- GraphQL schema aur type definitions kaise likhte hain
- Resolvers kaise data return karte hain
- REST vs GraphQL ka farak (fixed response vs client-chosen fields)
