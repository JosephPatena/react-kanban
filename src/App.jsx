import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import CreateProject from './Pages/Project/Create';
import ShowProject from './Pages/Project/Show';
import EditProject from './Pages/Project/Edit';
import Register from './Pages/Auth/Register';
import CreateTask from './Pages/Task/Create';
import Projects from './Pages/Project/Index';
import Kanban from './Pages/Kanban/Index';
import Dashboard from './Pages/Dashboard';
import ShowTask from './Pages/Task/Show';
import Login from './Pages/Auth/Login';
import Tasks from './Pages/Task/Index';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  
  {
    path: '/kanban',
    element: <Kanban />,
  },

  {
    path: '/tasks',
    element: <Tasks />,
  },

  {
    path: '/task-create',
    element: <CreateTask />,
  },
  
  {
    path: '/task-view/:id',
    element: <ShowTask />
  },

  {
    path: '/projects',
    element: <Projects />
  },

  {
    path: '/project-create',
    element: <CreateProject />
  },

  {
    path: '/project-view/:id',
    element: <ShowProject />
  },

  {
    path: '/project-edit/:id',
    element: <EditProject />
  },

  {
    path: '/register',
    element: <Register />
  },
  
  {
    path: '/login',
    element: <Login />
  },

])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App
