// import React from 'react'
// import './index.css'

// import { Outlet, Route, Routes } from 'react-router-dom'
// import Cart from './pages/Cart'
// import Checkout from './pages/Checkout'
// import Success from './pages/Success'

// import Product from './pages/Product'

// import Orders from './pages/Order'

// const App = () => {
//   return <>
//     <Routes>
//       <Route path='/' element={<Outlet />}>
//         <Route index element={<Product />} />
//         <Route path='checkout' element={<Checkout />} />
//         <Route path='success' element={<Success />} />
//         <Route path='cart' element={<Cart />} />
//         <Route path='order' element={<Orders />} />
//       </Route>
//       <Route path='*' element={<h1>Page Not Found</h1>} />
//     </Routes>

//   </>
// }
// export default App




import React, { Suspense, lazy, ReactNode } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './index.css';

// Lazy load the components
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Success = lazy(() => import('./pages/Success'));
const Orders = lazy(() => import('./pages/Order'));

// Error Boundary Component (with TypeScript)
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught in Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* Wrap each route with ErrorBoundary and Suspense */}
        <Route
          index
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Product...</div>}>
                <Product />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='checkout'
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Checkout...</div>}>
                <Checkout />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='success'
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Success...</div>}>
                <Success />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='cart'
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Cart...</div>}>
                <Cart />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path='order'
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Orders...</div>}>
                <Orders />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
