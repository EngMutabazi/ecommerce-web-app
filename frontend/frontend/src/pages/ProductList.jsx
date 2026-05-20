import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(()=>{
        fetch(`${BASEURL}/api/products/`)
        .then((res)=>{
            if(!res.ok){
                throw new Error("Failed to fetch products");
            }
            return res.json();
        })
        .then((data)=>{
            setProducts(data);
            setLoading(false);
        })
        .catch((e)=>{
            setError(e.message);
            setLoading(false);
        });

    }, []);
    if (loading){
        return <div>Loading...</div>;
    }
    if (error){
        return <div>Error: {error}</div>;
    }

    return(
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-center py-8 bg-white shadow-md">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {products.length > 0 ? (
                    products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })
                ) : (
                    <p className="text-center col-span-full">No Product Available.</p>
                )}
            </div>
        </div>
    )




}

export default ProductList;