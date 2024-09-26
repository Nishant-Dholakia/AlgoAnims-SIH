import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Tree from './Components/Tree/Tree.jsx'
import Inorder from './Components/Travel/Inorder/Inorder.jsx';
import Postorder from './Components/Travel/Postorder/Postorder.jsx';
import Preorder from './Components/Travel/Preorder/Preorder.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path=''element={<App/>}>
            <Route path='/' element = {<Tree/>} />
            <Route path='/preorder' element = {<Preorder/>} />
            <Route path='/inorder' element = {<Inorder/>} />
            <Route path='/postorder' element = {<Postorder/>} />
        </Route>
    )
)


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
