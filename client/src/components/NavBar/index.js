import React from "react";
import { Navbar, NavItem } from "react-materialize";

export default () => (
    <Navbar brand="Google Books" className="violet lighten-3" right fixed>
        <NavItem href="/search">Search</NavItem>
        <NavItem href="/saved">Saved Books</NavItem>
    </Navbar>
)