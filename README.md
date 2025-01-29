# E-Commerce Frontend

This project is the frontend for an E-Commerce application with two user roles: **suppliers** and **customers**. The application allows suppliers to manage products, while customers can browse and purchase them.

---

## Disclaimer
During the implementation of this project, certain parts of the test were omitted due to time constraints and external factors. But following parts were done:

##  Login logic
1. **User logs in** → Receives a token
2. **Token is stored** in `localStorage`
3. **Axios attaches token** to every request automatically
4. **Auto-logout** occurs if the token expires or request fails with `401`

##  Supplier Dashboard
- Fetches products **filtered by supplier ID**
- Uses a **modal form** for adding & editing products
- Displays **error messages under each field** for validation
- Uses **Bootstrap Toast notifications** for success/errors

The provided frontend implementation showcases the thought process and design patterns used to create a scalable system.

---

## Tech Stack
- **React** (Vite)
- **React Router** (for navigation)
- **Bootstrap** (for styling)
- **Axios** (for API communication)
- **Context API** (for global authentication state management)

## Features
### Authentication
- Login system with email & password
- Role-based redirection (**Customer → Customer Dashboard**, **Supplier → Supplier Dashboard**)
- Bearer token authentication using `axios` interceptors
- Auto-logout on token expiration

### Supplier Features
- View a list of their products
- Add new products via a **modal form**
- Edit existing products
- Delete products
- Toast notifications for CRUD operations

### Customer Features (To be implemented)
- Browse available products
- Add products to cart
- Checkout system
- Order history

## Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/NickolasBru/ecommerce-frontend
cd ecommerce-frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm run dev
```
- The app will be available at **http://localhost:5173/**

## API Configuration
Ensure the backend is running at `http://localhost:8080`. If your API base URL is different, update `src/api/axiosConfig.js`:

```javascript
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
```
## Environment Variables (Optional)
In a proper production enviroment a `.env` file would be used to define the url and other configs
```env
VITE_API_BASE_URL=http://your-api-url.com/api/v1
```
Then update `axiosConfig.js`:
```javascript
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## Example API Requests
### **Login Request**
#### Request:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "user_id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "tp_person": 2,
  "token": "1|8adbJHgCvUlmQtReK8z6lZQEGkgZaCRL4IzsE19wb3b9fef5"
}
```

### **Create Product Request**
#### Request:
```json
{
  "name": "New Product Example",
  "description": "This is a sample product.",
  "cover_img_url": "https://example.com/product.jpg",
  "sku": "SP-987654",
  "price": 29.99,
  "stock_quantity": 50,
  "is_active": true,
  "category_id": 2,
  "personsupplier_id": 2
}
```
#### Response:
```json
{
        "product_id": 1,
        "name": "New Product Example",
        "description": "This is a sample product.",
        "cover_img_url": "https://example.com/product.jpg",
        "sku": "SP-987654",
        "price": 29.99,
        "stock_quantity": 50,
        "is_active": true,
        "category_id": 2,
        "personsupplier_id": 2
}
```

## Future Improvements
- Implement customer dashboard with shopping cart
- Add order management for customers
- Improve UI/UX with better styling
- Implement better error handling and loading states
