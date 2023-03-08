import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import JournalPage from '../pages/JournalPage'
import MainApp from '../pages/MainApp'

type Props = {}

const MainRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default MainRoutes
