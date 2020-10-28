import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NoAuthAppViews } from "./NoAuthAppViews"
import "./Rare.css"

export const Rare = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("rare_user_id")) {

                return (
                    <>
                    <Route render={props =>
                        <ApplicationViews
                        {...props}  />} />
                    </>
                )
            }
            else {
                return (
                    <>
                    <Route render={props =>
                        <NoAuthAppViews
                        {...props}  />} />
                    </>
                )
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login {...props} />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("rare_user_id")) {
                return <Redirect to="/" />
            }
            else {
                return <Register {...props}/>
            }
        }} />
    </>
)
