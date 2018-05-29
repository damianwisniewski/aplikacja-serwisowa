import React from 'react';
import "./navbar.css";

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg">
            <ul className="navbar-nav ml-auto">
                {props.children}
            </ul>
        </nav>
    );

}

export default Navbar;