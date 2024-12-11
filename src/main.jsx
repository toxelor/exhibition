import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { MainPage } from './routes/mainPage/mainPage.jsx';
import { Loading } from './routes/loading/loading.jsx';
import { CreateExhibit } from './routes/createExhibit/createExhibit.jsx';
import { Exhibit } from './routes/exhibit/exhibit.jsx';
import { Profile } from './routes/profile/profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/loading',
    element: <Loading />,
  },
  {
    path: '/create-exhibit',
    element: <CreateExhibit />,
  },
  {
    path: '/exhibit',
    element: <Exhibit />,
    children: [
      {
        element: <Exhibit />,
        path: ':id',
      }
    ]
  },
  {
    path: 'profile',
    element: <Profile />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
