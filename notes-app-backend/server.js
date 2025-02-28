const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();
const PORT = 5001;
const SECRET_KEY = "a3f1e4b0c2d5e6f7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3";

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));

const usersFile = "users.json";
const notesFile = "notes.json";

const readJSONFile = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
};

const writeJSONFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  let users = readJSONFile(usersFile);

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  writeJSONFile(usersFile, users);

  res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let users = readJSONFile(usersFile);

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  req.session.user = username;
  res.json({ message: "Login successful", user: { username } });
});

app.get("/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

app.get("/notes", isAuthenticated, (req, res) => {
  let notes = readJSONFile(notesFile);
  const userNotes = notes.filter(note => note.username === req.session.user);
  res.json(userNotes);
});

app.post("/notes", isAuthenticated, (req, res) => {
  const { title, description } = req.body;
  let notes = readJSONFile(notesFile);

  const newNote = {
    id: Date.now(),
    username: req.session.user,
    title,
    description,
  };

  notes.push(newNote);
  writeJSONFile(notesFile, notes);

  res.json(newNote);
});

app.put("/notes/:id", isAuthenticated, (req, res) => {
  let notes = readJSONFile(notesFile);
  const { id } = req.params;
  const { title, description } = req.body;

  let noteFound = false;

  notes = notes.map((note) => {
    if (note.id == id && note.username === req.session.user) {
      noteFound = true;
      return { ...note, title, description };
    }
    return note;
  });

  if (!noteFound) {
    return res.status(403).json({ message: "Unauthorized: Note not found or not yours" });
  }

  writeJSONFile(notesFile, notes);
  res.json({ message: "Note updated successfully" });
});

app.delete("/notes/:id", isAuthenticated, (req, res) => {
  let notes = readJSONFile(notesFile);
  const { id } = req.params;

  const filteredNotes = notes.filter((note) => !(note.id == id && note.username === req.session.user));

  if (filteredNotes.length === notes.length) {
    return res.status(403).json({ message: "Unauthorized: Note not found or not yours" });
  }

  writeJSONFile(notesFile, filteredNotes);
  res.json({ message: "Note deleted successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
