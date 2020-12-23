import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const api = 'http://localhost:8000/posts'
    const token = localStorage.getItem('rare_token')
    const [posts, setPosts] = useState([])
    const [post, setCurrentPost] = useState({rareuser:{}, category:{}})

    const getPosts = () => {
        return fetch(`${api}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const getPostById = (postId) => {
        return fetch(`${api}/${postId}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentPost)
    }

    const addPost = post => {
        return fetch(`${api}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then((res) => {
                getPosts()
                return res.id})
    }

    const deletePost = postId => {
        return fetch(`${api}/${postId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${token}`},
        })
        .then(getPosts)
    }

    const getPostsByAuthor = (userId) => {
        return fetch(`${api}?author_id=${userId}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
    }

    const getPostsByCategory = category_id => {
        return fetch(`${api}?category_id=${category_id}`, {
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
    }

    const updatePost = post => {
        return fetch(`${api}/${post.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const adminPostApproval = (postId) => {
        return fetch(`${api}/${ postId }/approval`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(getPosts)
    }

    const publishPost = (postId) => {
        return fetch(`${api}/${ postId }/publish`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(getPosts)
    }

    const getSubscribedPosts = (userId) => {
        return fetch(`${api}?subscribed=${userId}`, {
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
    }


    return (
        <PostContext.Provider value={{
            posts,
            addPost,
            getPostById,
            deletePost,
            updatePost,
            getPosts,
            getPostsByCategory,
            adminPostApproval,
            publishPost,
            post,
            getSubscribedPosts,
            getPostsByAuthor,
            setPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )

}