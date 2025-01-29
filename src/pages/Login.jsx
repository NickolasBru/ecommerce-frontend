import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";
import AuthContext from "../context/AuthContext";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

function Login() {
    const { setUser } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post("/login", credentials);
            const userData = response.data;

            // Store token and user data
            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData); // Update global auth state

            // Redirect based on user role
            if (userData.tp_person === 1) {
                navigate("/customer-dashboard");
            } else if (userData.tp_person === 2) {
                navigate("/supplier-dashboard");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className="p-4 shadow" style={{ width: "350px" }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Welcome Back</h3>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 rounded-pill"
                        >
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
