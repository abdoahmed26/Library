import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyStore from "./pages/myStore";
import Cart from "./pages/Cart";
import SaveRoute from "./pages/SaveRoute";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<SaveRoute />}> 
          <Route path="store" element={<MyStore />} />
          <Route path="cart" element={<Cart />} />
          <Route path="bookDetails/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
