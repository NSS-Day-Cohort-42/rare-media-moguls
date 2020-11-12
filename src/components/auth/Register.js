import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {
    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const profile_image_url = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "profile_image_url": profile_image_url.current.value,
                "bio": bio.current.value,
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => {
                    console.log(res, "RESPONSE")
                    return res.json()})
                .then(res => {
                        localStorage.setItem("rare_user_id", res.user_id)
                        localStorage.setItem("rare_token", res.token)
                        props.history.push("/")
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="Ryan" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Mogul" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="media@mogul.com" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} name="username" className="form-control" placeholder="raremogul426" />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input ref={bio} name="bio" className="form-control" placeholder="A little bit about me..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_image_url"> Profile Image </label>
                    <input ref={profile_image_url} name="profile_image_url" className="form-control" placeholder="URL" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
