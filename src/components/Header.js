import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'))
    const navigate = useNavigate();
    const handleLogout = () => {
        // localStorage.removeItem('user-info');
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
                    <Nav className="me-auto ">
                        {user ?
                            <>
                                <NavLink to="/add" className="nav-link" >Add Product</NavLink>
                            </> :
                            <>
                                <NavLink to="/login" className="nav-link" >Login</NavLink>
                                <NavLink to="/register" className="nav-link" >Registration</NavLink>
                            </>
                        }
                    </Nav>
                    {user ?
                        <Nav>
                            <NavDropdown title={user.name}>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                    }

                </Container>
            </Navbar>
        </>
    )
}