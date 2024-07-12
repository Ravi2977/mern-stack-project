const Note =require("../Modals/note")
const addNotes = async (req, resp) => {
 const {title,body}=req.body;
    const note = await Note.create({
        title,
        body,
    });
    resp.json({ note });
}

const fetchNotes =async (req, resp) => {
    const notes = await Note.find();
    resp.json({
       notes
    })
}
const fetchNotesById =async (req, resp) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    resp.json({
       note
    })
}
const updateNote =async (req, resp) => {
    const id = req.params.id;
   const {title,body}=req.body;

    await Note.findByIdAndUpdate(id, {
        title,
        body
    });
const note = await Note.findById(id);
    resp.json({note})
}
const deleteNoteById=async (req,resp)=>{
    const id =req.params.id;
   const response = await Note.deleteOne({_id:id})
   console.log(response)
   resp.json({"success":"deleted"})
}

module.exports=({
    fetchNotes:fetchNotes,
    addNote:addNotes,
    deleteNotesById:deleteNoteById,
    updateNote:updateNote,
    fetchNoteById:fetchNotesById
})