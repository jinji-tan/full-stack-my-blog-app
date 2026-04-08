import { useState } from "react"
import { registerApi } from "../services/api"


const Register = ({ setPage }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            setError("Please fill in all fields")
            return
        }

        if (password != confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (!validateEmail(email)) {
            setError("Invalid email")
            return
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long")
            return
        }

        setLoading(true)

        try {
            const data = await registerApi(email, password, firstName, lastName)
            localStorage.setItem("token", data.token)
            alert(data.message)
            setPage("home")
        } catch (error) {
            alert(error.message) || "Something went wrong"
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center h-screen items-center bg-blue-50">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm bg-white p-5 rounded-2xl relative shadow">

                {/* Title */}
                <p className="text-2xl font-semibold text-blue-600 flex items-center gap-2 relative">
                    <span className="relative flex items-center justify-center">
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full"></span>
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
                    </span>
                    Register
                </p>

                {/* Error */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Name fields */}
                <div className="flex gap-2">
                    <label className="relative w-full">
                        <input
                            required
                            name="firstName"
                            type="text"
                            className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
        peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                            Firstname
                        </span>
                    </label>

                    <label className="relative w-full">
                        <input
                            required
                            name="lastName"
                            type="text"
                            className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
        peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                            Lastname
                        </span>
                    </label>
                </div>

                {/* Email */}
                <label className="relative">
                    <input
                        required
                        name="email"
                        type="email"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute left-2 top-2 text-gray-400 text-sm transition-all 
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
      peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                        Email
                    </span>
                </label>

                {/* Password */}
                <label className="relative">
                    <input
                        required
                        name="password"
                        type="password"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
      peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                        Password
                    </span>
                </label>

                {/* Confirm Password */}
                <label className="relative">
                    <input
                        required
                        name="confirmPassword"
                        type="password"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
      peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                        Confirm password
                    </span>
                </label>

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-base transition"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Submit"}
                </button>

                {/* Sign in */}
                <p className="text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setPage("login")}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Signin
                    </button>
                </p>
            </form>
        </div>
    )

}

export default Register