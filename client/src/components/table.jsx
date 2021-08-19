import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './table.css';

// class Table extends Component {
//    constructor(props) {
//       super(props) 
//       this.state = { 
//          people: [
//             { id: 1, name: 'Wasif', age: 21, email: 'null' },
//             { id: 2, name: 'Ali', age: 19, email: 'null' },
//             { id: 3, name: 'Saad', age: 16, email: 'null' },
//             { id: 4, name: 'Asad', age: 25, email: 'null' }
//          ]
//       }
//    }

//  renderTableData() {
//     return this.state.people.map((people, index) => {
//        const { id, name, age, email } = people //destructuring
//        return (
//           <tr key={id}>
//              <td>{id}</td>
//              <td>{name}</td>
//              <td>{age}</td>
//              <td>{email}</td>
//           </tr>
//        )
//     })
//  }

//  render() {
//     return (
//        <div>
//           <h1 id='title'>React Dynamic Table</h1>
//           <table id='students'>
//              <tbody>
//                 {this.renderTableData()}
//              </tbody>
//           </table>
//        </div>
//     )
//  }
// }
// export default Table 

class Table extends Component {
    state = {
        date: new Date()
      };
    constructor(props) {
       super(props)
       this.state = {
          payments: [
             { id: 1, date: '11/17/21', description: 'Subscription Fee', method: 'Bank Deposit', amount: '$30.00' },
             { id: 1, date: '12/2/21', description: 'Donation', method: 'PayPal', amount: '$500.00' },
             { id: 2, date: '12/21/21', description: 'Sadaqah', method: 'Zelle', amount: '$25.00' },
             { id: 3, date: '1/23/22', description: 'Sadaqah', method: 'Venmo', amount: '$50.00' },
             { id: 4, date: '2/14/22', description: 'Donation', method: 'Bank Deposit', amount: '$1450.00' }
          ]
       }
    }
 
    renderTableHeader() {
       let header = Object.keys(this.state.payments[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return this.state.payments.map((person, index) => {
          const { id, date, description, method, amount } = person //destructuring
          return (
             <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td>{description}</td>
                <td>{method}</td>
                <td>{amount}</td>
             </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <table id='students'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
          </div>
       )
    }
 }
 
 export default Table;
