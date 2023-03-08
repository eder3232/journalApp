import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum EnumStatus {
  'checking' = 'checking',
  'notAuthenticated' = 'notAuthenticated',
  'authenticated' = 'authenticated',
}

interface IAuthState {
  status: EnumStatus
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}

const initialState: IAuthState = {
  status: EnumStatus.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export interface IPayLoadLogin {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface IPayLoadLogout {
  errorMessage: string | null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IPayLoadLogin>) => {
      state.status = EnumStatus.authenticated
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }: PayloadAction<IPayLoadLogout>) => {
      state.status = EnumStatus.notAuthenticated
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = EnumStatus.checking
    },
  },
})

export const { login, logout, checkingCredentials } = authSlice.actions

export default authSlice.reducer
