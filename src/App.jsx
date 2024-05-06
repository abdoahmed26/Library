import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyStore from "./pages/myStore";
import Cart from "./pages/Cart";
import SaveRoute from "./pages/SaveRoute";
import BookDetails from "./pages/BookDetails";
import Footer from "./components/Footer";
import Forbidden from "./pages/Forbidden";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forbidden" element={<Forbidden />} />
        <Route element={<SaveRoute />}>
          <Route path="store" element={<MyStore />} />
          <Route path="cart" element={<Cart />} />
          <Route path="bookDetails/:id" element={<BookDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
