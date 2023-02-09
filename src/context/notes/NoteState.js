import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
    const intialnotes = [];

  const [notes, setNotes] = useState(intialnotes);
   //get notes

    const getnotes = async () => {
     //  Api call
     const response = await fetch(`${host}/api/note/fetchallnote`, {
       method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
       }
     });
      const json = await response.json();
        setNotes( json);
    };

   // Add notes

   const addnote = async (title, description, tag) =>{
     //  Api call
     const response = await fetch(`${host}/api/note/addnewnote`,{
       method: "POST",
       headers: {
         "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
       },
       body: JSON.stringify({ title, description, tag }),
     });
       const note= await response.json();
       setNotes(notes.concat(note));
       
   };

   //delete notes
   const deletenote =async (id) => {
     const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
       headers: {
        "Content-Type": "application/json",
         "auth-token":  localStorage.getItem('token')
         
       },
      });
      const json = response.json();
      console.log(json)
     const newNote = notes.filter((note) => {
       return note._id !== id;
     });
     setNotes(newNote);
   };

  //edit notes
   const editnote = async (id, title, description, tag) => {
     //  Api call
     const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
       headers: {
        "Content-Type": "application/json",
         "auth-token": localStorage.getItem('token')
       },
       body: JSON.stringify({ title, description, tag }),
     });
      const json = await response.json();
      console.log(json)
     let newnotes=JSON.parse(JSON.stringify(notes))
     for (let index = 0; index <newnotes.length; index++) {
       const element = newnotes[index];
       if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
       }
      
    }
    setNotes(newnotes)
   };

  return (
    <NoteContext.Provider value={{ notes,getnotes,addnote,deletenote,editnote  }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
