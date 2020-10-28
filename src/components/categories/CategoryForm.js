import React, {useContext, useState, useEffect} from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const CategoryForm = (props) => {
    const {addCategory} = useContext(CategoryContext)

    const [category, setCategory] = useState({})

    const handleControlledInputChange = (event) => {
        const newCategory = Object.assign({}, category)
        newCategory[event.target.name] = event.target.value
        setCategory(newCategory)
    }

    const constructNewCategory = () => {
        addCategory({
            category: category.category
        })
        .then(()=> props.history.push("/categories"))
    }

    return (
        <form className="form categoryForm">
            <h2 className="categoryForm_title">Add New Category</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="category" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Category Name"
                        defaultValue={category.category}
                        onChange={handleControlledInputChange}
                        />
                </div>
            </fieldset>
            <button type="submit" className="btn saveCategoryButton" onClick= {evt => {
                evt.preventDefault()
                constructNewCategory()
            }}>Save</button>
        </form>
    )
}