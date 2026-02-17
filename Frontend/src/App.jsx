import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import ExpenseTracker from "./Pages/ExpenseTracker";
import ListItem from "./Pages/ListItem";
import UpdateCard from "./Components/UpdateCard";
import CreateExpenditure from "./Pages/CreateExpenditure";
import ExpenseChart from "./Components/ExpenseChart";
import UpdateExpenditure from "./Components/UpdateExpendeCard";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/listItem" element={<ListItem />} />
        <Route path="/updateItem/:id" element={<UpdateCard />} />
        <Route path="/createExpenditure" element={<CreateExpenditure />} />
        <Route path="/updateExpenditure/:id" element={<UpdateExpenditure/>}/>
        <Route path="/expenseTracker" element={<ExpenseTracker />} />
      </Routes>
    </div>
  );
}

export default App;
