import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"
import { UserImageForm } from "../users/UserImageForm";

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
    }

    const createProfileImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setProfileImg(base64ImageString)
            // Update a component state variable to the value of base64ImageString
        });
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "profile_image": profileImg,
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
                    <input ref={first_name} type="text" name="first_name" className="form-control" placeholder="Ex: Ryan" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input ref={last_name} type="text" name="last_name" className="form-control" placeholder="Ex: Mogul" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Ex: media@mogul.com" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} name="username" className="form-control" placeholder="Ex: raremogul426" />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input ref={bio} name="bio" className="form-control" placeholder="A little bit about yourself..." />
                </fieldset>
                <fieldset>
                    <label htmlFor="profile_image_url"> Profile Image </label>
                    <input className="profile_image_url" type="file" id="profile_image" onChange={(evt) => {createProfileImageJSON(evt)}}/>
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
