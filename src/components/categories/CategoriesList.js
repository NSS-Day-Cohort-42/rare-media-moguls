import React, { useContext, useEffect, useState } from "react"
import { Category } from "./Category"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoriesList = (props) => {
    const {categories, getCategories} = useContext(CategoryContext)
    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <section className="categories">
                <button className="btn add-cat-btn" onClick={() => props.history.push("/categories/create")}>
                    Add New Category
                </button>
                
                <div className="list cat-list-cont">
                    {categories.map(c => {
                        return <Category
                        key={c.id}
                        category={c}
                        {...props} />
                        }).reverse()
                    }
                </div>
            </section>
        </>
    )
}
