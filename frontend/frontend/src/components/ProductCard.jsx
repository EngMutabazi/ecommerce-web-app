import { Link } from "react-router-dom";
function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-white rounded shadow-md hover:scale-[1.02] transition-transform p-4 cursor-pointer"
    >
      <div className="bg-white p-4 rounded shadow mb-4">
        <img
          src={`${BASEURL}${product.image}`}
          alt={product.name}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-800 font-medium">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;