/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from '@mui/material/Button';

// function pure component render UI only
function NoteWidget({ note, editing, onEditNote, onDeleteNote }) {
  return (
    <article
      key={note.id}
      className={`note-item ${editing ? "note-editing" : ""}`}
    >
      <div className="note-title">
        {note.image && <img src={note.image} style={{ width: 100 }} />}
        {note.title}
      </div>
      <button
        className="note-edit"
        onClick={() => {
          // if (onEditNote) { onEditNote(note) }
          onEditNote?.();
        }}
      >
        ✒️
      </button>

      <button
        className="note-delete"
        onClick={() => {
          onDeleteNote();
        }}
      >
        🗑️
      </button>
    </article>
  );
}

function NoteList() {
  const [noteData, setNoteData] = useState(null);

  const [notes, setNotes] = useState(() => {
    //use localStorage can be new tab same data
    return JSON.parse(localStorage.getItem("notes") ?? "[]");
  });

  const [deletingItem, setDeletingItem] = useState(null);

  return (
    <main>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="app-title">My Note</h1>
        <button
          style={{ width: "auto" }}
          onClick={() => {
            setNoteData({ title: "", content: "" });
          }}
        >
          📝
        </button>
      </div>

      {/* render list note */}
      {notes.length > 0 ? (
        <div className="note-list">
          {notes.map((note) => {
            return (
              // Manage logic here
              <NoteWidget
                key={note.id}
                note={note}
                editing={note.id === noteData?.id}
                onEditNote={() => {
                  setNoteData(note);
                }}
                onDeleteNote={() => {
                  setDeletingItem(note);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-notes">No notes</div>
      )}

      {deletingItem && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">Are you sure?</div>

            <p>
              To delete {deletingItem.title} note, click the submit button below
            </p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  setNotes(notes.filter((item) => item.id !== deletingItem.id));
                  setDeletingItem(null);
                }}
              >
                Submit
              </button>
              <button onClick={() => setDeletingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default NoteList;
