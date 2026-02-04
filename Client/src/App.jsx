import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Footer from "./Pages/Footer";
import AdminRoute from "./components/AdminRoute";
import AddEvent from "./Pages/AddEvent";
import Events from "./Pages/Events";
import EventDetail from "./Pages/EventDetail";
import PaymentSuccess from "./Pages/PaymentSuccess";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<p>Payment cancelled</p>} />

        <Route
          path="/admin/add-event"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
