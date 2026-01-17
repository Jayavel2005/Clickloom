import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Login from "./components/Login";
import Generate from "./components/Generate";
Generate;
Login;

export default function App() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:id" element={<Generate />} />
        {/* <Route path="/my-generation" element={<MyGeneration />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<SignUp />} /> */}
      </Routes>
      <Footer />
    </>
  );
}
