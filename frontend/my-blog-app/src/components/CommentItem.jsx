import { useState } from "react";
import AddComment from "./AddComment";
import { updateCommentApi } from "../services/api";

const CommentItem = ({ comment, postId, postAuthorId, onDelete, onRefresh, depth = 0, parentAuthorName = null }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isUpdating, setIsUpdating] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleReplyAdded = () => {
        setIsReplying(false);
        setShowReplies(true);
        if (onRefresh) onRefresh();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editedContent.trim() || editedContent === comment.content) {
            setIsEditing(false);
            return;
        }

        setIsUpdating(true);
        try {
            await updateCommentApi(comment.id, { content: editedContent });
            setIsEditing(false);
            if (onRefresh) onRefresh();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const currentUserId = localStorage.getItem("userId");
    const isCurrentUser = comment.userId?.toString() === currentUserId;
    const isPostAuthor = comment.userId === postAuthorId;
    const repliesCount = comment.replies?.length || 0;
    const avatarSize = depth === 0 ? "w-9 h-9" : "w-8 h-8";

    return (
        <div className={`flex flex-col ${depth > 0 ? "ml-8 mt-2" : "mt-4"}`}>
            {/* Header: Avatar + Bubble */}
            <div className="flex gap-2 group">
                {/* User Initial */}
                <div className={`${avatarSize} rounded-full bg-blue-50 shrink-0 flex items-center justify-center text-blue-600 font-bold text-[11px] border border-blue-100 shadow-sm ring-1 ring-white overflow-hidden mt-0.5`}>
                    {comment.authorName.charAt(0)}
                </div>

                <div className="flex-1 max-w-full">
                    {/* Container */}
                    <div className="relative inline-block max-w-[95%]">
                        <div className="bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-200 ring-1 ring-slate-50">
                            <div className="flex items-center gap-2 mb-0.5">
                                {isCurrentUser ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold shadow-sm shadow-blue-200">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                        {comment.authorName} (You)
                                    </span>
                                ) : (
                                    <span className="font-bold text-[13px] text-slate-800 leading-tight">
                                        {comment.authorName}
                                    </span>
                                )}
                                
                                {isPostAuthor && !isCurrentUser && (
                                    <div className="flex items-center gap-1.5 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold tracking-tight shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                        Author
                                    </div>
                                )}
                            </div>
                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="mt-2">
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="w-full px-3 py-2 text-[14px] text-slate-700 bg-slate-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all min-h-20"
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditedContent(comment.content);
                                            }}
                                            className="px-3 py-1 text-[12px] font-bold text-slate-400 hover:text-slate-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isUpdating || !editedContent.trim()}
                                            className="px-3 py-1 text-[12px] font-bold bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                        >
                                            {isUpdating ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {parentAuthorName && depth > 0 && (
                                        <span className="font-bold text-blue-600 mr-2 opacity-90 transition-colors">@{parentAuthorName.replace(/\s+/g, '')}</span>
                                    )}
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Row */}
                    <div className="flex items-center gap-4 mt-1.5 ml-2 text-[12px] font-bold text-slate-400 tracking-tight">
                        <span className="font-normal opacity-70 italic text-slate-300">{formatDate(comment.createdAt)}</span>
                        <button 
                            onClick={() => setIsReplying(!isReplying)}
                            className={`flex items-center gap-1 transition-colors hover:text-blue-600 ${isReplying ? 'text-blue-600' : ''}`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                            Reply
                        </button>
                        {isCurrentUser && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className={`flex items-center gap-1 transition-colors hover:text-blue-600 ${isEditing ? 'text-blue-600' : ''}`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button 
                                onClick={() => onDelete(comment.id)} 
                                className="font-bold text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Recursion & Toggle Section */}
            <div>
                {repliesCount > 0 && !showReplies && (
                    <button 
                        onClick={() => setShowReplies(true)}
                        className="text-[13px] font-bold text-slate-500 hover:underline flex items-center gap-2 mb-2 ml-10 mt-1"
                    >
                        <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                        View {repliesCount} {repliesCount === 1 ? 'reply' : 'replies'}
                    </button>
                )}

                {isReplying && (
                    <div className="ml-10 mb-4 mt-2">
                        <AddComment 
                            postId={postId} 
                            parentId={comment.id} 
                            parentAuthorName={comment.authorName}
                            onCommentAdded={handleReplyAdded} 
                        />
                    </div>
                )}

                {showReplies && (
                    <div className="flex flex-col">
                        {comment.replies && comment.replies.map((reply) => (
                            <CommentItem 
                                key={reply.id} 
                                comment={reply} 
                                depth={depth + 1}
                                postId={postId}
                                postAuthorId={postAuthorId}
                                onDelete={onDelete}
                                onRefresh={onRefresh}
                                parentAuthorName={comment.authorName}
                            />
                        ))}
                        <button 
                            onClick={() => setShowReplies(false)}
                            className="text-[11px] font-bold text-slate-400 hover:underline uppercase tracking-tight ml-10 mb-2 mt-1 self-start"
                        >
                            Hide thread
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentItem;
