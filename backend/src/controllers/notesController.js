import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    console.log("Error in getAllNodes")
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getNoteById = async (req, res) => {
  try {
    const {id} = req.params;
    const notes = await Note.findById(id)
    res.status(200).json(notes)
  } catch (error) {
    console.log("Error in getting Nodes")
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content })
    await newNote.save();
    res.status(201).json({ message: "user created successfully", notes: newNote })
  } catch (error) {
    console.log("Error in creating Notes")
    res.status(500).json({ message: error.message })
  }
}

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
    if (!updatedNote) return res.status(404).json({ message: "Note not found" })
    res.status(200).json({ message: "Note updated successfully", note: updatedNote })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting notes", error })
  }
}