// By Khasir Hean

import React from 'react';

var AccountCreationComponent = React.createClass({
    getInitialState(){
        // Name is the input (ie. the name of the new account)
        // Message is the success state
        return {
            name : "",
            message : ""
        }
    },

    // Keep track of the current input
    handleChange(e){
        e.preventDefault();
        this.setState({name : e.target.value, message : "..."});
    },

    // Callback when button is clicked
    handleSubmit(e){
        e.preventDefault();

        // Create new account with the passed name
        fetch("http://localhost:8080/accountCreation/createAccount?userName=" + this.state.name, {
            method: "POST",
            headers: {"Content-Type" : "application/JSON"}
        }).then(response => {
            // Account creation successful
            if(response.ok){
                this.setState({message : "Account creation successful!"});
            }

            // Account already exists
            else{
                this.setState({message : "The account for " + this.state.name + " already exists."});
            }
        });
    },

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
                Name: {this.state.name}<br />
                Message: {this.state.message}
            </div>
        );
    }
});

export class AccountCreation extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <AccountCreationComponent />
        );
    }
}
