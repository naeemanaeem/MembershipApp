import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel';


import {
  Container,
  Button,
  Card
} from "react-bootstrap";

import { useHistory } from 'react-router-dom'

import axios from 'axios'
import mhma from './imgs/MHMA.png'
import vol from './imgs/vol.jpeg'
import pay from './imgs/pay.png'
import act from './imgs/images.jpeg'
import slide_vol from './imgs/community-work-day-flat-vector-illustration.jpg'


function Home({ name, ...props }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const goToVolunteer = (params) => {
    let path = `Volunteer`;
    history.push(path);
  }
  const goToPayment = (params) => {
    let path = `payment`;
    history.push(path);
  }
  const goToActivities = (params) => {
    let path = `activities`;
    history.push(path);
  }

  const displayName = localStorage.user_displayName;

  return (

    <div>
      <Container>
        <h1>Welcome to MCE - Muslims Centre of Excellence </h1>
        <h2 class="text-center">You Are {displayName}</h2>
        <br></br>

        <h5 class="text-center">
          Mountain House Muslim Association is a local non-profit focused on serving the Muslim community in Mountain House. </h5>

      </Container>

      <Card style={{ position: 'absolute', left: '0%', top: '40%', height: '30rem', width: '36rem' }}>
        <Card.Img variant="top" src={pay} />
        <Card.Body>
          <Card.Title>Make Payment</Card.Title>
          <Card.Text>
            Make a payment for MHMA membership fees, zakat, masjid donation, or sadaqah.
          </Card.Text>
          <Button onClick={goToPayment} style={{ position: 'absolute', left: '0%', top: '90%' }} variant="dark" size="lg" block>Payment</Button>
        </Card.Body>
      </Card>
      <Card style={{ position: 'absolute', left: '34%', top: '40%', height: '30rem', width: '36rem' }}>
        <Card.Img style={{ width: '570px', height: '300px' }} variant="top" src={vol} />
        <Card.Body>
          <Card.Title>Volunteer</Card.Title>
          <Card.Text>
            Volunteer for MHMA events, such as Sunday School setup/cleanup or youth soccer referee.
          </Card.Text>
          <Button onClick={goToVolunteer} style={{ position: 'absolute', left: '0%', top: '90%' }} variant="dark" size="lg" block>Volunteer</Button>
        </Card.Body>
      </Card>
      <Card style={{ position: 'absolute', left: '68%', top: '40%', height: '30rem', width: '36rem' }}>
        <Card.Img style={{ width: '575px', height: '300px' }} variant="top" src={act} />
        <Card.Body>
          <Card.Title>Activities</Card.Title>
          <Card.Text>
            Sign Up for MHMA Activities, such as Youth Soccer, Tafseer-E-Quran, or COVID Vaccination.
          </Card.Text>
          <Button onClick={goToActivities} style={{ position: 'absolute', left: '0%', top: '90%' }} variant="dark" size="lg" block>Activities</Button>
        </Card.Body>
      </Card>

      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{
              width: '200px', height: '250px'
              //,hasMargin ({ marginLeft, '0.8rem': }) 
            }}
            src={slide_vol}
            alt="First slide"
          />

          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </div>
  );



}


export default Home;