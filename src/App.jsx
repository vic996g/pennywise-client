import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import NavigationBar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budget'
import Savings from './pages/Savings'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  return (
    <BrowserRouter>

      <NavigationBar />

      <Routes>

        {/* ============================== */}
        {/* PUBLIC ROUTES */}
        {/* ============================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ============================== */}
        {/* PROTECTED ROUTES */}
        {/* ============================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/transaction"
            element={
              <Navigate
                to="/transactions"
                replace
              />
            }
          />

          <Route
            path="/budgets"
            element={<Budgets />}
          />

          <Route
            path="/savings"
            element={<Savings />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>


        {/* ============================== */}
        {/* ADMIN ROUTES */}
        {/* ============================== */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

        </Route>


      </Routes>

      <Footer />

    </BrowserRouter>
  )
}


export default App