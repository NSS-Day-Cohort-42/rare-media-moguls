import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactionContext } from '../reactions/ReactionProvider';
import { UserContext } from '../users/UserProvider';
import "./Post.css";
import { PostContext } from './PostProvider';


export const Post = (props) => {
    const {deletePost} = useContext(PostContext)
    const{getCurrentUser, currentUser} = useContext(UserContext)
    const deletePostDialog = useRef(null)
    const [admin, setAdmin] = useState(false)
    const [author, setPostAuthor] = useState()

    useEffect(() => {
        getCurrentUser()
    }, [])


    const editDeleteButtons = () => {
        if (currentUser.id === props.post.rareuser.id) {
            return (
                <div className="postButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            props.history.push(`/posts/edit/${props.post.id}`)
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
            <div className="post-item">
                <div className="upperhalf">
                    <dialog className="dialog dialog--deletePost" ref={deletePostDialog}>
                        <div>Are you sure you want to delete this post?</div>
                        <button className="button--closeDialog btn" onClick={e => deletePostDialog.current.close()}>Close</button>
                        <button className="button--deleteDialog btn"
                            onClick={e => {
                                deletePost(props.post.id)
                                .then(deletePostDialog.current.close())
                                .then(window.location.reload(false))
                            }}>Delete Post</button>
                    </dialog>
                    <div className="post-title-cont">
                        <span className="post-title" onClick={() => {
                            props.history.push(`/posts/${props.post.id}`)
                        }}>
                            {props.post.title}
                        </span>
                    </div>
                    <div className="postDate">
                        {props.post.publication_date != null ?
                            new Date(props.post.publication_date.concat("T00:00:00")).toDateString({}) : "unpublished"}
                    </div>
                </div>
                <div className="middle">
                {props.post.image_url ?
                            <div className="divImg-postList">
                                <img className="img-postList" src={props.post.image_url}></img>
                            </div>
                            :null
                 }
                 </div>
                <div className="lowerhalf">
                     <div>Author: {props.post.rareuser.username}</div>
                {editDeleteButtons()}
                </div>
            </div>
        </>
    )
}