import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="navs">
            <nav style={{
                }}>
                <div class="nav-wrapper #252446  darken-3 white-text text-darken-2" >
                    <Link to="/" class="brand-logo left"><img src="https://www.aurigait.com/resources/files/2017/01/256-256-c8b6cbadb620f8b3f588bf53464c8ab9.png" alt="pic" style={{
                        width:"50px"
                    }} /></Link>
                    <ul id="nav-mobile white-text text-darken-2" class="right">
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        {/* <li><Link to="collapsible.html">JavaScript</Link></li> */}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
