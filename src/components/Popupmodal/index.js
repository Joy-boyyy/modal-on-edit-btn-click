import { useState } from "react";
import "./index.css";

const PopModal = ({ editedNote, userFst, onClose }) => {
  const [formNoteNew, addNoteFun] = useState({
    title: userFst.oldTitle,
    note: userFst.oldMemo,
    id: userFst._id,
  });

  const formSubmit = (e) => {
    e.preventDefault();

    editedNote(formNoteNew);

    //----- used close() to close modal, whcich we received from App.js to close Modal

    onClose();
  };

  return (
    <div className="mainPopModelCl">
      <div>
        <button type="button" onClick={onClose}>
          Close Btn
        </button>
      </div>
      <div className="formDiv">
        <form onSubmit={formSubmit}>
          <input
            type="text"
            placeholder="Your Title"
            value={formNoteNew.title}
            onChange={(e) => {
              addNoteFun({ ...formNoteNew, title: e.target.value });
            }}
          />
          <input
            type="Text"
            placeholder="your One line Memo"
            value={formNoteNew.note}
            onChange={(e) => {
              addNoteFun({ ...formNoteNew, note: e.target.value });
            }}
          />
          <button type="submit">Insert New</button>
        </form>
      </div>
    </div>
  );
};

export default PopModal;
