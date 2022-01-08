import React, { Component } from 'react';
import { useState, useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import HomeCard from './home_card_fun';

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
import slide_act from './imgs/act.jpeg'


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
  const data = [{ title: "Make Payment", description: "Make a payment for MHMA membership fees, zakat, masjid donation, or sadaqah.", image: pay }, { title: "Activities", description: "Sign Up for MHMA Activities, such as Youth Soccer, Tafseer-E-Quran, or COVID Vaccination.", image: act }, { title: "Volunteer", description: "Volunteer for MHMA events, such as Sunday School setup/cleanup or youth soccer referee.", image: vol }];
  return (
    <Container>
      <h1>Welcome to MCE - Muslims Centre of Excellence </h1>
      <h2 class="text-center">You Are {displayName}</h2>
      <br></br>

      <h5 class="text-center">
        Mountain House Muslim Association is a local non-profit focused on serving the Muslim community in Mountain House. </h5>


      <Carousel fade style={{ marginBottom: "50px", width: "100%", alignSelf: "center" }}>
        <Carousel.Item>
          <img
            //style={{ width: '100%', height: '350px' }}
            src={slide_vol}
            alt="First TEST slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{
              width: '100%', height: '350px'
            }}
            src={slide_act}
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
            style={{
              width: '1950px', height: '350px'
            }}
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {data.map(value =>
          <HomeCard style={{ margin: "5px" }} title={value.title} description={value.description} image={value.image} goToPayment={goToPayment} />)}
      </div>

    </Container>
  );



}


export default Home;