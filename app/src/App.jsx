// App.jsx
import Register from './Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import CreatePoll from './CreatePoll';
import Details from './Details';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },  // ✅ updated
    { path: '/create', element: <CreatePoll /> },
    { path: '/poll/:id', element: <Details /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
