import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INote } from '../../../mainApp/types/types'

interface IMainState {
  isSaving: boolean
  messageSaved: string
  notes: INote[]
  active: INote | null
}

const initialState: IMainState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
  // active: {
  //   id: 'ABC123',
  //   title: '',
  //   body: '',
  //   date: 123,
  //   imageUrls: [],
  // },
} //satisfies IMainState

export const mainApp = createSlice({
  name: 'mainApp',
  initialState: initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action: PayloadAction<INote>) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action: PayloadAction<INote[]>) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })

      state.messageSaved = `${action.payload.title}, actualizada correctamente.}`
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.active = null
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
      if (state.active) {
        if (state.active.imageUrls == undefined) {
          state.active.imageUrls = []
        }
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      }
      state.isSaving = false
    },
    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },
  },
})

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  setPhotosToActiveNote,
  updateNote,
} = mainApp.actions

export default mainApp.reducer
