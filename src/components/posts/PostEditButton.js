import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactionContext } from '../reactions/ReactionProvider';
import { UserContext } from '../users/UserProvider';
import { PostContext } from './PostProvider';
import "./Post.css";

export const PostEditButton = (props) => {


    const UserIsAuthorCheck = () => {
        if(props.currentUser.id )
        return (
        <>
            <div
                className="btn__post-edit"
                onClick={() => {
                    props.history.push(`/posts/edit/${props.post.id}`)
                }}>
            </div>
        </>
    )
    }
}