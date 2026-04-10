import { useState } from "react";
import { createCommentApi } from "../services/api";

const AddComment = ({ postId, parentId = null, parentAuthorName = null, onCommentAdded }) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            await createCommentApi({ postId, content, parentId });
            setContent("");
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`relative ${parentId ? "mb-2" : "mb-6"}`}>
            <div className="flex gap-2.5 items-start pt-1">
       
                <div className={`w-8 h-8 rounded-full bg-blue-50 shrink-0 flex items-center justify-center text-blue-400 border border-blue-100 shadow-sm ring-1 ring-white`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="flex-1 relative flex items-center group/input">
                    <input
                        id={`add-comment-${postId}-${parentId || 'root'}`}
                        type="text"
                        placeholder={parentId ? (parentAuthorName ? `Reply to ${parentAuthorName}...` : "Write a reply...") : "Write a comment..."}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[14px] text-slate-700 transition-all shadow-sm placeholder:text-slate-400"
                    />
                    
                </div>

                <button
                    id={`submit-comment-${postId}-${parentId || 'root'}`}
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="mt-0.5 p-2 text-blue-600 font-bold hover:bg-blue-50 rounded-full transition-all disabled:opacity-0 translate-x-1"
                    title="Send Message"
                >
                    <svg className="w-5.5 h-5.5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default AddComment;
