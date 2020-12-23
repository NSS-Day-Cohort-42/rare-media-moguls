import React, { useContext } from "react"
import { PostContext } from "./PostProvider"

export const AdminPostApproval = (props) => {
    const { adminPostApproval } = useContext(PostContext)

    const AdminVerify = () => {
        if(props.admin){
            return (
                <div className={`toggle-approved ${props.post.approved ? "approved" : "unapproved" }`} onClick={()=> adminPostApproval(props.post.id)}>
                    {props.post.approved
                    ? "Unapprove"
                    : "Approve"
                    }
                </div>
            )}
        else{
            return null
        }
    }
    return(
        <>
            <AdminVerify />
        </>
    )
}