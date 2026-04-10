import { useEffect, useState, useRef } from "react";
import { getPostsApi } from "../services/api";
import PostCard from "./PostCard";

const PostList = ({ refreshTrigger }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    
    const isFetchingRef = useRef(false);
    
    const INITIAL_LIMIT = 10;
    const SCROLL_LIMIT = 5;

    const fetchPosts = async (isInitial = false) => {

        if (isFetchingRef.current) return;
        if (!isInitial && (!hasMore || loadingMore || loading)) return;

        const currentLimit = isInitial ? INITIAL_LIMIT : SCROLL_LIMIT;
        const currentOffset = isInitial ? 0 : offset;

        isFetchingRef.current = true;
        if (isInitial) {
            setLoading(true);
            setOffset(0);
            setHasMore(true); 
        } else {
            setLoadingMore(true);
        }

        try {
            const data = await getPostsApi(currentOffset, currentLimit);
            
            if (isInitial) {
                setPosts(data);
                const nextOffset = data.length;
                setOffset(nextOffset);
                if (data.length < currentLimit) setHasMore(false);
            } else {
                if (data.length > 0) {
                    setPosts(prev => [...prev, ...data]);
                    setOffset(prev => prev + data.length);
                }
                // If we got back less than we asked for, we've hit the end of the line
                if (data.length < currentLimit) {
                    setHasMore(false);
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            isFetchingRef.current = false;
        }
    };

    // Initial load and refresh
    useEffect(() => {
        fetchPosts(true);
    }, [refreshTrigger]);

    useEffect(() => {
        const handleScroll = () => {
            if (!hasMore || loading || loadingMore || isFetchingRef.current) return;
            
            const scrollPos = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 200; 
            
            if (scrollPos >= threshold) {
                fetchPosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading, loadingMore, offset]);

    const handlePostDeleted = (id) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handlePostUpdated = (id, updatedData) => {
        setPosts(posts.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    if (loading && posts.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="font-medium">Loading your feed...</p>
        </div>
    );
    
    if (error && posts.length === 0) return (
        <div className="text-center py-10 px-6 bg-red-50 rounded-2xl border border-red-100 text-red-600">
            <p className="font-bold mb-1">Oops! Something went wrong</p>
            <p className="text-sm">{error}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {posts.length === 0 && !loading ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400 shadow-inner">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No posts in your feed yet.</p>
                    <p className="text-sm">Be the first to share something amazing!</p>
                </div>
            ) : (
                <>
                    {posts.map(post => (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            onPostDeleted={handlePostDeleted} 
                            onPostUpdated={handlePostUpdated}
                        />
                    ))}
                    
                    {loadingMore && (
                        <div className="flex justify-center py-8">
                            <div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {!hasMore && posts.length > 0 && (
                        <div className="text-center py-10 text-slate-400">
                            <div className="h-px bg-slate-100 mb-4 mx-auto w-24"></div>
                            <p className="text-xs uppercase tracking-widest font-bold opacity-50">You've reached the end of the feed</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PostList;
