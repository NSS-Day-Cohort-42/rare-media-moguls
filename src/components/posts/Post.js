import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactionContext } from '../reactions/ReactionProvider';
import { PostCategory } from './PostCategory'
import { PostImage } from './PostImage'
import { PostTitle } from './PostTitle'
import { EditDeletePostButton } from './EditPostButton'
import { AdminPostApproval } from './AdminPostApproval'
import { PostAuthor } from './PostAuthor'
import { PostContext } from './PostProvider'
import PostPublicationDate from './PostPublicationDate'
import "./Post.css";

export default (props) => {
    const { deletePost } = useContext(PostContext)
    const deletePostDialog = useRef(null)

    const handleDelete = (p) => {
        deletePost(p.id).then(()=> props.history.push("/rare"))
    }

    return (
        <>
        <dialog className="dialog dialog--deletePost" ref={deletePostDialog}>
            <div>
                Are you sure you want to delete this post?
            </div>
            <button className="button--closeDialog btn" onClick={() => deletePostDialog.current.close()}>
                Close
            </button>
            <button className="button--deleteDialog btn" onClick={() => handleDelete(props.post)}>
                Delete Post
            </button>
        </dialog>
        <section className="post">
            <div className="manage-buttons top-align">
                <EditDeletePostButton
                post={props.post}
                admin={props.admin}
                is_author={props.is_author}
                edit
                {...props}/>

                <EditDeletePostButton
                post={props.post}
                admin={props.admin}
                is_author={props.is_author}
                {...props}/>
            </div>
            <div className="post-list-single">
                <div className="post-list-top">
                    <div className="post-title-wrapper">
                        <PostTitle
                        post={props.post}
                        {...props} />
                    </div>
                    <div className="post-date-wrapper">
                        <PostPublicationDate
                        is_author={props.is_author}
                        post={props.post}
                        {...props}/>
                    </div>
                </div>
                <div className="middle">
                    <PostImage
                    post={props.post}
                    {...props}/>
                </div>
                <div className="lowerhalf">
                    <div className="lower-left-post">
                        <PostAuthor
                        author={props.post.rareuser}
                        {...props}/>
                        <PostCategory
                        category={props.post.category}
                        {...props}/>
                    </div>
                    <div className="lower-right-post">
                        <AdminPostApproval
                        admin={props.admin}
                        checked={props.post.approved}
                        post={props.post}
                        {...props}/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}