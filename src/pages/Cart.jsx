import { Link } from "react-router-dom";

function Cart() {
    return (
        <div className="container mt-4">
            <h2>Cart</h2>
            <p>This will display cart items...</p>
            <Link to="/" className="btn btn-secondary">Back to Home</Link>
        </div>
    );
}

export default Cart;
