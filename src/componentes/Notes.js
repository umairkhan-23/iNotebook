import { useContext, useRef,useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Notesitem from "../componentes/Notesitem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useHistory();
  const { notes, getnotes ,editnote} = context;

  useEffect(() => {
    if(localStorage.getItem('token')){ 
    getnotes();}
    else{
      history.push('/login')

    }
    // eslint-disable-next-line
  }, []);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({ id:currentNote._id, etitle:currentNote.title , edescription:currentNote.description ,etag:currentNote.tag})

  };
  const ref = useRef(null);
  const refclose = useRef(null)
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})



  const handleclick=(e)=>{
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    props.showAlert('Update successfully','success')


    e.preventDefault()
    // addnote(note.title,note.description,note.tag);
 }

 const onChange=(e)=>{
   setNote({...note,[e.target.name]:e.target.value})
 }

  return (
    <>
      <AddNote  showAlert={props.showAlert} />
      <button
       ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              value={note.etitle}
            onChange={onChange}
            minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
            onChange={onChange}
            minLength={5} required/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
            onChange={onChange}
            />
          </div>
        </form>
        </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button   disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick}   type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Your Notes </h2>
        <div className="container mx-3">
        {notes.length===0 && '  No Notes To Display '}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem key={note._id} updatenote={updatenote} showAlert={props.showAlert}  note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
