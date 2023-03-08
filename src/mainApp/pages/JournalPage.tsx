import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import JournalLayout from '../layout/JournalLayout'
import NoteView from '../views/NoteView'
import NothingSelectedView from '../views/NothingSelectedView'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/hooks/reduxHooks'
import { startNewNote } from '../../shared/store/mainApp/thunks'

interface Props {}

const JournalPage = (props: Props) => {
  const dispatch = useAppDispatch()

  const { isSaving, active } = useAppSelector((state) => state.mainApp)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      {/* <NothingSelectedView /> */}

      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        sx={{
          color: 'primary.main',
          backgroundColor: 'secondary.main',
          ':hover': {
            backgroundColor: 'primary.main',
            color: 'secondary.main',
            opacity: 0.9,
          },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        disabled={isSaving}
        onClick={onClickNewNote}
      >
        <AddOutlinedIcon sx={{ fontSize: 30 }} />
      </IconButton>
      {/* <NoteView /> */}
    </JournalLayout>
  )
}

export default JournalPage
