// eslint-disable-next-line import/no-extraneous-dependencies
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { LoginApp } from './components/LoginApp';
import { PageLogin } from './components/PageLogin';
import { PagePasswordForgot } from './components/PagePasswordForgot';
import { PagePasswordCreate } from './components/PagePasswordCreate';

const router = createHashRouter([
  {
    path: '/',
    element: <LoginApp />,
    children: [
      {
        path: '/',
        element: <PageLogin />,
      },
      {
        path: 'recovery-password',
        element: <PagePasswordForgot />,
      },
      {
        path: 'new-password',
        element: <PagePasswordCreate />,
      },
    ],
    errorElement: <h1>Wrong path</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
