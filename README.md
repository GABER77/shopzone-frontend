# **ShopZone Frontend**

## **Introduction**

This is the front-end application for **ShopZone**, an e-commerce application for selling shoes. This repository contains the React-based user interface that allows different types of users to interact with the system according to their roles.

This is one part of the full ShopZone system. You can check out the backend part here: [ShopZone Backend](https://github.com/GABER77/shopzone-backend)

## **Technologies Used**

- React – JavaScript library for building component-based interfaces
- React Router – Handles client-side routing and page navigation
- React Context API – State management tool to share data across components
- Tailwind CSS – Utility-first CSS framework for styling
- Axios – Handles HTTP requests to the backend
- Vite – Fast build tool and development server

## **Features**

- Role-based access control for routes and features depending on user role
- Responsive layout and mobile-friendly design
- Product Browsing – Explore all products with search, sorting, filtering, and pagination powered by the backend
- Profile Management – Users can update their photo, name, email, and password via the profile page
- Product Details – View detailed information for each product
- Add to Cart – Add products to a shopping cart for checkout
- Buy Products – Complete checkout through Stripe

## **Seller Dashboard**

- Add Product – Upload product details including multiple images, sizes, category, price, and description
- Manage Products – Control only their own products after ownership verification

## **Admin Dashboard**

- Admins have all seller capabilities, plus:
- Manage All Products – View and control every product listed across the platform
- Manage All Users – View all users, change roles, or ban accounts

## **Authentication & Session Management**

- User authentication is handled via JSON Web Tokens (JWT) stored securely in browser cookies
- The app uses tokens to verify user login and conditionally allow access to user-specific routes and features

## **Screenshots & Previews**

### **Home & Collection Pages**
<img src="https://github.com/user-attachments/assets/fc43c57f-54f6-42cc-bac2-acdb4e2ad1c5" width="800">
<br><br>
<img src="https://github.com/user-attachments/assets/b61cd91f-29d3-432b-9a71-3d9c46f558bd" width="800">

### **Product Page**
<img src="https://github.com/user-attachments/assets/6fad4be8-8f47-479e-8753-a4ae8698cd46" width="800">

### **Admin Dashboard**
<img src="https://github.com/user-attachments/assets/77843fda-674c-4897-b3af-82b297899c43" width="800">
<br><br>
<img src="https://github.com/user-attachments/assets/4cbc9210-0bc7-49cf-9629-c597c5b39e37" width="800">
<br><br>
<img src="https://github.com/user-attachments/assets/6fefa7ee-3d78-4b6e-b5a7-a5d5a88fc779" width="800">

### **Cart & Checkout Pages**
<img src="https://github.com/user-attachments/assets/1beae071-95a6-4134-86e6-c469eb113fed" width="800">
<br><br>
<img src="https://github.com/user-attachments/assets/3f681dc5-48b2-410a-81b2-5142c8769674" width="800">
