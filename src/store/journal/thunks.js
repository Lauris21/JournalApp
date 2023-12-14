import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getSate) => {
    dispatch(savingNewNote());

    const { uid } = getSate().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `i${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getSate) => {
    const { uid } = getSate().auth;
    console.log(uid);
    if (!uid) throw new Error("UID hasn`t been found");
  };
};
