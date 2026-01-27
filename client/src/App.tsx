import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Login from "./components/Login";
import Generate from "./components/Generate";
import MyGenerations from "./components/MyGenerations";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <LenisScroll />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/my-generations" element={<MyGenerations />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </>
  );
}
