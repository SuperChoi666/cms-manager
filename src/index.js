import ReactDOM from "react-dom"
import Router from './router'
import {createRoot} from "react-dom/client"
// ReactDOM.render(
//     <Router />
//     ,
//     document.getElementById('root')
// )
createRoot(document.getElementById('root')).render(<Router/>)