import { Fragment, Suspense, lazy } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScreenLoader from './components/ScreenLoader'
import { Toaster } from 'react-hot-toast'
import LazyLoader from './components/LazyLoader'
import AdminProtectedRoute from './components/AdminProtectedRoute'

const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const MenuListPage = lazy(() => import("./pages/admin/MenuListPage"));
const CreateUpdateMenuPage = lazy(() => import("./pages/admin/CreateUpdateMenuPage"));

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
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoader />}>
                  <MenuPage />
              </Suspense>
            }
          />
          <Route
            path="/menuList"
            element={
              <Suspense fallback={<LazyLoader />}>
                <AdminProtectedRoute>
                  <MenuListPage />
                </AdminProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/createMenu"
            element={
              <Suspense fallback={<LazyLoader />}>
                <AdminProtectedRoute>
                  <CreateUpdateMenuPage />
                </AdminProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/updateMenu/:id"
            element={
              <Suspense fallback={<LazyLoader />}>
                <AdminProtectedRoute>
                  <CreateUpdateMenuPage />
                </AdminProtectedRoute>
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
