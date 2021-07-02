
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import axios from 'axios';

import { getStreets } from '../utils/memberutils'

class ExportCSV extends Component {

    render() { 
        return ( 
        <React.Fragment>
            	<br/>
            	<Container>
            		<Button variant="primary" type="submit" onClick={this.handleButtonClick}>
            		 	Export to CSV 
            		</Button>
            	<br/>
	    	<pre id="csv"></pre>
          	</Container>
        </React.Fragment>
        );
    }

    memberToCSV = (member) => {
        return member.MemberId + "," + member.Firstname + "," + member.Lastname + "," + member.HouseNo + "," + member.Street;
    }

    streetToCSV = (csv, street) => {
        
        street.members.forEach((m) => {
		csv += this.memberToCSV(m) + '\r\n';
        });

        return csv; 
    }

    saveToFile(membersCSV) {
        const file = new Blob([membersCSV], {type: 'application/octet-stream'});
        const a = document.createElement("a");
        const url = URL.createObjectURL(file); 
        a.href = url;
        a.download = "bpjm-members.csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }


    handleButtonClick = async (e) => {
	    e.preventDefault();

    	const res = await axios.get('/members');
        const members = res.data;
        const streets = getStreets(members, "");

    	var membersCSV = "ID,Firstname,Lastname,House,Street\r\n";

        streets.forEach((s) => {
            membersCSV = this.streetToCSV(membersCSV, s);
        });

        console.log(membersCSV);
        this.saveToFile(membersCSV);
    }
}

export default ExportCSV;