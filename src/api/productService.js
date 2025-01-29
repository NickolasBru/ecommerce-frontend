import api from "./axiosInstance";

// Fetch all products for a supplier
export const getProductsBySupplier = async (supplierId) => {
    try {
        const response = await api.get(`/products?supplier_id=${supplierId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


//Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await api.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

//Update a product
export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await api.put(`/products/${productId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

//Delete a product
export const deleteProduct = async (productId) => {
    try {
        await api.delete(`/products/${productId}`);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
