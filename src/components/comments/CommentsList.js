import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "../posts/PostProvider"
import { Comment } from "./Comment"
import { CommentContext } from "./CommentProvider"

export const CommentsListByPost = (props) => {
    const {getCommentsByPostId} = useContext(CommentContext)
    const{getPostById} = useContext(PostContext)

    const [postComments, setComments] = useState([])
    const[post, setPost] = useState({})

    const postId =parseInt(props.match.params.postId)

    const getCommentsForPost = () => {
        getCommentsByPostId(postId)
            .then(setComments)
    }

    const getPostTitle =() => {
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
            <Link className="linkToPostDetails" to={`/posts/${postId}`}>Back to Post</Link>
            <h2>{post.title}</h2>
            <section className="comments">
               {
                   postComments.map(comment => {
                    return <Comment key={comment.id} comment={comment} {...props} />
                   })
               }
           </section>
        </>
    )
}