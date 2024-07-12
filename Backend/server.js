if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}else{
    require("dotenv").config(); 
}

const express = require("express");
const connectToDb = require("./config/connectToDB");
const Note = require("./Modals/note");
const notesController = require("./Controllers/notesController")
const transactionController =require("./Controllers/TransactionController")
const cors =require("cors")
connectToDb();

const app = express();

// Use express.json() middleware correctly
app.use(express.json());
app.use(cors());
// app.post("/addTransaction",transactionController.addTransaction);
app.get("/transaction",transactionController.fetchTransaction)
app.get("/trans/:id",transactionController.fetchById)
app.delete("/transaction/:id",transactionController.deleteById)
app.post('/notes',notesController.addNote);
app.get("/notes", notesController.fetchNotes)

app.get("/notes/:id",notesController.fetchNoteById )
app.put("/notes/:id",notesController.updateNote )

app.delete("/delete/:id",notesController.deleteNotesById)
// Listen on port specified in environment variables or use default port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
