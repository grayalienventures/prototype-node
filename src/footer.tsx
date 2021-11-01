import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import * as actions from './actions'
import store from './store'
import { Navbar, Nav, NavDropdown, Form, Image, Button } from 'react-bootstrap'



class Footer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {

    }
    browserDate = () => {
        let d = new Date()
        return d.getFullYear()
    }

    render() {

        return (
            <div className="App-footer">
                <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                        <Nav.Link href="http://intp.io">Copyright &copy;2011-{this.browserDate()} Built by Gray Alien Ventures</Nav.Link>
                        <Nav.Link href="/terms">Terms</Nav.Link>
                    </Nav>
                   <Form inline>
                        <Image
                            src={require("./assets/images/social_fb.png")}

                            className="social_icon image_link" />
                        <Image
                            src={require("./assets/images/social_twitter.png")}

                            className="social_icon image_link" />
                        <Image
                            src={require("./assets/images/social_ig.png")}

                            className="social_icon image_link" />
                        <Image
                            src={require("./assets/images/social_li.png")}

                            className="social_icon image_link" />
                    </Form>
                </Navbar>
            </div>
        )
    }
}

export default Footer