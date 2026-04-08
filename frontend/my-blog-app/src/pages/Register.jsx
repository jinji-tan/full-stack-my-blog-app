

const Register = ({ setPage }) => {

    return (
        <div className="flex justify-center h-screen items-center bg-blue-50">
            <form className="flex flex-col gap-3 max-w-sm bg-white p-5 rounded-2xl relative shadow">

                {/* Title */}
                <p className="text-2xl font-semibold text-blue-600 flex items-center gap-2 relative">
                    <span className="relative flex items-center justify-center">
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full"></span>
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
                    </span>
                    Register
                </p>

                <p className="text-sm text-gray-500">
                    Signup now and get full access to our app.
                </p>

                {/* Name fields */}
                <div className="flex gap-2">
                    <label className="relative w-full">
                        <input
                            required
                            type="text"
                            className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
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
                            type="text"
                            className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
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
                        type="email"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
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
                        type="password"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
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
                        type="password"
                        className="peer w-full pt-5 pb-2 px-2 border border-gray-300 rounded-lg outline-none"
                    />
                    <span className="absolute left-2 top-3 text-gray-400 text-sm transition-all 
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600
      peer-valid:top-1 peer-valid:text-xs peer-valid:text-green-600">
                        Confirm password
                    </span>
                </label>

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-base transition">
                    Submit
                </button>

                {/* Sign in */}
                <p className="text-sm text-gray-500 text-center">
                    Already have an account?{" "}
                    <button
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