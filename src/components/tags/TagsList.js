import React, { useContext, useEffect, useState } from "react"
import { Tag } from "./Tag"
import { TagContext } from "./TagProvider"
import { TagForm } from "./TagForm"
import "./Tag.css"

export const TagsList = (props) => {
    const {tags, getTags} = useContext(TagContext)
    const [isHidden, setIsHidden] = useState(true)

    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
            <section className="tags">

                <TagForm
                isHidden={isHidden}
                setIsHidden={setIsHidden}
                {...props} />
                <button 
                    className="btn"
                    onClick={()=>{
                    setIsHidden(false)}}>
                    Add New Tag
                </button>

               {
                   tags.map(tag => {
                    return <Tag key={tag.id} tag={tag} {...props} />
                   }).reverse()
               }
           </section>
        </>
    )
}