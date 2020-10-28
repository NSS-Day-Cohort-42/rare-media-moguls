import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Nav.css"
import Logo from "./rare_logo_diamond_transparent.png"
import { UserDropdown } from "./UserDropdown"

export const Nav = (props) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const toggleOpen = () => {
        if (isOpen) {
            setIsOpen(false)
        }
        else {
            setIsOpen(true)
        }
    }

    const checkAuth = () => {
        if (localStorage.getItem("rare_user_id")) {
            return true
    } return false
}

    useEffect(()=>{
        if(localStorage.getItem("rare_user_id") !== null){
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
    }, [])

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link nav__link logo-wrapper left">
                    <div className="top-space"></div>
                    <div className="middle-wrap">
                        <img className="nav__logo"
                        to="/"
                        onClick={()=>{
                        props.history.push("/")}}
                        src={Logo} />
                        <div className="right-middle"></div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--middle"></div>
                <div className="link nav__link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link nav__link wrapper__nav--right">
                        <div className="nav__link-wrapper post-wrapper">
                            {
                                checkAuth() ?
                                <Link
                                    className="link nav__link posts-link"
                                    to="/">
                                    posts
                                </Link>
                                : null
                            }
                            
                        </div>
                        {loggedIn
                        ?
                        <div className="user-menu-btn"
                        onClick={toggleOpen}>
                            <div className={`arrow ${isOpen ? "upArrow" : "downArrow"}`}></div>
                        </div>
                        :
                        <Link className="link nav__link get-started"
                        to="/login">
                            get started
                        </Link>
                        }
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className={`dropdown ${isOpen ? "dropdown--open" : "dropdown--collapsed" }`}>
                    <UserDropdown
                    toggleOpen={toggleOpen}
                    {...props}/>
                </div>

                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}

