import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Game from './routes/game'
import './index.css'

import Root from './routes/root'
import GameOver from './routes/game-over'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/game-over",
    element: <GameOver />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)
