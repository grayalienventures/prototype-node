import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, Image, Button, FormControl } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom'
import * as _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import config from '../constants/config';
import { IAppState } from '../redux/reducers';
import { logOut } from '../redux/actions/authActions';
import images from '../constants/images';

const NavLink: React.FunctionComponent<{
  children: React.ReactNode
  to?: string
  onClick?(e: any): void
  className?: string
}> = (props): JSX.Element => {
  // Conditionally wrapping content into a link
  const ContentTag = props.to ? Link : 'div';
  return (
    <ContentTag to={props.to} onClick={(e) => {
      e.preventDefault()
      if (props.onClick) {
        props.onClick(e)
      }
    }} className={props.className} >{props.children}</ContentTag>
  );
}
export type InavbarProps = {

}


const CustomNavbar: React.FC<InavbarProps> = ({ }) => {
  let auth = useSelector((state: IAppState) => state.auth)
  let history = useHistory()
  const [expanded, setExpanded] = React.useState(false);

  const onClickLogOut = (event) => {
    event.preventDefault();
    logOut()
    setExpanded(false)
  };

  /**
   * 
   * @param path 
   */
  const naviagte = (path: string): void => {
    setExpanded(false)
    history.push({
      pathname: `${path}`
    });
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark"
        expanded={expanded}
        onToggle={() => {
          setExpanded(!expanded)
        }} >
        <Navbar.Brand href="/">{config.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" onClick={() => { naviagte("/home") }} to='/home'>Home</NavLink>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {(!_.has(auth, "token") || !auth.token)
              ? <NavLink className="nav-link" onClick={() => { naviagte("/login") }} to='/login'>Login</NavLink>
              :
              <NavDropdown
                alignRight
                title={
                  <Image src={(auth && auth.userData && auth.userData.profilePic) ? auth.userData.profilePic : images.defaultUser}
                    className="profile_img_thumbnail"
                    roundedCircle
                    thumbnail={true}
                  />}
                id="basic-nav-dropdown-login">
                <NavLink className="dropdown-item " onClick={() => { naviagte("/profile") }} to='/profile'><i className="fa fa-user"></i> My Profile</NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onClickLogOut} href="#"><i className="fa fa-sign-out"></i> Log Out</NavDropdown.Item>
              </NavDropdown>
            }

          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </>
  );

}


export default CustomNavbar

