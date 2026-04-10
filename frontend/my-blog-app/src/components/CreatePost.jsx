import { useState } from "react";
import { createPostApi } from "../services/api";

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await createPostApi({ title, content });
            setTitle("");
            setContent("");
            if (onPostCreated) onPostCreated();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        id="post-title"
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    />
                </div>
                <div>
                    <textarea
                        id="post-content"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="3"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 resize-none"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    id="submit-post"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Share Post"}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
