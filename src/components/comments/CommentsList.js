import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "../posts/PostProvider"
import { Comment } from "./Comment"
import { CommentContext } from "./CommentProvider"
import "./Comment.css"

export const CommentsListByPost = (props) => {
    const { getCommentsByPostId } = useContext(CommentContext)
    const { getPostById } = useContext(PostContext)

    const [postComments, setComments] = useState([])
    const [post, setPost] = useState({})

    const postId = parseInt(props.match.params.postId)

    const getCommentsForPost = () => {
        getCommentsByPostId(postId)
            .then(setComments)
    }

    const getPostTitle = () => {
        getPostById(postId)
            .then(setPost)
    }

    useEffect(() => {
        getCommentsForPost()
    }, [])

    useEffect(() => {
        getPostTitle()
    }, [])

    return (
        <>
        <div className="commentContainer">
            <button
                className="btn"
                onClick={() => {
                    props.history.push(`/posts/${postId}`)
                }}>Back to Post</button>

            <h2>{post.title}</h2>
            <section className="comments">
                {
                    postComments.map(comment => {
                        return <Comment key={comment.id} comment={comment} {...props} />
                    })
                }
            </section>

        </div>
        </>
    )
}