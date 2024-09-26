import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Route } from 'react-router-dom'
import Tree from './Components/Tree/Tree.jsx'

const router = createBrowserRouter(
    createRoot(
        <Route>
            <Route path='' element = {<Tree/>} />


        </Route>
    )
)


createRoot(document.getElementById('root')).render(
    <App />
)
