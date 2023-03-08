import { Dispatch } from 'redux'
import {
  IRegisterUserData,
  ILoginWithEmailPasswordData,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle,
  logoutFirebase,
} from '../../firebase/providers'
import { clearNotesLogout } from '../mainApp/mainAppSlice'
// import { clearNotesLogout } from '../journal'
import { checkingCredentials, logout, login } from './authSlice'

export const checkingAuthentication = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage }))

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: IRegisterUserData) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    })

    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage }))

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startLoginWithEmailPassword = ({
  email,
  password,
}: ILoginWithEmailPasswordData) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok)
      return dispatch(logout({ errorMessage: result.errorMessage }))

    dispatch(
      login({
        displayName: result.displayName || '',
        email: result.email || '',
        photoURL: result.photoURL || '',
        uid: result.uid || '',
      })
    )
  }
}

export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase()
    dispatch(clearNotesLogout) //para eliminar las notas, corresponde a otro slice
    dispatch(logout({ errorMessage: 'Logout' }))
  }
}
