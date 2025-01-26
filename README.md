# Makers Tech Frontend

A modern React-based frontend for the Makers Tech e-commerce platform.

## 🚀 Features

- Responsive and modern UI using Material Tailwind
- Product catalog with category-based filtering
- User authentication and profile management
- Shopping cart and wishlist functionality
- Interactive product recommendations
- Real-time product search and filtering
- Company and department management interface

## 🛠️ Tech Stack

- React 18
- Vite
- Material Tailwind
- TailwindCSS
- React Router
- Axios for API communication
- ESLint + Prettier for code quality

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn
- Modern web browser
- Backend service running (see backend README)

## 🔧 Environment Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with:
```env
VITE_API_URL=http://localhost:8080/api
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

## 🎨 Project Structure

```
frontend/
├── src/
│   ├── assets/        # Static assets (images, fonts)
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── layout/        # Layout components
│   ├── pages/         # Page components
│   ├── services/      # API service calls
│   ├── store/         # State management
│   ├── utils/         # Utility functions
│   └── widgets/       # Complex UI widgets
├── public/            # Public static files
└── index.html         # Entry HTML file
```

## 🔌 API Integration

The frontend communicates with the backend through RESTful APIs:

- Authentication endpoints (`/api/auth/*`)
- Product management (`/api/products/*`)
- Category management (`/api/categories/*`)
- User profile management (`/api/users/*`)
- Contract management (`/api/contracts/*`)

## 🎯 Key Components

### Product Related
- `ProductList`: Displays grid of products with filtering
- `ProductDetail`: Shows detailed product information
- `CategorySidebar`: Navigation for product categories
- `RecommendedProducts`: Displays personalized product recommendations

### User Interface
- `HomeLayout`: Main layout wrapper
- `Dashboard`: Admin dashboard interface
- `CartAndFavorites`: Shopping cart and wishlist management
- `AddProductPopUp`: Product creation interface

## 🧪 Testing

```bash
npm run test
# or
yarn test
```

## 📝 Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Lint check
npm run lint

# Format code
npm run format
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
