import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    async function register() {
        let data = { name, email, password };
        let result = await fetch("http://localhost:8080/api/users/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = await result.json();
        console.log("User Registered : ", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate('/');
    }

    return (
        <>
            <h1>Registration Page</h1>
            <div className='col-sm-4 offset-sm-4'>

                <input type="text" placeholder="Name" className='form-control m-4'
                    value={name} onChange={(e) => setName(e.target.value)} />

                <input type="email" placeholder="Email" className='form-control m-4'
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" placeholder="Password" className='form-control m-4'
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary" onClick={register} >Sign Up</button>

            </div>
        </>
    )
}
