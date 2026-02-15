import Navbar from "./Components/Navbar"
import {Route,Routes} from "react-router-dom"
import ProductList from "./Pages/ProductList"
import ExpenseTracker from "./Pages/ExpenseTracker"
import ListItem from "./Pages/ListItem"

function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/expenseTracker' element={<ExpenseTracker/>}/>
        <Route path='/listItem' element={<ListItem/>}/>
      </Routes>
    </div>
  )
}

export default App
