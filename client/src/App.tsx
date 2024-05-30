import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import ScreenLoader from './components/ScreenLoader'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
      <ScreenLoader />
      <Toaster position="top-center" />
    </Fragment>
  )
}

export default App
