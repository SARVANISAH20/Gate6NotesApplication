
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios.get("http://localhost:5001/notes", { withCredentials: true })
      .then(response => setNotes(response.data))
      .catch(error => {
        console.error("Error fetching notes", error);
        setError("Failed to fetch notes. Please try again.");
      });
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:5001/notes", { title, description }, { withCredentials: true });
      setTitle("");
      setDescription("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note", error);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/notes/${editingNote.id}`, { title, description }, { withCredentials: true });
      setEditingNote(null);
      setTitle("");
      setDescription("");
      fetchNotes();
    } catch (error) {
      alert("You are not authorized to update this note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/notes/${id}`, { withCredentials: true });
      fetchNotes();
    } catch (error) {
      alert("You are not authorized to delete this note.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Notes</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search notes..."
        onChange={(e) => setSearch(e.target.value)}
      />

      
      <div className="card p-3 mb-3">
        <h5>{editingNote ? "Edit Note" : "Add Note"}</h5>
        <form onSubmit={editingNote ? handleUpdate : handleAddNote}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="form-control form-control-lg"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br></br>
          <button className="btn btn-primary">{editingNote ? "Update Note" : "Add Note"}</button>
        </form>
      </div>

      {/* ✅ Notes List as Cards */}
      <div className="row g-4">
        {notes
          .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
          .map((note) => (
            <div key={note.id} className="col-md-4 d-flex">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-light" onClick={() => handleEdit(note)}>Edit</button>
                    <button className="btn btn-dark" onClick={() => handleDelete(note.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
