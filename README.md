### The Plague - Version 1.4.1

---

**The Plague** is a small e-commerce website designed to provide a seamless shopping experience for users and powerful administrative tools for managing orders and products.

---

### Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Change Log](#change-log)
- [License](#license)

---

### Features

#### **Client-Side Features:**

- **Product Display:**

  - Browse and view products with variants (color and size).
  - Detailed product pages showcasing variants.
  - **NEW:** Products are dynamically fetched and displayed on the homepage.
  - **NEW:** Updated card design for "Best Products" and "Featured Products" sections on the homepage for a more modern and engaging look.

- **Shopping Cart:**

  - Add items to the cart.
  - Checkout process with address and payment transaction support.
  - **NEW:** Cart count now updates dynamically in the navbar when:
    - Items are added or removed.
    - Quantities are changed within the cart.
    - Items are deleted.
  - **NEW:** Items are removed from the cart automatically upon successful checkout.

- **Product Filtering:**

  - **NEW:** Enhanced product filtering options on the product list page for better navigation and user experience.

- **User Authentication:**
  - User registration and login functionality.

#### **Admin-Side Features:**

- **Order Management:**

  - View and manage customer orders.
  - Update order statuses and payment information.

- **Product Management:**

  - Add, view, edit, and delete products in the admin panel.

- **Dashboard:**

  - Static overview for monitoring key metrics.

- **Admin Authentication:**

  - Secure login for administrative access.

- **Banner Management:**

  - **NEW:** Add, edit, and delete banners with validation and image upload functionality.
  - **NEW:** Delete images from the S3 bucket when removing banners.
  - **NEW:** Track banner creation and modification dates.

---

### Technologies

- **Frontend:**

  - Next.js 14
  - Tailwind CSS
  - Flowbite React
  - AG Grid React

- **Backend:**

  - .NET 8
  - MongoDB
  - JWT Authentication

- **Additional Libraries:**
  - Zod (form validation)
  - AWS SDK (S3 integration)

---

### Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repository/the-plague.git
   cd the-plague
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   - Create `.env.local` and `.env.production` files.
   - Define environment variables such as:
     ```plaintext
     NEXT_PUBLIC_API_URL=https://your-api-url
     NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-aws-key
     NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-aws-secret
     ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

### Usage

- **Client Interface:**  
  Access the frontend by navigating to `http://localhost:3000`.

- **Admin Panel:**  
  Visit `http://localhost:3000/admin` (protected route).

- **API Endpoints:**  
  Hosted API endpoints interact with MongoDB for dynamic data management.

---

### Change Log

#### **Version 1.4.1:**

- **New Features:**
  - **Homepage Enhancements:**
    - The carousel is now dynamic and fetches data directly from the database, replacing the previous static implementation.

#### **Version 1.4.0:**

- **New Features:**
  - **Banner Management:**
    - Added functionality for creating, editing, and deleting banners.
    - Integrated image validation and upload.
    - Implemented image deletion from S3 bucket.

#### **Version 1.3.1:**

- **New Features:**
  - **Homepage Enhancements:**
    - Products are now fetched dynamically, ensuring up-to-date listings.
    - Redesigned "Best Products" and "Featured Products" sections for improved user experience.

#### **Version 1.3.0:**

- **New Features:**
  - **Cart Enhancements:**
    - Cart count now updates in real-time in the navbar.
    - Items are removed from the cart upon successful checkout.
  - **Product Filtering:**
    - Improved filtering options on the product list page for a better user experience.

#### **Version 1.2.0:**

- **New Feature: Enhanced Product Management in Admin**
  - Admins can now edit and delete products directly from the admin panel.
  - Added email address field to the checkout page.

#### **Version 1.1.0:**

- **New Feature: Product Management in Admin**
  - Admins can now view a list of products in the admin panel.
  - Improved interface for managing product details.

---

### Screenshots

_Include screenshots of your application (home page, product page, admin panel, etc.)._

---

### License

This project is licensed under the MIT License.

---

**Happy Shopping with The Plague!** 🛒
