import { lazy } from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import AppLayout from '../AppLayout'
import Layout from '../PLAY/RPLAY_layoutCtrl_V00.04/index'
const Login = lazy(() => import('CONS/login'))
const Welcome = lazy(() => import('CONS/welcome'))

const Header = lazy(() => import('BOX/BOX_header'))
const Sidebar = lazy(() => import('BOX/BOX_nav'))

const AuthProvider = lazy(() => import('PLAY/authProvider'))

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to={'/view/smartLab/welcome'} replace />
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'view/smartLab/welcome',
        Component: () => (
          <AuthProvider>
            <Header />
            <Welcome />
          </AuthProvider>
        )
      },
      {
        path: 'view/smartLab/:layoutName/:serviceName/:sheetName?/:id?',

        Component: () => (
          <AuthProvider>
            <div id='panel' className='flex w-full h-full  gap-1'>
              <Layout />
            </div>
          </AuthProvider>
        )
      }
    ]
  }
]

export default createBrowserRouter(routes)
