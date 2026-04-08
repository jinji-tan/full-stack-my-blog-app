import { useState } from "react"
import { loginApi } from "../services/api"

const Login = ({ setPage }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        
        try {
            const data = await loginApi(email, password)
            localStorage.setItem("token", data.token)
            setPage("home")
        } catch (err) {
            setError(err.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center h-screen items-center bg-blue-50">
            <form
                className="flex flex-col gap-3 max-w-sm bg-white p-5 rounded-2xl relative shadow min-w-75 min-h-50"
                onSubmit={handleSubmit}
            >
                {/* Title */}
                <p className="text-2xl font-semibold text-blue-600 flex items-center gap-2 relative">
                    <span className="relative flex items-center justify-center">
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full"></span>
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
                    </span>
                    Login
                </p>

                {/* Error */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Email */}
                <label className="relative">
                    <input
                        required
                        type="email"
                        name="email"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute left-2 top-2 text-gray-400 text-sm transition-all 
                        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
                        peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600"
                    >
                        Email
                    </span>
                </label>

                {/* Password */}
                <label className="relative">
                    <input
                        required
                        type="password"
                        name="password"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
                        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
                        peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600"
                    >
                        Password
                    </span>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-base transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Submit"}
                </button>

                {/* Register Link */}
                <p className="text-sm text-gray-500 text-center">
                    Don't have an account yet?{" "}
                    <button
                        type="button"
                        onClick={() => setPage("register")}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login