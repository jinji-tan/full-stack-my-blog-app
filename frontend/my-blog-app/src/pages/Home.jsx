import { useState } from "react";
import Navigation from "../components/Navigation";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";

const Home = ({ setPage }) => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handlePostCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navigation setPage={setPage} />
            
            <main className="max-w-3xl mx-auto px-6 py-12">
                <CreatePost onPostCreated={handlePostCreated} />
                
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-slate-200"></div>
                    <span className="text-slate-400 font-medium text-sm tracking-widest uppercase">Latest Posts</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <PostList refreshTrigger={refreshTrigger} />
            </main>
        </div>
    );
};

export default Home;