import { Fragment, Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScreenLoader from './components/ScreenLoader'
import { Toaster } from 'react-hot-toast'
import LazyLoader from './components/LazyLoader'

const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
        <Route
            path="/register"
            element={
              <Suspense fallback={<LazyLoader />}>
                <RegistrationPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LazyLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <ScreenLoader />
      <Toaster position="top-center" />
    </Fragment>
  )
}

export default App
