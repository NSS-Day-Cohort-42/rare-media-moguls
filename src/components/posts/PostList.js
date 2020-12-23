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
    const {getPosts, getSubscribedPosts, getPostsByAuthor, getPostsByCategory} = useContext(PostContext)
    const {currentUser, getCurrentUser, setCurrentUser} = useContext(UserContext)
// STATE
    const [ filteredPosts, setFilteredPosts ] = useState([])
    const [ byUser, setPostsByUser ] = useState([])
    const [ byCategory, setByCategory ] = useState([])
    const [ myPosts, setMyPosts ] = useState([])
    const [ subscribed, setSubscribed ] = useState([])
    const [ allPosts, setAllPosts ]=useState([])

    useEffect(()=>{
        getCurrentUser().then(setCurrentUser)
    }, [])

    useEffect(()=>{
        if(props.subscribed){
            getCurrentUser().then((user)=>{
                getSubscribedPosts(user.id).then((posts)=>{
                    setSubscribed(posts)
                })
            })
        }
        if(props.allPosts){
            getPosts().then(posts=>{
                setAllPosts(posts)
            })
        }
        if(props.myPosts){
            getCurrentUser().then((user)=>{
                getPostsByAuthor(user.id).then( posts =>{
                    setMyPosts(posts)
                })
            })
        }
        if(props.byUser){
            const userId = parseInt(props.match.params.userId)
            getPostsByAuthor(userId).then((posts)=>{
                setPostsByUser(posts)
            })
        }
        if(props.byCategory){
            const catId = parseInt(props.match.params.categoryId)
            getPostsByCategory(catId).then((posts)=>{
                setByCategory(posts)
            })
        }
    }, [])

    useEffect(()=>{
        if(subscribed && currentUser && currentUser.is_staff){
            setFilteredPosts(subscribed)
        }
        else{
            const filtered = subscribed.filter(p=> p.publication_date !== null && p.approved || p.is_user_author) || []
            setFilteredPosts(filtered)
        }
    }, [subscribed])

    useEffect(()=>{
        if(allPosts && currentUser){
            if(currentUser.is_staff){
                setFilteredPosts(allPosts)
            }
            else{
                const filtered = allPosts.filter(p=> p.publication_date !== null && p.approved || p.is_user_author) || []
                setFilteredPosts(filtered)
            }
        }
    }, [allPosts])

    useEffect(()=>{
        if(byCategory && currentUser && currentUser.is_staff){
            setFilteredPosts(byCategory)
        }
        else{
            const filtered = byCategory.filter(p => p.publication_date !== null && p.approved || p.is_user_author) || []
            setFilteredPosts(filtered)
        }
    }, [byCategory])

    useEffect(()=>{
        if(myPosts && currentUser){
            setFilteredPosts(myPosts)
        }
    }, [myPosts])

    useEffect(()=>{
        if(byUser && currentUser && currentUser.is_staff){
            setFilteredPosts(byUser)
        }
        else{
            const filtered = byUser.filter(p=> p.publication_date !== null && p.approved || p.is_user_author) || []
            setFilteredPosts(filtered)
        }
    }, [byUser])

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