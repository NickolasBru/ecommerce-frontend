import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api/axiosInstance.js";
import { Card, Button, Container, Row, Col, Spinner, Toast, ToastContainer } from "react-bootstrap";

function CustomerDashboard() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]); // ✅ Cart State
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data.data ?? response.data); // Ensure array format
        } catch (err) {
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add to Cart Function
    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setToastMessage({ type: "success", text: `${product.name} added to cart!` });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Available Products</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <p className="text-danger text-center">{error}</p>}

            <Row className="mt-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product.product_id} md={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img variant="top" src={product.cover_img_url} alt={product.name} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>${Number(product.price).toFixed(2)}</Card.Text>
                                    <Button variant="success" className="ms-2" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center">No products available.</p>
                )}
            </Row>

            {/* ✅ Toast Notification */}
            <ToastContainer position="top-end" className="p-3">
                {toastMessage && (
                    <Toast onClose={() => setToastMessage(null)} show={true} delay={3000} autohide bg={toastMessage.type === "success" ? "success" : "danger"}>
                        <Toast.Body className="text-white">{toastMessage.text}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
        </Container>
    );
}

export default CustomerDashboard;
