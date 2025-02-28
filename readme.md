# Notes App (React.js + Node.js + Express.js)

# Project Overview

This is a full-stack Notes App built using React.js(Frontend) and Node.js with Express.js(Backend). 
Users can:

- Signup & Login (Session-based authentication)
- Add, Edit, Delete Notes
- Search Notes
- View only their own notes(User-specific data)

# How to Run the Project Locally

### Clone the Repository

```sh
git clone https://github.com/SARVANISAH20/Gate6NotesApplication.git
cd Gate6NotesApplication
```

### Backend Setup (Node.js & Express.js)

#### Navigate to the backend folder:

```sh
cd notes-app-backend
```

#### Install dependencies:

```sh
npm install
```

#### Start the backend server:

```sh
node server.js
```

Backend will run on:** `http://localhost:5001`


### Frontend Setup (React.js + Bootstrap)

#### Navigate to the frontend folder:

```sh
cd ../notes-app-frontend
```

#### Install dependencies:

```sh
npm install
```

#### Start the React development server:

```sh
npm start
```

Frontend will run on:** `http://localhost:3000`

---

##  API Documentation

###  Authentication APIs**

#### Signup User**

**Endpoint:** `POST /signup`

```json
{
  "username": "sarvani",
  "password": "sarvani"
}
```

## Response:

```json
{
  "message": "Signup successful"
}
```

#### Login User

**Endpoint:** `POST /login`

```json
{
  "username": "sarvani",
  "password": "sarvani"
}
```

## Response:

```json
{
  "message": "Login successful",
  "user": { "username": "sarvani" }
}
```

#### Logout User

**Endpoint:** `POST /logout` 

## Response:

```json
{
  "message": "Logged out successfully"
}
```

#### Check User Authentication**

**Endpoint:** `GET /check-auth` 

## Response:

```json
{
  "isAuthenticated": true,
  "user": "sarvani"
}
```

### Notes APIs(Protected: Requires Login)

#### Get Notes (User-Specific)

**Endpoint:** `GET /notes` 

## Response:

```json
[
  {
    "id": 1700000000000,
    "username": "sarvani",
    "title": "Meeting Notes",
    "description": "Discuss project updates."
  }
]
```

#### Add Note

**Endpoint:** `POST /notes`

```json
{
  "title": "Shopping List",
  "description": "Buy milk, eggs, and bread."
}
```

## Response:

```json
{
  "id": 1700000000001,
  "username": "sarvani",
  "title": "Shopping List",
  "description": "Buy milk, eggs, and bread."
}
```

#### Edit Note

**Endpoint:** `PUT /notes/:id`

```json
{
  "title": "Updated Meeting Notes",
  "description": "Discuss project deadlines."
}
```

## Response:

```json
{
  "message": "Note updated successfully"
}
```

#### Delete Note

**Endpoint:** `DELETE /notes/:id` 

## Response:

```json
{
  "message": "Note deleted successfully"
}
```

## Tech Stack Used

- Frontend: React.js, Bootstrap
- Backend: Node.js, Express.js
- Authentication: Session-based authentication
- Data Storage: JSON file

## Future Enhancements

-  Database Integration (MongoDB/PostgreSQL)
-  User Profile & Settings
-  Dark Mode UI



