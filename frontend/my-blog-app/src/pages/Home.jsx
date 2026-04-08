

const Home = ({ setPage }) => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        setPage("login")
    }

    return (
        <div className="flex justify-center h-screen items-center bg-blue-50">
            <form className="flex flex-col gap-25 max-w-sm bg-white p-5 rounded-2xl relative shadow min-w-75 min-h-90">

                {/* Title */}
                <p className="text-2xl font-semibold text-blue-600 flex items-center gap-2 relative">
                    <span className="relative flex items-center justify-center">
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full"></span>
                        <span className="absolute w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
                    </span>
                    Home
                </p>

                {/* Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-base transition" 
                onClick={handleLogout}>
                    Logout
                </button>
            </form>
        </div>
    )

}

export default Home