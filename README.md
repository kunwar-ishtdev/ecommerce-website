# AeroGear E-Commerce Store

A full-stack e-commerce platform built with modern web technologies, featuring product management, shopping cart, checkout, and admin dashboard capabilities.

## 🎯 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Product Management**: Browse, search, and filter products by category
- **Shopping Cart**: Add/remove items, manage quantities
- **Checkout**: Complete order processing with Stripe integration (optional)
- **Admin Dashboard**: Manage products, orders, and users
- **Product Reviews**: Users can leave reviews and ratings
- **MongoDB Database**: Robust document-based data storage
- **Image Uploads**: Store images directly in MongoDB
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with SSR
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
ecommerce-store/
├── client/                          # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/              # Admin pages
│   │   │   ├── auth/               # Auth pages (login, register)
│   │   │   ├── cart/               # Shopping cart
│   │   │   ├── checkout/           # Checkout process
│   │   │   ├── products/           # Product listing
│   │   │   └── orders/             # Order history
│   │   ├── components/             # Reusable components
│   │   └── lib/
│   │       ├── apiSlice.ts         # Redux API setup
│   │       ├── slices/             # Redux slices
│   │       └── store.ts            # Redux store
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/            # Route controllers
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── cartController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── reviewController.ts
│   │   │   └── uploadController.ts
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Express middleware
│   │   ├── utils/                  # Utility functions
│   │   └── config/                 # Configuration
│   ├── .env                        # Environment variables
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (Atlas cluster or local instance)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/kunwar-ishtdev/ecommerce-website.git
cd ecommerce-store
```

#### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your-secret-key-here
NODE_ENV=development
EOF

# Build TypeScript
npm run build

# Start development server
npm run dev
```

#### 3. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env.local file (if needed for custom API URL)
# Default: http://localhost:5000

# Start development server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔑 Environment Variables

### Server (.env)
```
PORT=5000                                                    # Server port
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db    # MongoDB connection string
JWT_SECRET=your-secret-key                                  # JWT signing secret
NODE_ENV=development                                        # Node environment
```

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000                  # Backend API URL (optional)
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Reviews
- `GET /api/reviews/product/:id` - Get reviews for product
- `POST /api/reviews` - Create review

### Upload
- `POST /api/upload` - Upload image (protected, admin only)

## 🔐 Authentication

- Default role: **user**
- Admin users can manage products, view all orders, and access admin dashboard
- JWT tokens stored in HTTP-only cookies
- Protected routes require valid JWT token

## 🗄️ Database Models

### User
- name, email, password, role, timestamps

### Product
- title, description, price, discountPrice, images, category, stock, isFeatured

### Cart
- userId, items (productId, quantity, price)

### Order
- userId, items, totalPrice, status, shippingAddress

### Review
- productId, userId, rating, comment, timestamps

### Image
- filename, data (base64), contentType, size, uploadedBy, timestamps

## 📝 Development

### Build Frontend
```bash
cd client
npm run build
```

### Build Backend
```bash
cd server
npm run build
```

### Run Tests
```bash
# Frontend
cd client
npm test

# Backend
cd server
npm test
```

### Code Quality
- TypeScript for type safety
- ESLint for code standards
- Proper error handling and validation

## 🐛 Troubleshooting

### Upload Image Shows 500 Error
- Verify all environment variables are set correctly
- Check MongoDB connection
- Ensure the server is running on port 5000
- Check browser console and server logs for detailed errors

### CORS Errors
- Verify CORS is configured in server with correct origin
- Default allowed: `http://localhost:3000`

### MongoDB Connection Issues
- Verify MongoDB URI in `.env`
- Check network access in MongoDB Atlas
- Ensure correct username/password

### Image Not Displaying
- Verify image was uploaded successfully
- Check that base64 data is properly stored in database
- Verify browser can access the image data

## 📦 Building for Production

### Backend
```bash
cd server
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For issues and questions, please create an issue on GitHub.

---

**Last Updated**: March 2026
**Version**: 1.0.0
