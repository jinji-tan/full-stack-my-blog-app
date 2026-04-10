import { useState } from "react";
import { deletePostApi, updatePostApi } from "../services/api";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

const PostCard = ({ post, onPostDeleted, onPostUpdated }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentRefresh, setCommentRefresh] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedContent, setEditedContent] = useState(post.content);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePostApi(post.id);
                if (onPostDeleted) onPostDeleted(post.id);
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleCommentAdded = () => {
        setCommentRefresh(prev => prev + 1);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editedTitle.trim() || !editedContent.trim()) return;
        if (editedTitle === post.title && editedContent === post.content) {
            setIsEditing(false);
            return;
        }

        setIsUpdating(true);
        try {
            await updatePostApi(post.id, { title: editedTitle, content: editedContent });
            setIsEditing(false);
            if (onPostUpdated) onPostUpdated(post.id, { title: editedTitle, content: editedContent });
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const currentUserId = localStorage.getItem("userId");

    return (
        <div id={`post-${post.id}`} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="text-xl font-bold text-slate-800 w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 mb-2"
                                autoFocus
                            />
                        ) : (
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h3>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">By</span>
                            {currentUserId === post.userId?.toString() ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold shadow-sm shadow-blue-200 ring-2 ring-white">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    {post.authorName} (You)
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                                    {post.authorName}
                                </span>
                            )}
                            <span className="text-slate-300 mx-1">•</span>
                            <span className="text-xs font-medium text-slate-400">{formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                    {/* Only show delete and edit if the current user is the author */}
                    {currentUserId === post.userId?.toString() && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                id={`edit-post-${post.id}`}
                                onClick={() => setIsEditing(!isEditing)}
                                className={`p-2 rounded-lg transition-colors ${isEditing ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                                title="Edit Post"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button 
                                id={`delete-post-${post.id}`}
                                onClick={handleDelete}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Post"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="mb-6">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full px-3 py-2 text-slate-600 leading-relaxed border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[150px]"
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedTitle(post.title);
                                    setEditedContent(post.content);
                                }}
                                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating || !editedTitle.trim() || !editedContent.trim()}
                                className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-slate-600 leading-relaxed mb-6 whitespace-pre-wrap">
                        {post.content}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                    <button 
                        id={`toggle-comments-${post.id}`}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        {isExpanded ? "Hide Comments" : "Show Comments"}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="bg-slate-50/50 p-6 border-t border-slate-100">
                    <AddComment postId={post.id} onCommentAdded={handleCommentAdded} />
                    <CommentList postId={post.id} postAuthorId={post.userId} refreshTrigger={commentRefresh} />
                </div>
            )}
        </div>
    );
};

export default PostCard;
