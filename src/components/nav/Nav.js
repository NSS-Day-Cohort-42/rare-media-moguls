import React, { useState, useEffect, useContext } from "react"
import "./Nav.css"
import Logo from "./rare_logo_diamond_transparent.png"
import { UserContext } from "../users/UserProvider"

export const Nav = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const {currentUser, getCurrentUser} = useContext(UserContext)
    const [pathname, setPathname] = useState("")

    useEffect(()=>{
        getCurrentUser()
    }, [])

    useEffect(()=>{
        if(localStorage.getItem("rare_token")!== null){
            setLoggedIn(true)
            if(currentUser.is_staff){
                setAdmin(true)
            }
            else{
                setAdmin(false)
            }
        }
        else{
            setLoggedIn(false)
        }
    }, [currentUser])

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link logo-wrapper left">
                    <div className="top-space"></div>
                    <div className="middle-wrap">
                        <img className="nav__logo"
                        to="/rare"
                        onClick={()=>{
                        props.history.push("/rare")}}
                        src={Logo} />
                        <div className="right-middle"></div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link wrapper__nav--right">
                        <div className={`${admin ? "admin-nav-link-wrap": "nav__link-wrapper"}`}>
                            <button
                            title="View All Posts"
                            className="btn nav__btn all-posts"
                            onClick={()=>props.history.push(`${loggedIn ? '/posts' : '/login'}`)}>
                                All Posts
                            </button>

                            {loggedIn
                            ?<>
                                <button
                                title="View My Posts"
                                className="btn nav__btn my-posts"
                                onClick={()=>props.history.push(`/posts/mine`)}>
                                    My Posts
                                </button>

                                <button
                                title={`${admin ? "Manage Categories" : "View Categories"}`}
                                className={`btn nav__btn ${admin ? "admin-categories" : "categories"}`}
                                onClick={()=>props.history.push("/categories")}>
                                    {admin ? "Category Manager" : "Categories"}
                                </button>

                                <button
                                title={`${admin ? "Manage Tags" : "View Tags"}`}
                                className={`btn nav__btn ${admin ? "admin-tags" : "tags"}`}
                                onClick={()=>props.history.push("/tags")}>
                                    {admin ? "Tag Manager" : "Tags"}
                                </button>

                                {admin ?<>
                                <button
                                className="btn nav__btn user-manager"
                                onClick={()=>props.history.push(`/users`)}>
                                    User Manager
                                </button> </>
                                : null
                                }
                            </>
                            : null
                            }
                            <button
                            title={`${loggedIn ? "Logout" : "Login"}`}
                            className={`btn nav__btn ${loggedIn ? "logout" :"get-started"}`}
                            onClick={() => {
                                if(loggedIn){
                                    handleLogout()
                                    props.history.push("/rare")
                                }
                                else{
                                    props.history.push("/login")
                                }
                            }}>
                                {loggedIn ? "Logout" : "Get Sarted"}
                            </button>

                        </div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}

