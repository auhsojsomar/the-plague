### The Plague - Version 1.2.0

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

- **Shopping Cart:**

  - Add items to the cart.
  - Checkout process with address and payment transaction support.

- **User Authentication:**
  - User registration and login functionality.

#### **Admin-Side Features:**

- **Order Management:**

  - View and manage customer orders.
  - Update order statuses and payment information.

- **Product Management:**

  - View the list of products in the admin panel.

- **Dashboard:**

  - Static overview for monitoring key metrics.

- **Admin Authentication:**
  - Secure login for administrative access.

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

#### **Version 1.2.0:**

- **New Feature: Enhanced Product Management in Admin**

  - Admins can now edit and delete products directly from the admin panel.
  - Add email address to checkout page.

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
