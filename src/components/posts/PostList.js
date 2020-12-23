// All posts view shows all published posts
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";
import { CreatePostButton } from "./CreatePostButton"
import Post from "./Post"


export const PostList = (props) => {
// REFS
// CONTEXT
    const {posts, getPosts, getPostsByUser, getPostsByCategoryId} = useContext(PostContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)
// STATE
    const [filteredPosts, setFilteredPosts] = useState([])
    const [currentUsersPosts, setCurrentUsers] = useState([])
    const [authorsPosts, setAuthorsPosts] = useState([])
    const [myPostsView, setMyPostsView] = useState(props.myPosts)
    const [byCategory, setByCategory] = useState(props.byCategory)


    const approvedAndUserCreatedPosts = posts.filter(p => p.publication_date != null && p.approved || p.is_user_author )

    // const postsForAdmins = posts.filter(p => p.publication_date != null || p.is_user_author)
    useEffect(() => {
        getPosts()
        getCurrentUser()
    },[])

    useEffect(()=>{
        if(posts.length !== 0){
            setFilteredPosts(posts)
        }
    }, [posts])

    return (
        <>
        <CreatePostButton
        {...props}/>
        <div className="mainPostContainer">
            {filteredPosts.map(p => {
                return (
                    <Post
                    key={p.id}
                    currentUser={currentUser}
                    admin={currentUser.is_staff}
                    is_author={currentUser.id === p.rareuser.id}
                    post={p}
                    {...props}/>
                )
            })
            }
            </div>
            </>
    )
}