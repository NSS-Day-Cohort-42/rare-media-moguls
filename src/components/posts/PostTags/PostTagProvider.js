import React, { useState } from "react"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([])

    const getAllPostTags = () => {
        return fetch("http://localhost:8000/post_tags")
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostTagsByPost = (postId) => {
        return fetch(`http://localhost:8000/post_tags?post_id=${postId}`)
            .then(res => res.json())
            .then(setPostTags)
    }

    const addPostTag = (postTag) => {
        return fetch("http://localhost:8000/post_tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
    }

    const removePostTag = (postTagId) => {
        return fetch(`http://localhost:8000/post_tags/${postTagId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }) 
    }

    return (
        <PostTagContext.Provider value={{postTags, addPostTag, removePostTag, getAllPostTags, getPostTagsByPost}}>
            {props.children}
        </PostTagContext.Provider>
    )

}