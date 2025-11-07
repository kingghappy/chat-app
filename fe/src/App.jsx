// ... imports
import ProtectedProvider from "./components/Providers/ProtectProvider";
import PublicProvider from "./components/Providers/PublicProvider";
import Login from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignupPage";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"; // 1. Import trang Profile
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container text-white">  
      <Routes>
        <Route
          path="/login"
          element={
            <PublicProvider>
              <Login />
            </PublicProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicProvider>
              <Signup />
            </PublicProvider>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedProvider>
              <Home />
            </ProtectedProvider>
          }
        />
        {/* 2. Thêm Route cho Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedProvider>
              <Profile />
            </ProtectedProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
