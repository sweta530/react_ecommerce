import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    async function loginSubmit() {
        let data = { email, password };
        let result = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = await result.json();
        if (result.user) {
            console.log("User Login : ", result.user);
            localStorage.setItem("user-info", JSON.stringify(result.user));
            navigate('/');
        } else {
            setValidate(result.message)
        }

    }

    return (
        <>
            <h1>Login Page</h1>
            <div className='col-sm-4 offset-sm-4'>

                <input type="email" placeholder="Email" className='form-control m-4'
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" className='form-control m-4'
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary" onClick={loginSubmit} >Sign in</button> <br /><br />

                {
                    validate ?
                        <div class="alert alert-danger" role="alert">
                            {validate}
                        </div> :
                        null
                }

            </div>
        </>
    )
}
