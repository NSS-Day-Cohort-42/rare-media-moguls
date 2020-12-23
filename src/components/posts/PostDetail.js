import React, { useContext, useEffect, useState, useRef } from "react"
import { PostContext } from "./PostProvider"
import { EditDeletePostButton } from "./EditPostButton"
import { ReactionContext } from "../reactions/ReactionProvider"
import "./Post.css"
import { PostTags } from "../PostTags/PostTags"
import { Link } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import Reactions from "./Reaction"


export const PostDetails = (props) => {
    const { getPostById, deletePost, publishPost, post } = useContext(PostContext)
    const { reactions, getReactionsByPost, addReaction } = useContext(ReactionContext)
    const { currentUser } = useContext(UserContext)

    const deletePostDialog = useRef(null)
    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getReactionsByPost(postId)
        getPostById(postId)
    }, [])

    const handleReact = (r) => {
        const postIdObj = { post_id: post.id }
        addReaction(r.id, postIdObj).then(() => getReactionsByPost(post.id))
    }

    const handleDelete = (p) => {
        deletePost(p.id).then(()=> props.history.push("/rare"))
    }

    const handleClick = () => {
        deletePostDialog.current.showModal()
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
                <button className="button--deleteDialog btn" onClick={() => handleDelete(post)}>
                    Delete Post
                </button>
            </dialog>

            <div className="postFlex">
                <div className="manage-buttons">
                    <EditDeletePostButton
                    admin={currentUser.is_staff}
                    is_author={currentUser.id === post.rareuser.id}
                    post={post}
                    edit
                    {...props}/>
                    <EditDeletePostButton
                    admin={currentUser.is_staff}
                    is_author={currentUser.id === post.rareuser.id}
                    post={post}
                    handleClick={handleClick}
                    delete
                    {...props}/>
                </div>
                <div className="postDetailContainer">
                    <div className="postTitleContainer">
                        <h2 className="postTitle">{post.title}</h2>
                        <p>{post.category.label}</p>

                    </div>
                    {post.image_url
                        ?
                        <div className="img-div">
                            <img className="post-img" src={post.image_url} />
                        </div>
                        :null
                    }
                    <div className="author_date_container">
                        <p className="authorName">
                            <Link className="postLink" to={ `/users/${post.rareuser.id}` }>
                                by {post.author_username}
                            </Link>
                        </p>
                        <div className="btn view-comments-btn" onClick={() => props.history.push(`/comments/${post.id}`)}>
                            View Comments
                        </div>

                        <div className='reactionContainer'>
                            {reactions.map(r => {
                                return <Reactions {...props}
                                key={r.id}
                                reaction={r}
                                handleReact={handleReact}
                                />
                            })}
                        </div>
                    </div>
                    <div className="postContent">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className="postTagContainer">
                    <PostTags
                    {...props}
                    postId={post.id}
                    isUserAuthor={post.is_user_author} />
                </div>

            </div>
        </>
    )
}
