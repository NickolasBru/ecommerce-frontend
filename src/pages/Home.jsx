import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching products...");

        api.get("/products")
            .then((response) => {
                console.log("API Response:", response);
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to load products");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2>Products</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.product_id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={product.coverImageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <button className="btn btn-success">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
