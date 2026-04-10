import { useEffect, useState } from "react";
import { getCommentsApi, deleteCommentApi } from "../services/api";
import CommentItem from "./CommentItem";

const CommentList = ({ postId, postAuthorId, refreshTrigger }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await getCommentsApi(postId);
            
            const map = {};
            const roots = [];
            
            data.forEach(c => {
                const id = String(c.id !== undefined ? c.id : c.Id);
                map[id] = { ...c, id, replies: [] };
            });

            data.forEach(c => {
                const id = String(c.id !== undefined ? c.id : c.Id);
                const rawParentId = c.parentId !== undefined ? c.parentId : c.ParentId;
                const parentKey = rawParentId ? String(rawParentId) : null;
                
                if (parentKey && map[parentKey]) {
                    map[parentKey].replies.push(map[id]);
                } else {
                    roots.push(map[id]);
                }
            });

            // Sorting
            roots.sort((a, b) => new Date(b.createdAt || b.CreatedAt) - new Date(a.createdAt || a.CreatedAt));
            Object.values(map).forEach(node => {
                node.replies.sort((a, b) => new Date(a.createdAt || a.CreatedAt) - new Date(b.createdAt || b.CreatedAt));
            });

            setComments(roots);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId, refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this comment?")) {
            try {
                await deleteCommentApi(id);
                fetchComments(); // Refresh entire tree for consistency
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading && comments.length === 0) return <div className="text-center py-4 text-slate-400 text-sm">Loading comments...</div>;

    return (
        <div className="mt-4">
            {comments.length === 0 ? (
                <p className="text-center py-4 text-slate-400 text-sm italic">No comments yet.</p>
            ) : (
                comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        postId={postId}
                        postAuthorId={postAuthorId}
                        onDelete={handleDelete}
                        onRefresh={fetchComments}
                    />
                ))
            )}
        </div>
    );
};

export default CommentList;
