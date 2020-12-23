import React, { useContext, useState, useEffect } from "react"
import { PostTagContext } from "./PostTagProvider"
import { TagContext } from "../tags/TagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"
export const PostTags = (props) => {
    const { postTags, getPostTagsByPost } = useContext(PostTagContext)
    const { tags, getTags } = useContext(TagContext)
    const [isEditing, setIsEditing] = useState(false)
    const postTagIds = postTags.map(tag => tag.tag_id)

    useEffect(() => {
        if (props.postId > 0){
            getPostTagsByPost(props.postId)
        }

    }, [props.postId, tags]);

    useEffect(() => {
        getTags()
    },[])

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        if(isEditing){
            getTags()
        }
        else{
            getPostTagsByPost(props.postId)
        }
    }

    return (
        <div className="post-tags-container">
            <h3 className="post-tags-header">
                TAGGED AS
            </h3>
            {props.isUserAuthor
            ? <button className="edit-post-tags-bttn" onClick={toggleEdit}>
                manage tags
            </button>
            : null
            }
            {isEditing
            ? tags.map(tag => {
                return <EditPostTags
                tag={tag}
                postTagIds={postTagIds}
                postId={props.postId}
                postTags={postTags}
                key={tag.id} />
            })

            : postTags.map(singlePostTag => {
                return <CurrentPostTags
                singlePostTag={singlePostTag}
                key={singlePostTag.id} />
            })
            }
        </div>
    )
}