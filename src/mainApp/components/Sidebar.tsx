import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined'
import { Grid } from '@mui/material'
import { useAppSelector } from '../../shared/store/hooks/reduxHooks'
import SidebarItem from './SidebarItem'

interface Props {
  drawerWidth: number
}

const Sidebar = ({ drawerWidth }: Props) => {
  const { displayName } = useAppSelector((state) => state.auth)
  const { notes } = useAppSelector((state) => state.mainApp)
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {displayName}
          </Typography>
        </Toolbar>

        <List>
          {notes.map((note) => (
            <SidebarItem note={note} key={note.id} />
          ))}
        </List>

        <Divider />
      </Drawer>
    </Box>
  )
}

export default Sidebar
