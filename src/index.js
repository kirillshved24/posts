import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PostsPage } from './pages/posts/index';
import { Root } from './components/Root/index';
import { DetailPostPage } from './pages/posts/detail';
import { EditPostPage } from './pages/posts/edit';
import { AddPostPage } from './pages/posts/add';
import { AuthPage } from './pages/auth';
import { RegistrationPage } from './pages/registration';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: '/posts/:id',
        element: <DetailPostPage />
      },
      {
        path: '/posts/:id/edit',
        element: <EditPostPage />
      },
      {
        path: '/posts/add',
        element: <AddPostPage />
      },
      {
        path: 'auth',
        element: <AuthPage />
      },
      {
        path: 'registration',
        element: <RegistrationPage />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
