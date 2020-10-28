import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";



export const PostList = (props) => {
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
        getPosts()
    },[])

    return (
        <>
        <div className="mainPostContainer">
            <h2>Posts</h2>
            <button
                    className="btn newPostbtn"
                    onClick={() => {
                        props.history.push(`/new_post/`)
                    }}>Create New Post</button>
            {
                posts !== [] ? posts.map(p => {
                    return <div key={p.id}>
                        <div className="post-author">
                            <p>{p.user.display_name}</p>
                            <p style={{ marginLeft: '.5rem' }} >• {new Date(p.publication_date).toDateString()}</p>
                        </div>
                        <Link className="postLink" to={{pathname:`/posts/${p.id}`}}>
                        <p>{p.title}</p>
                        </Link>
                        <p>Posted in <b>{p.category.category}</b></p>
                    </div>
                }) : null
            }

        </div>
        </>
    )
}