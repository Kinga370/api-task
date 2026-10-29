# Task API (Express + MySQL + MVC)

A complete REST API for managing a task list, connected to an Aiven Cloud MySQL database. It uses the Model-View-Controller (MVC) architecture and includes a frontend client.

## 📁 Project Structure

```text
task-api/
├── database/
│   └── schema.sql           # SQL script to create and seed the tasks table
├── frontend/                # The web client (HTML/CSS/JS)
│   ├── index.html
│   ├── script.js
│   └── style.css
├── node_modules/            # (Generated) Installed dependencies
├── src/                     # Backend Source Code
│   ├── controllers/
│   │   └── taskcontrollers.js # HTTP logic (req/res)
│   ├── models/
│   │   └── taskModels.js      # Database queries (SQL)
│   ├── routes/
│   │   └── taskRoute.js       # API Endpoints mapping
│   └── db.js                # MySQL connection pool
├── .env                     # Secrets (DB credentials) - DO NOT COMMIT
├── .env.example             # Template for environment variables
├── .gitignore
├── package.json
├── README.md
├── server.js                # Main entry point (Express app)
└── test-db.js               # Script to test database connection