import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function Header() {
  return (
    <header className="p-3 py-6 shadow-lg flex justify-between items-center">
      <div className="logo">
        <p className="text-4xl font-bold">Library</p>
      </div>
      <div className="flex gap-8 items-center">
      <nav>
        <ul className="flex gap-3 text font-semibold" >
            <li className=""><Link to={"/"}>Home</Link></li>
            <li className=""><Link to={"/store"}>Store</Link></li>
            <li className=""><Link to={"/about"}>About</Link></li>
        </ul>
      </nav>
        <div className="font-semibold capitalize">
            <Link to={'/login'} className="inline-block text-[26px] "><FaSignInAlt/></Link>
            <Link to={'/register'} className="bg-black text-white py-1 px-2 rounded-xl ml-3">signUp</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
