/*
App > List + Edit + Means
Login
Register


Histoty模式 -- BrowserRouter
Hash模式    -- HashRouter
*/

import App from '../App'
import ListList from '../pages/ListList'
import ListTable from '../pages/ListTable'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const BaseRouter = () =>(
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/listlist' element={<ListList />}></Route>
                <Route path='/listtable' element={<ListTable />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/means' element={<Means />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    </Router>
)


export default BaseRouter

