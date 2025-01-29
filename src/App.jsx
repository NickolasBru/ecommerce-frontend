import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar"; // Import Navbar
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";

function App() {
    const { user } = useContext(AuthContext);

    if (user === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <Router>
            <Navbar /> {}
            <Routes>
                <Route path="/" element={
                    user ? (
                        user.tp_person === 1 ? <Navigate to="/customer-dashboard" /> : <Navigate to="/supplier-dashboard" />
                    ) : (
                        <Navigate to="/login" />
                    )
                }/>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/customer-dashboard" element={user ? <CustomerDashboard /> : <Navigate to="/login" />} />
                <Route path="/supplier-dashboard" element={user ? <SupplierDashboard /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
