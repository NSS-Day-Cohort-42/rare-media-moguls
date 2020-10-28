import React, { useContext, useRef } from "react"
import { CommentContext } from "./CommentProvider"

export const Comment = (props) => {
    const {deleteComment} = useContext(CommentContext)
    const deleteCommentDialog = useRef(null)

    const handleDate = (date) => {
        if ("timestamp" in props.comment) {
            return new Date(date).toDateString()
        }
    }

    const editDeleteButtons = () => {
        const currentId = localStorage.getItem("rare_user_id")
        if (props.comment.user_id === parseInt(currentId)) {
            return (
                <div className="commentsButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            props.history.push(`/comments/edit/${props.comment.post_id}`)
                        }}></button>
                    <button
                        className="btn-small fa fa-trash"
                        onClick={() => {
                            deleteCommentDialog.current.showModal()
                        }}></button>
                </div>
            )
        }
    }

    return (
        <>
        <dialog className="dialog dialog--deletePost" ref={deleteCommentDialog}>
                <div>Are you sure you want to delete this comment?</div>
                <button className="button--closeDialog btn" onClick={e => deleteCommentDialog.current.close()}>Close</button>
                <button className="button--deleteDialog btn"
                    onClick={e => {
                        deleteComment(props.comment.post_id)
                        props.history.push(`/comments/${props.comment.post_id}`)
                    }}>Delete</button>
        </dialog>

        <section className="comment">
                <div className="comment_user">{props.comment.user.display_name}</div>
                <div className="comment_subject">{props.comment.subject}</div>
                <div className="comment_content">{props.comment.content}</div>
                <div className="comment_date">{handleDate(props.comment.timestamp)}</div>
        </section> 
        {editDeleteButtons()}
        </>
    )
}