import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import axios from 'axios'

class Home extends Component {
   
    state = {
        stats: {},
        error: ""
      };

    async componentDidMount() {
        try {
          const res = await axios.get('/stats');
          this.setState({members: res.data, error: ""});
        } catch (e) {
          this.setState({error: e.message});
          console.error(e);
        }
      }

    render()  {
        const displayName = localStorage.user_displayName;

        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Welcome to MCE - Muslims Centre of Excellence {displayName}</h1>
                    <p>
                    </p>
                    <br></br>
                    <p>
                        For information about getting access to this application please contact <a href="mailto:naeemanaeem@gmail.com">MCE</a>
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default Home;