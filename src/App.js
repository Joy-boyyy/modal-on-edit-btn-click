import { useState } from "react";
import { v4 as uuid } from "uuid";
import PopModal from "./components/Popupmodal";
import "./App.css";

function App() {
  // below is for hold input of user who gives title and note
  const [formNote, addNoteFun] = useState({ title: "", note: "" });

  // below is for hold all data array of object
  const [arrObj, arrInsertFun] = useState([]);

  // below is for hold old input of user which he want to update title and note
  // using isTrue to toggle modal
  //using _id to store that id of card which we want to modify

  const [isEdit, toEditFun] = useState({
    isTrue: false,
    oldTitle: "",
    oldMemo: "",
    _id: 0,
  });

  // below function will run when a user will click on edit button which takes id of that card which we want to edit
  // also holding old Title and Note text so that which we could pass to other component
  // so that which could access old text

  const toEdit = (gotTitle, gotNote, gotId) => {
    toEditFun({
      isTrue: true,
      oldTitle: gotTitle,
      oldMemo: gotNote,
      _id: gotId,
    });
  };

  // this is a form form sumission function which create a structure of card
  const formSubmit = (e) => {
    e.preventDefault();

    const noteStru = {
      id: uuid(),
      title: formNote.title,
      note: formNote.note,
    };

    arrInsertFun((prevData) => [...prevData, noteStru]);
    addNoteFun({ title: "", note: "" });
  };

  // this is very important function here we perform modifying old Note and Title with new one.
  // note: as we all know using map fucntion we can modify all old data with new one but also
  // we can modify single data on condition
  // and we can avoid rest of data to be modified
  // to modify old array of object of selcted data we used State object of function
  // and used condition to fetch only that particular data which we wanted to modify
  // and when id is not matching then returning that data to map array which it will return.

  const editedNote = (formNoteNew) => {
    arrInsertFun((arrInsertFun) => {
      return arrInsertFun.map((mapProp) => {
        return mapProp.id === formNoteNew.id
          ? { ...mapProp, title: formNoteNew.title, note: formNoteNew.note }
          : mapProp;
      });
    });
  };

  console.log("arr obj old vs new Value", arrObj);

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
        <button type="submit">Add</button>
      </form>

      {/* -------------------modal div */}
      <div>
        {isEdit.isTrue && (
          <PopModal
            userFst={isEdit}
            editedNote={editedNote}
            onClose={() => {
              toEditFun({ ...isEdit, isTrue: false });
            }}
          />
        )}
      </div>

      {/* -------------------all notes starts */}

      <div className="noteContainer">
        {arrObj.map((mapProp) => (
          <div key={mapProp.id}>
            <p>{mapProp.title} </p>
            <p>{mapProp.note} </p>
            <button
              type="button"
              onClick={() => {
                toEdit(mapProp.title, mapProp.note, mapProp.id);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
