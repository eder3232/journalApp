import React, { useMemo } from 'react'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined'
import { INote } from '../types/types'
import { useAppDispatch } from '../../shared/store/hooks/reduxHooks'
import { setActiveNote } from '../../shared/store/mainApp/mainAppSlice'

type Props = {
  note: INote
}

const SidebarItem = ({ note }: Props) => {
  const dispatch = useAppDispatch()

  const { title } = note

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title
  }, [title])

  const onClickNote = () => {
    dispatch(setActiveNote(note))
  }

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNotOutlinedIcon />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarItem
