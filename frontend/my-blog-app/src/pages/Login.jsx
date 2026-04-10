import { useState } from "react"
import { loginApi } from "../services/api"
import LoadingButton from "../components/LoadingButton"

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

        const start = Date.now();

        try {
            setLoading(true)

            const data = await loginApi(email, password)

            const elapsed = Date.now() - start;
            if (elapsed < 500) {
                await new Promise(res => setTimeout(res, 500 - elapsed));
            }

            localStorage.setItem("token", data.token)
            localStorage.setItem("userId", data.id)
            localStorage.setItem("firstName", data.firstName)
            localStorage.setItem("lastName", data.lastName)
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

                {error && <p className="text-red-500 text-center">{error}</p>}

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

                {/* Loading... */}
                <LoadingButton loading={loading} type="submit">
                    Submit
                </LoadingButton>

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