import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const [formNote, addNoteFun] = useState({ title: "", note: "" });
  const [arrObj, arrInsertFun] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Added state for editing
  const [currentId, setCurrentId] = useState(null); // Added state to store current editing note ID

  const formSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // If editing, update the existing note
      arrInsertFun((prevData) =>
        prevData.map((note) =>
          note.id === currentId
            ? { ...note, title: formNote.title, note: formNote.note }
            : note
        )
      );
      setIsEditing(false); // Reset editing state
      setCurrentId(null); // Reset current editing note ID
    } else {
      // If not editing, add a new note
      const noteStru = {
        id: uuid(),
        title: formNote.title,
        note: formNote.note,
      };
      arrInsertFun((prevData) => [...prevData, noteStru]);
    }

    addNoteFun({ title: "", note: "" }); // Clear form
  };

  const editNote = (id) => {
    // Function to edit a note
    const noteToEdit = arrObj.find((note) => note.id === id);
    addNoteFun({ title: noteToEdit.title, note: noteToEdit.note });
    setIsEditing(true); // Set editing state to true
    setCurrentId(id); // Set current editing note ID
  };

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="Your Title"
          value={formNote.title}
          onChange={(e) => {
            addNoteFun({ ...formNote, title: e.target.value });
          }}
        />
        <input
          type="Text"
          placeholder="your One line Memo"
          value={formNote.note}
          onChange={(e) => {
            addNoteFun({ ...formNote, note: e.target.value });
          }}
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>{" "}
        {/* Change button text based on editing state */}
      </form>

      <div className="noteContainer">
        {arrObj.map((mapProp) => (
          <div key={mapProp.id}>
            <p>{mapProp.title} </p>
            <p>{mapProp.note} </p>
            <button type="button" onClick={() => editNote(mapProp.id)}>
              {" "}
              {/* Edit button calls editNote */}
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
