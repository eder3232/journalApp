import { Dispatch } from '@reduxjs/toolkit'
import {
  doc,
  collection,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore/lite'
import { INote } from '../../../mainApp/types/types'

import { firebaseDB } from '../../firebase/config'
import { RootState } from '../store'
import { fileUpload } from './helpers/fileUpload'
import { loadNotes } from './helpers/loadNotes'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './mainAppSlice'

export const startNewNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote: INote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
    }

    // const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`))

    // const setDocResp = await setDoc(newDoc, newNote)
    const docRef = await addDoc(
      collection(firebaseDB, `${uid}/journal/notes`),
      newNote
    )

    newNote.id = docRef.id
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('uid not found')

    const loadedNotes = await loadNotes(uid)
    dispatch(setNotes(loadedNotes))
  }
}

export const startSaveNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setSaving)
    const { uid } = getState().auth
    const { active } = getState().mainApp
    if (!active) return
    if (!uid) throw new Error('uid not found')

    const noteToSave = {
      ...active,
    }
    delete noteToSave.id

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${active.id}`)

    await setDoc(docRef, noteToSave, { merge: true })

    dispatch(updateNote(active))
  }
}

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setSaving())

    const fileUpLoadPromises: Promise<string>[] = []
    Array.from(files).forEach((file) => {
      fileUpLoadPromises.push(fileUpload(file))
    })

    const photosUrls = await Promise.all(fileUpLoadPromises)

    dispatch(setPhotosToActiveNote(photosUrls))
  }
}

export const startDeleetingNote = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { uid } = getState().auth
    const { active } = getState().mainApp
    if (!active) return
    if (!uid) throw new Error('uid not found')

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${active.id}`)
    await deleteDoc(docRef)

    if (active.id) {
      dispatch(deleteNoteById(active.id))
    }
  }
}
