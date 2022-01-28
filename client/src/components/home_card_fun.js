import React from "react";
import {
    Container,
    Button,
    Card
} from "react-bootstrap";
import slide_vol from './imgs/community-work-day-flat-vector-illustration.jpg'
import slide_act from './imgs/act.jpeg'


const HomeCard = (props) => {
    return (
        <Card style={{ left: '0%', top: '80%', height: '30rem', width: '36rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button onClick={props.goToPayment} style={{ position: 'absolute', left: '0%', top: '90%' }} variant="dark" size="lg" block>Payment</Button>
            </Card.Body>
        </Card>

    )
}
export default HomeCard;
