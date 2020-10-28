import React from "react"
import "./Category.css"

export const CategoriesList = (props) => {
    return (
        <>
        <div className="catListContainer">
            <button 
                className="btn addCategoryBtn"
                onClick={() => props.history.push("/categories/create")}>
                    Add New Category
            </button>

        </div>
        </>
    )
}