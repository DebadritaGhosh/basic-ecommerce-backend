**Project Name: Basic E-commerce API**

---

### Introduction

Welcome to the Basic E-commerce API! This API is built using Node.js, Express, Prisma, Postgres and TypeScript. It aims to provide a simple yet powerful solution for managing e-commerce functionalities.

### Project Setup

Before you begin, make sure you have Node.js installed on your machine. Then, follow these steps to set up the project:

1. Clone the repository: `git clone https://github.com/DebadritaGhosh/basic-ecommerce-backend`
2. Navigate to the project directory: `cd basic-ecommerce-backend`
3. Install dependencies: `npm install`
4. Set up your environment variables by creating a `.env` file and filling in the necessary details. I have already added a `.env.example` file check that out and replace the values.
5. Run the migration to create your database schema: `npx prisma migrate dev`
6. Start the server: `npm run dev`
7. You're ready to explore the API!

### API Routes and Endpoints

#### Authentication

- **POST /api/auth/signup**
  - Description: Register a new user.
  - Request Body:
    ```json
    {
      "name": "example",
      "email": "example@example.com",
      "password": "password123"
    }
    ```

- **POST /api/auth/login**
  - Description: Log in as an existing user.
  - Request Body:
    ```json
    {
      "email": "example@example.com",
      "password": "password123"
    }
    ```

#### Products

#### Cart

#### Admin



## Acknowledgments 🙏

- Shoutout to Evoqys ( https://youtu.be/qrSE1MCPvuU?si=CT3N81jXWkjMmoLh )


---

Explore the API endpoints and start building your basic e-commerce applications with ease! If you have any questions or feedback, feel free to reach out. Happy coding! 🚀
