import { Link , useNavigate} from "react-router-dom";
import { useCart } from "../context/CartContext";
import {clearToken, getAccessToken} from '../utils/auth.js'

function Navbar(){

   const { cartItems } = useCart();
   const navigate = useNavigate();
   const isLoggedIn = !!getAccessToken();
   const handleLogout = ()=>{
      clearToken();
      navigate('/login');
   }

   const cartCount = (cartItems || []).reduce(

      (total, item) => total + item.quantity,

      0
   );

   return(

      <nav className="bg-white shadow-md p-4 flex justify-between items-center">

         <Link
            to="/"
            className="text-2xl font-bold text-gray-800"
         >
            STORE
         </Link>
         <div className="flex items-center gap-6">
            {/** Login/Signup or Logout */}
            {!isLoggedIn ?(
               <>
               <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">
                  Login
               </Link>
               <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
                  Signup
               </Link>
               </>

            ):(<button onClick={handleLogout} className="text-gray-800 hover:text-gray-600">
                  Logout
               </button>)}

         </div>

         <Link
            to="/cart"
            className="relative text-gray-800 hover:text-gray-600 font-medium"
         >

            Cart

            {cartCount > 0 && (

               <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-2 text-sm">

                  {cartCount}

               </span>
            )}

         </Link>

      </nav>
   );
}

export default Navbar;