import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getProductsBySupplier, createProduct, updateProduct, deleteProduct } from "../api/productService";
import { getCategories } from "../api/categoryService";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

function SupplierDashboard() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const [productData, setProductData] = useState({
        product_id: null,
        name: "",
        description: "",
        cover_img_url: "",
        sku: "",
        price: "",
        stock_quantity: "",
        is_active: true,
        category_id: "",
        personsupplier_id: user?.personsupplier_id || 0,
    });

    useEffect(() => {
        if (!user || !user.personsupplier_id) return;
        fetchProducts(user.personsupplier_id);
        fetchCategories();
    }, [user]);

    const fetchProducts = async (supplierId) => {
        try {
            const data = await getProductsBySupplier(supplierId);
            setProducts(data);
        } catch (err) {
            setError("Failed to load products");
            setToastMessage({ type: "error", text: "Failed to load products." });
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            console.log("Categories fetched:", data);
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load categories", err);
            setCategories([]);
        }
    };


    // Open Modal for Creating a Product
    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setProductData({
            product_id: null,
            name: "",
            description: "",
            cover_img_url: "",
            sku: "",
            price: "",
            stock_quantity: "",
            is_active: true,
            category_id: "",
            personsupplier_id: user.personsupplier_id,
        });
        setShowModal(true);
    };

    // Open Modal for Editing a Product
    const handleOpenEditModal = (product) => {
        setIsEditing(true);
        setProductData(product);
        setShowModal(true);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    // Create or Update Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productPayload = {
                ...productData,
                personsupplier_id: user.personsupplier_id,
            };

            if (isEditing) {
                await updateProduct(productData.product_id, productPayload);
                setToastMessage({ type: "success", text: "Product updated successfully!" });
            } else {
                await createProduct(productPayload);
                setToastMessage({ type: "success", text: "Product created successfully!" });
            }

            setShowModal(false);
            setValidationErrors({});
            fetchProducts(user.personsupplier_id);
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setValidationErrors(err.response.data.errors);
            } else {
                setToastMessage({ type: "error", text: `Failed to ${isEditing ? "update" : "create"} product.` });
            }
        }
    };

    // ✅ Delete a product
    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(productId);
                setToastMessage({ type: "success", text: "Product deleted successfully!" });
                fetchProducts(user.personsupplier_id);
            } catch (err) {
                setToastMessage({ type: "error", text: "Failed to delete product." });
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Supplier Dashboard</h2>
            <p className="lead">Welcome, {user?.name}! Here are your products:</p>

            <Button variant="primary" onClick={handleOpenCreateModal}>
                + Add New Product
            </Button>

            {loading && <p>Loading supplier products...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* ✅ Product List */}
            <div className="row mt-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.product_id} className="col-md-4 mb-3">
                            <div className="card shadow-sm">
                                <img src={product.cover_img_url} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">${Number(product.price).toFixed(2)}</p>
                                    <Button variant="warning" className="me-2" onClick={() => handleOpenEditModal(product)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(product.product_id)}>Delete</Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit Product" : "Add New Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={productData.name} required onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={productData.description} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>SKU</Form.Label>
                            <Form.Control type="text" name="sku" value={productData.sku} required onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Cover Image URL</Form.Label>
                            <Form.Control type="text" name="cover_img_url" value={productData.cover_img_url} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={productData.price} step="0.01" required onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control type="number" name="stock_quantity" value={productData.stock_quantity} required onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select name="category_id" value={productData.category_id} onChange={handleInputChange} required>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            {isEditing ? "Update Product" : "Save Product"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* ✅ Toast Notification */}
            <ToastContainer position="top-end" className="p-3">
                {toastMessage && (
                    <Toast
                        onClose={() => setToastMessage(null)}
                        show={true}
                        delay={3000}
                        autohide
                        bg={toastMessage.type === "success" ? "success" : "danger"}
                    >
                        <Toast.Body className="text-white">{toastMessage.text}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>


        </div>
    );
}

export default SupplierDashboard;
