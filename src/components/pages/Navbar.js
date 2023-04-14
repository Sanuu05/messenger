import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
function Navbar() {
    return (
        <div className="navs">
            <nav style={{
                }}>
                <div class="nav-wrapper #252446  darken-3 white-text text-darken-2" >
                    <Link to="/" class="brand-logo left"><img src={logo} alt="pic" style={{
                        width:"50px"
                    }} /></Link>
                    <ul id="nav-mobile white-text text-darken-2" class="right">
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
