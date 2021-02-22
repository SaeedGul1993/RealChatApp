import React from 'react';
import './session.css';
import Login_Component from './login/index';
import Signup_Component from './signup/index';


class Session_Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFormState: false
        }
    }
    changeStateOfComponent = () => {
        console.log('hit')
        this.setState({
            loginFormState:!this.state.loginFormState
        })
    }
    render() {
        return (
            <div className="session-main-container">
                {this.state.loginFormState ? <Signup_Component onStateChange={this.changeStateOfComponent} /> : <Login_Component onState={this.changeStateOfComponent} />}
            </div>
        )
    }
}
export default Session_Component;