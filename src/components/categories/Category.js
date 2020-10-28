import React, { useState } from "react"
import "./Category.css"

export const Category = ( props ) => {
    return (
        <>
            <div className="category-item">
                <div className="cat-name">
                    {props.category.category}
                </div>
                <div className="btn-group">
                    <button className=" btn editTagButton">
                        Edit
                    </button>
                    <button className="btn deleteTagButton">
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}