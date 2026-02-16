import Navbar from "./Components/Navbar"
import {Route,Routes} from "react-router-dom"
import ProductList from "./Pages/ProductList"
import ExpenseTracker from "./Pages/ExpenseTracker"
import ListItem from "./Pages/ListItem"
import UpdateCard from "./Components/UpdateCard"

function App() {
  
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProductList />}/>
        <Route path='/expenseTracker' element={<ExpenseTracker/>}/>
        <Route path='/listItem' element={<ListItem/>}/>
        <Route path='/updateItem/:id' element={<UpdateCard />}/>
      </Routes>
    </div>
  )
}

export default App
