// src/Components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import axios from "axios";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    console.log(data)
    try {
      // POST login data to backend
      const response = await axios.post("/api/login", data);
      console.log(response)
      console.log(response.data)
      if (response.data.success) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Server error! Please try again later.");
    }

    reset();
  };

  return (
    <form
      className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 mx-auto mt-10"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Teacher Login
      </h2>

      <InputField
        label="Username"
        id="username"
        placeholder="Enter username"
        register={register}
        rules={{
          required: { value: true, message: "Username is required" },
          minLength: { value: 3, message: "Username must be at least 3 characters long" },
        }}
        errors={errors}
      />

      <InputField
        label="Email"
        id="email"
        placeholder="Enter email"
        register={register}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            message: "Must end with @gmail.com",
          },
        }}
        errors={errors}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter password"
        register={register}
        rules={{ 
          required: { value: true, message: "Password is required" },
          minLength: { value: 8, message: "Password must be at least 8 characters long" },
        }}
        errors={errors}
      />

      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-white transition duration-200 mt-8 ${
          isSubmitting
            ? "bg-blue-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}
