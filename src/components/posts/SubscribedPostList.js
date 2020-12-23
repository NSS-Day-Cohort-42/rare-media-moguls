import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Post.css";
import {AdminPostApproval} from "./AdminPostApproval"
import { UserContext } from "../users/UserProvider";
import Post from "./Post"


export const SubscribedPostList = (props) => {
    const {posts, getPosts, getPostsByCategoryId} = useContext(PostContext)
    const {currentUser, followedAuthors, getCurrentUserSubscriptions } = useContext(UserContext)
    const [postsBySubscribed, setPostsBySubscribed] = useState([])
    const [publishedAndApproved, setPublishedAndApproved] = useState([])
    const [postsForAdmins, setPostsForAdmins] = useState([])
    const [noSubscriptions, setNoSubscriptions] = useState(true)

    useEffect(()=>{
        getCurrentUserSubscriptions()
        getPosts()
    }, [])

    useEffect(()=>{
        const bySubscription = getSubscribed(posts, followedAuthors)
        setPostsBySubscribed(bySubscription)
    }, [posts])

    useEffect(()=>{
        if(postsBySubscribed.length !== 0){
            const pubAndApproved = postsBySubscribed.filter(p => p.publication_date != null && p.approved)
            setPublishedAndApproved(pubAndApproved)
            setNoSubscriptions(false)
        }
        else{
            setNoSubscriptions(true)
            console.log(noSubscriptions)
        }
    }, [postsBySubscribed])

// function to get only posts where current user is subscribed
    const getSubscribed = (posts, authors) =>{
        const subscribedPostArray = []
        authors.forEach(author=>{
            posts.forEach(post=>{
                if(post.rareuser.id === author.id){
                    subscribedPostArray.push(post)
                }
            })
        })
        return subscribedPostArray
    }

    const PostListVerify = () => {
        return (
            <>
            <div className="mainPostContainer">
                {posts.map(p => {
                    return (
                        <>
                        <Post
                        {...props}/>
                        </>
                    )
                })}
            </div>
            </>
        )
}
return(
    <>
    <PostListVerify />
    </>
)

}