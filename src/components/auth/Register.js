import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {

    const [profileImg, setProfileImg] = useState('')

    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
        console.log(reader, "READER")
        console.log(file, "FILE")
    }

    const createProfileImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setProfileImg(base64ImageString)
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "profile_image_url": profileImg,
                "email": email.current.value,
                "password": password.current.value,
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
                    return res.json()})
                .then(res => {
                        localStorage.setItem("rare_token", res.token)
                        props.history.push("/rare")
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="register--contain" style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <div className="image_register"></div>
            <form className="form--login form--register" onSubmit={handleRegister}>
                <div className="input__wrapper">
                    <div className="input__container--left">
                        <input ref={first_name} type="text" name="first_name" className="form-control first_name" placeholder="First Name" autoComplete="off" spellCheck="off" autoFocus />

                        <input ref={last_name} type="text" name="last_name" className="form-control last_name" placeholder="Last Name" autoComplete="off" spellCheck="off" />
                        <input ref={email} type="email" name="email" className="form-control email" placeholder="Email" autoComplete="off" spellCheck="off" />
                    </div>

                    <div className="input__container--right">
                        <input ref={username} name="username" className="form-control username-register" placeholder="Username" autoComplete="off" spellCheck="off" />
                        <input ref={password} type="password" name="password" className="form-control pw-register" placeholder="Password" autoComplete="off" spellCheck="off" />
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control pw-verify" placeholder="Verify password" autoComplete="off" spellCheck="off" />
                        <textarea ref={bio} name="bio" className="form-control bio" placeholder="Bio" />
                        <input className="register-input" type="file" id="profile_image" onChange={(evt) => {createProfileImageJSON(evt)}}/>

                        <button className="btn login-button" type="submit">Register</button>
                        <section className="link--register">
                            Already registered? <Link className="link--register-clickable" to="/login">Login</Link>
                        </section>
                    </div>
                </div>

            </form>
        </main>
    )
}
