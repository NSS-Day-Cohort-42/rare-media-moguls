import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"
import { PostTags } from "./PostTags/PostTags"


export const PostDetails = (props) => {
    const { getPostById, deletePost } = useContext(PostContext)

    const [post, setPost] = useState({ user: {} })

    const deletePostDialog = useRef(null)

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getPostById(postId)
            .then(setPost)
    }, [])

    const handleDate = (date) => {
        if ("publication_date" in post) {
            return new Date(date).toDateString()
        }
    }

    const editDeleteButtons = () => {
        const currentId = localStorage.getItem("rare_user_id")
        if (post.user_id === parseInt(currentId)) {
            return (
                <div className="postButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            props.history.push(`/posts/edit/${post.id}`)
                        }}></button>
                    <button
                        className="btn-small fa fa-trash"
                        onClick={() => {
                            deletePostDialog.current.showModal()
                        }}></button>
                </div>
            )
        }
    }

    return (
        <>
            <dialog className="dialog dialog--deletePost" ref={deletePostDialog}>
                <div>Are you sure you want to delete this post?</div>
                <button className="button--closeDialog btn" onClick={e => deletePostDialog.current.close()}>Close</button>
                <button className="button--deleteDialog btn"
                    onClick={e => {
                        deletePost(post.id)
                        props.history.push("/")
                    }}>Delete Post</button>
            </dialog>
            <div className="postDetailContainer">
                <h2 className="postTitle">{post.title}</h2>
                <div className="author_date_container">
                    <h3 className="authorName">{post.user.display_name}</h3>
                    <h3>{handleDate(post.publication_date)}</h3>
                </div>
                <div className="postContent">
                    <p>{post.content}</p>
                </div>
                {editDeleteButtons()}
                <div className="commentButtonContainer">
                    <button
                        className="btn postCommentBtn"
                        onClick={() => {
                            props.history.push(`/new_comment/${post.id}`)
                        }}>Add Comment</button>
                </div>
            </div>
            <div className="viewCommentsButtonContainer">
                <button
                    className="btn postEditBtn"
                    onClick={() => {
                        props.history.push(`/comments/${post.id}`)
                    }}>View Comments</button>
            </div>
            <div>
                <PostTags postId={post.id} />
            </div>
        </>
    )
}
