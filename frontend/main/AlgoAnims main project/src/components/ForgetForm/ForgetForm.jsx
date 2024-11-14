import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import './forgetpass.css'
import logo from '/logo.png'
import { getGlobalApi } from '../getGlobalApi'
const ForgetForm = () => {
    const location = useLocation();
    const path = location.pathname || {};
    const navigate = useNavigate()
    const [obj, setobj] = useState([]);
    const [email, setemail] = useState("")
    const [btnDisabled, setbtnDisabled] = useState(true)

    const [emailColor, setemailColor] = useState("text-red-500");
    const [emailMsg, setemailMsg] = useState("invalid email");
    const [emailtick, setemailtick] = useState("X");

    async function getData() {
        const api = await fetch(`${getGlobalApi()}/api/signup`);
        const data = await api.json();
        console.log(data)
        setobj(data);
    }
    useState(() => {
        getData();
    }, [])

    function forEmail(evt) {
        let value = evt.target.value;
        setemail(value);

        let getemail = false;
        for (let obj2 of obj) {
            if (obj2.email == value) {
                getemail = true;
                break;
            }
        }

        if (!getemail) {
            setemailColor("text-red-500");
            setemailMsg("invalid email");
            setemailtick("X");
        } else {
            setemailColor("text-green-500");
            setemailMsg("valid");
            setemailtick("✔");
            setbtnDisabled(false);
        }
    }

    function sendmail(evt) {
        evt.preventDefault();
        if (emailtick == '✔') {
            let data;
            if (path.includes('username')) {
                data = {
                    username: "find",
                    email: email
                }
            } else if (path.includes('password')) {
                data = {
                    password: "find",
                    email: email
                }
            }

            fetch(`${getGlobalApi()}/user/forgetform`, {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            })

            localStorage.setItem("email", email);

            const str = path.includes('username') ? "username" : "password"; 
            navigate(`/login/forget${str}/mail`)

        }
    }

    return (
        <>
            <div className="body bg-zinc-900">

                <div className="login-container bg-zinc-900">

                    <header className="algoanims-heading">
                        AlgoAnims
                    </header>

                    <div className="form-container">

                        <div className="login-box" >
                            <div className="logo-forget">
                                <img src={logo} alt="Logo" />
                            </div>
                            <form className="login-form forget-form"
                                onSubmit={sendmail}>

                                <div className="container-forget ">

                                    <div className="fileds-tick">
                                        <div className="fileds">
                                            <input
                                                value={email}
                                                onChange={(evt) => {
                                                    forEmail(evt);
                                                }}
                                                type="email"
                                                placeholder="Email"
                                                required
                                            />
                                            {email.length > 0 ? <input
                                                readOnly
                                                value={emailtick}
                                                className={`${emailColor}`}
                                                type="text" /> : <></>}
                                        </div>
                                        {email.length > 0 && emailMsg != 'valid' ? <small
                                            className={`${emailColor}`}>{emailMsg}</small> : <></>}
                                    </div>

                                    <button
                                        className='bg-blue-400 p-2 rounded-md'
                                        disabled={btnDisabled}
                                        type='submit' >
                                        send mail
                                    </button>


                                </div>




                            </form>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgetForm