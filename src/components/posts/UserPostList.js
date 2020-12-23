import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import Post from "./Post"
import "./Post.css";
import { UserContext } from "../users/UserProvider";


export const UserPostList = (props) => {
    const { getPostsByUser, getPostsByAuthor } = useContext(PostContext)
    const {currentUser, getCurrentUser} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [open, setOpen] = useState(false)

    const seeAllPostsByAuthor = props.match.params.hasOwnProperty("userId")

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        if (seeAllPostsByAuthor) {
            getPostsByAuthor(parseInt(props.location.state.userId))
                .then(setPosts)
        } else {
            getPostsByUser()
                .then(setPosts)
        }
    }, [])

    const toggleSelected = (e) => {
        if (selectedPostId !== e.id) {
            setSelectedPostId(e.id)
        }
        else {
            setSelectedPostId(0)
        }
    }
    const toggleOpen = () => {
        if (open) {
            setOpen(false)
        }
        else {
            setOpen(true)
        }
    }
    return (
        <>
            <div className="mainPostContainer">
                <div className="my-posts-heading" style={{cursor: "pointer"}} onClick={()=>{
                                props.history.push(`/users/${props.p.rareuser.id}`)
                            }}>{seeAllPostsByAuthor ? `${props.location.state.name}'s Posts` : "My Posts"}</div>
                {seeAllPostsByAuthor ?
                    parseInt(props.location.state.userId) === currentUser.id ?
                        <button className="btn newPostbtn"
                            onClick={() => {
                                props.history.push(`/new_post`)
                            }}>
                            Create New Post
                        </button>
                        :
                        <div></div>
                :
                <button className="btn newPostbtn"
                            onClick={() => {
                                props.history.push(`/new_post`)
                            }}>
                            Create New Post
                </button>

                }
                {posts !== []
                    ? posts.map(p => {
                        return <Post
                            key={p.id}
                            post={p}
                            open={open}
                            toggleOpen={toggleOpen}
                            selectedPostId={selectedPostId}
                            setSelectedPostId={setSelectedPostId}
                            toggleSelected={toggleSelected}
                            {...props} />
                    })
                    : null
                }
            </div>
        </>
    )
}