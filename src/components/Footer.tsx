import React, { useState, useEffect } from 'react'

import { Navbar, Nav, NavDropdown, Form, Image, Button } from 'react-bootstrap'

export type IFooterProps = {

}


const Footer: React.FC<IFooterProps> = (props) => {

    const browserDate = () => {
        let d = new Date()
        return d.getFullYear()
    }



    return (
        <div className="App-footer">
            <Navbar bg="light" expand="lg">
                <Nav className="mr-auto">
                    <Nav.Link href="http://intp.io">Copyright &copy;2011-{browserDate()} Built by Gray Alien Ventures</Nav.Link>
                    <Nav.Link href="/terms">Terms</Nav.Link>
                </Nav>
                <Form inline>
                    <Image
                        src={require("../assets/images/social_fb.png")}

                        className="social_icon image_link" />
                    <Image
                        src={require("../assets/images/social_twitter.png")}

                        className="social_icon image_link" />
                    <Image
                        src={require("../assets/images/social_ig.png")}

                        className="social_icon image_link" />
                    <Image
                        src={require("../assets/images/social_li.png")}

                        className="social_icon image_link" />
                </Form>
            </Navbar>
        </div>
    )

}

export default Footer