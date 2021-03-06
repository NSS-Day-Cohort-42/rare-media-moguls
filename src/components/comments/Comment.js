import React, { useContext, useEffect, useRef } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentEditForm } from "./CommentEditForm"
import "./Comment.css"
import { UserContext } from "../users/UserProvider"

export const Comment = (props) => {
    const {deleteComment} = useContext(CommentContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)
    const deleteCommentDialog = useRef(null)
    const editCommentDialog = useRef(null)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleDate = (date) => {
        if ("created_on" in props.comment) {
            return new Date(date).toDateString()
        }
    }

    const editDeleteButtons = () => {
        if (props.comment.is_user_author) {
            return (
                <div className="commentsButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            editCommentDialog.current.showModal()
                        }}></button>
                    <button
                        className="btn-small fa fa-trash"
                        onClick={() => {
                            deleteCommentDialog.current.showModal()
                        }}></button>
                </div>
            )
        } else if (currentUser.is_staff === true){
            return (
                <div className="commentsButtonContainer">
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
                        deleteComment(props.comment.id)
                            .then(props.getCommentsForPost)
                        deleteCommentDialog.current.close()
                    }}>Delete</button>
        </dialog>

        <dialog className="dialog dialog--editPost" ref={editCommentDialog}>
            <CommentEditForm getCommentsForPost={props.getCommentsForPost} comment={props.comment} editCommentDialog={editCommentDialog}/>    
        </dialog>

        <section className="comment">
                <div className="comment_user">{props.comment.author.username}</div>
                <div className="comment_subject">{props.comment.subject}</div>
                <div className="comment_content">{props.comment.content}</div>
                <div className="comment_date">{handleDate(props.comment.created_on)}</div>
                {editDeleteButtons()}
            </section>
        </>
    )
}