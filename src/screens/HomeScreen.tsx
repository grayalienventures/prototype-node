import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, Row, Col, Image, Carousel } from 'react-bootstrap'




const sectionWhy = () => {
    return (
        <div className="centerX front-page-section home_page_section">
            <Row><Col md={12}><h2 className="text-center">Why App?</h2></Col></Row>
            <Row>
                <Col>
                    <h4>Title</h4>
                    <Image
                        style={{ width: 100, height: 100 }}
                        src={require("../assets/images/homepage_calendar.png")}
                        className="app_play_store_large" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nemo nimium beatus est Duo   </p>
                </Col>
                <Col>
                    <h4>Title</h4>
                    <Image
                        style={{ width: 100, height: 100 }}
                        src={require("../assets/images/homepage_cash.png")}
                        className="app_play_store_large" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid de Platone aut de Democrito loquar. </p>
                </Col>
                <Col>
                    <h4>Title</h4>
                    <Image
                        style={{ width: 100, height: 100 }}
                        src={require("../assets/images/homepage_tools.png")}
                        className="app_play_store_large" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At multis malis affectus. </p>
                </Col>
            </Row>
        </div>
    )
}

const testimonials = () => {
    return (
        <div id="testimonials_section" className="centerX home_page_section">
            <Row><Col md={12}><h2 className="text-center">Testimonials</h2></Col></Row>
            <Row className="text-center ">
                <Carousel className="col-md-12">
                    <Carousel.Item>
                        <div
                            className="testimonial_section">
                            <img
                                className="testimonial_image"
                                src={require("../assets/images/anna_doe.jpg")}
                                alt="Anna Doe." />
                        </div>
                        <Carousel.Caption>
                            <h3>Anna Doe.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="testimonial_image"
                            src={require("../assets/images/anna_doe1.jpg")}
                            alt="Anna Doe." />
                        <Carousel.Caption>
                            <h3>Anna Doe.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="testimonial_image"
                            src={require("../assets/images/jonathan_doe.jpg")}
                            alt="Jonathan Doe." />
                        <Carousel.Caption>
                            <h3>Jonathan Doe.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
        </div>
    )
}

const installApp = () => {
    return (
        <div className="home_page_section centerX" >
            <Row> <Col md={12}><h2 className="text-center">Download Apps</h2></Col></Row>
            <a href="https://apps.apple.com/us/app/">
                <Image
                    src={require("../assets/images/app_store_icon.jpg")}
                    className="app_play_store_large image_link" />
            </a>
            <a href="https://play.google.com/store/apps">
                <Image
                    src={require("../assets/images/play_store_icon.jpg")}
                    className="app_play_store_large image_link" />
            </a>
        </div>
    )
}

const HomeScreen = () => {
    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4"></hr>
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p>
            </div>
            {sectionWhy()}
            {testimonials()}
            {installApp()}
        </>
    )
}

export default HomeScreen
