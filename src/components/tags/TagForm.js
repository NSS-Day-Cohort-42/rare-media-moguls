import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { UserContext } from "../users/UserProvider"

export const TagForm = (props) => {
    const { createTag } = useContext(TagContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    const [tag, setTag] = useState({})

    const handleControlledInputChange = (eve) => {
        const newTag = Object.assign({}, tag)
        newTag[eve.target.name] = eve.target.value
        setTag(newTag)
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    const constructNewTag = () => {
        if (tag.label) {

            const newTagObject = {
                label: tag.label
            }
            createTag(newTagObject)
                .then(() => {
                    const newTag = {}
                    setTag(newTag)
                    document.getElementById("tagForm").reset()
                })

        } else {
            window.alert("please provide a tag label")
        }

    }

    return (
        <>
            { currentUser.is_staff === true ? (
                <form className="form new_tag_form" id="tagForm">
                    <h2 className="tagForm_label">Create a New Tag</h2>
                    <fieldset>
                        <div className="form-div">
                            <input type="text" name="label" required className="form-control tag-input" id="label"
                                proptype="varchar"
                                placeholder="tag"
                                defaultValue={tag.label}
                                onChange={handleControlledInputChange}>
                            </input>
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewTag()

                        }}
                        className="btn post_submit_btn">
                        Save Tag
            </button>
                </form>
            ) : (
                    <div></div>
                )}

        </>
    )

}