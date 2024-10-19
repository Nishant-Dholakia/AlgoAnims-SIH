import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './components/routes/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './store/store.js'


createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
    <RouterProvider router = {Router} />
    </Provider>
)
