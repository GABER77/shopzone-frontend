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
- Product Browsing – Explore all products with search, sorting, filtering, and pagination powered by the backend API
- Profile Management – Users can update their photo, name, email, and password via the profile page
- Product Details – View detailed information for each product
- Add to Cart – Add products to a shopping cart for checkout
- Buy Products – Complete checkout through Stripe

## **Seller Dashboard**

- Add Product – Upload product details including multiple images, sizes, category, price and description
- Manage Products – Control only their own products after ownership verification

## **Admin Dashboard**

- Admins have all seller capabilities, plus:
- Manage All Products – View and control every product listed across the platform
- Manage All Users – View all users, change roles, or ban accounts

## **Authentication & Session Management**

- User authentication is handled via JSON Web Tokens (JWT) stored securely in browser cookies
- The app uses tokens to verify user login and conditionally allow access to user-specific routes and features
