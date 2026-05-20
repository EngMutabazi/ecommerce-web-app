import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  console.log("Cart Items:", cartItems);

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center pt-8">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex item-center gap4">
                {item.product.image && (
                  <img
                  src={`${BASEURL}${item.product.BASEURLimage}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.product.name}
                </h2>
                <p className="text-gray-600">${item.product.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-800 text-right mb-4">
              Total: ${total.toFixed(2)}
            </h3>
            <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover-blue-700 transition duration-300">
               Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;