import { useState, useEffect } from "react";

const Navigation = ({ setPage }) => {
    const FirstName = localStorage.getItem("firstName") || "User";
    const LastName = localStorage.getItem("lastName") || "";
    const fullText = `Welcome, ${FirstName} ${LastName}`;
    
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timer;
        const typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && index < fullText.length) {
            // Typing
            timer = setTimeout(() => {
                setDisplayText(prev => prev + fullText[index]);
                setIndex(prev => prev + 1);
            }, typeSpeed);
        } else if (isDeleting && index > 0) {
            // Deleting
            timer = setTimeout(() => {
                setDisplayText(prev => prev.slice(0, -1));
                setIndex(prev => prev - 1);
            }, typeSpeed);
        } else if (index === fullText.length && !isDeleting) {
            // Pause at the end
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (index === 0 && isDeleting) {
            // Restart loop
            setIsDeleting(false);
        }

        return () => clearTimeout(timer);
    }, [index, isDeleting, fullText]);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");

        if (setPage) setPage("login");
        else window.location.reload();
    }

    return (
        <div className="min-h-25 relative flex flex-row items-center p-6 bg-linear-to-br from-white to-slate-50 rounded-xl shadow-xl border border-slate-100/50">

            {/* TITLE */}
            <div className="text-3xl font-black tracking-tight flex items-center">
                <span className="bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {displayText}
                </span>
                <span className="w-1 h-8 ml-1 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full animate-pulse"></span>
            </div>

            {/* Nav */}
            <div className="absolute top-4 right-4 py-3 px-2 flex gap-2 rounded-xl backdrop-blur-sm transition-all duration-300">
                <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Home"
                    className="group flex items-center justify-start w-11 h-11 bg-blue-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                    <div className="flex items-center justify-center w-11 h-11 transition-all duration-300 group-hover:justify-start group-hover:px-3">
                        {/* Home Icon */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12L12 3L21 12H18V21H6V12H3Z" />
                        </svg>
                    </div>
                    <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        Home
                    </div>
                </button>
                <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                    <div className="flex items-center justify-center w-11 h-11 transition-all duration-300 group-hover:justify-start group-hover:px-3">
                        {/* Logout Icon */}
                        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                    </div>
                    <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        Logout
                    </div>
                </button>
            </div>
        </div>
    );
};
 

export default Navigation;