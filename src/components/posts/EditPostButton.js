import React from 'react'
import "./Post.css";

export const EditDeletePostButton = (props) => {

    const handleClick = (e) =>{
        if(props.edit){
            props.history.push(`/posts/edit/${e}`)
        }
        else{
            props.handleClick()
        }
    }

    const Validation = () => {
        // if the user is admin or they are the author then they can edit/delete
        if(props.admin || props.is_author){
            return (
                <div className={`btn ${props.edit ? "btn__post-edit" : "btn__post-delete"}`} title={`${props.edit ? "Edit Post" : "Delete Post"}`} onClick={() => handleClick(props.post.id)}></div>
            )
        }
        else {
            return null
        }
    }
    return (
        <>
        <Validation />
        </>
    )

}