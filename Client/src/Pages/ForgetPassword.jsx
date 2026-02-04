// import { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email) {
//       return setError("Email is required");
//     }

//     setError("");
//     setMessage("Password reset link sent to your email");

//     // TODO: call backend API
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
//         <h2 className="text-2xl font-bold text-center text-indigo-600">
//           Forgot Password
//         </h2>
//         <p className="text-sm text-center text-gray-500 mt-1">
//           Enter your registered email
//         </p>

//         {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}
//         {message && <p className="text-green-600 text-sm text-center mt-3">{message}</p>}

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
//           >
//             Send Reset Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
