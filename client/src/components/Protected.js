import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Protected({ Component }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <Component />
        </>
    )
}