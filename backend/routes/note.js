const express =require('express')
const router=express.Router();
const Notes = require ('../models/Note')
const { body, validationResult } = require('express-validator');


const fetchuser = require('../midleware/fetchuser');
const Note = require('../models/Note');

     //routh=1 get all notes get   "/api/notes/fetchalluser"login required

router.get('/fetchallnote',fetchuser,async(req,res)=>{
  try {
    const notes = await Notes.find({user:req.user.id})
     
    res.json(notes)
  } catch (error) 
  { console.log(error.message)
    res.status(500).send(" internal server error ")}

   
})
    
     //routh=2 add new notes notes post  "/api/notes/newuser" loggin required
     router.post('/addnewnote',fetchuser,
     [ body('title','Enter a valid title').isLength({ min: 3 }),
     body('description','description must be at least 5 character').isLength({ min: 5 }),] , async(req,res)=>{
     
        try {
          const {title,description,tag}= req.body;
         
      //  error bad request soccur to responed 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() })}

          const note = new Note({
           title ,description,tag,user:req.user.id
          })
         const savednotes=await note.save()
         
        res.json(savednotes)
      }  catch (error) 
      { console.log(error.message)
        res.status(500).send(" internal server error ")}
    })

     //routh=3   update notes  put  "/api/notes/updatenote" loggin required

     router.put('/updatenote/:id',fetchuser,
       async(req,res)=>{
          const {title,description,tag}=req.body;
          try {
          const Newnote={}
          if(title){Newnote.title=title}
          if(description){Newnote.description=description}
          if(tag){Newnote.tag=tag}

          // updating and update note 
          let note = await  Note.findById(req.params.id)
          if(!note){res.status(404).send('not found')}

        if(note.user.toString() !==req.user.id){return res.status(401).send('not allowed')}

        note =await Note.findByIdAndUpdate(req.params.id,{$set:Newnote},{new:true})
        res.json({note})
      } catch (error) {
        console.log(error.message)
        res.status(500).send(" internal server error ")
      }
 

       })

        //routh=4  delete notes delet   "/api/notes/delete" loggin required

     router.delete('/deletenote/:id',fetchuser,
     async(req,res)=>{
      try {
        // delete and delete note 
        let note = await  Note.findById(req.params.id)
        if(!note){res.status(404).send('not found')}

      if(note.user.toString() !==req.user.id){return res.status(401).send('not allowed')}

      note =await Note.findByIdAndDelete(req.params.id)
      res.json({"success":"note has been deleted"})
    } catch (error) {
      console.log(error.message)
      res.status(500).send(" internal server error ")
    }
     

     })
 

module.exports=router