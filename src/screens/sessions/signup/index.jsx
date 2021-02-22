import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './signup.css';
import { UserRegister } from '../../../apis/signupApi';
import database from '../../../config/firebase';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Signup_Component = (props) => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorPasswordState, setErrorPasswordState] = useState(false);
    const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [verificationMessageTimeOut, setVerificationMessageTimeOut] = useState(false);
    const history = useHistory();


    useEffect(() => {
        console.log('verificationMessageTimeOut',verificationMessageTimeOut);
        if (verificationMessageTimeOut === true) {
            setInterval(() => {
                setVerificationMessageTimeOut(false);
            }, 3000);
        }
    }, [verificationMessageTimeOut])

    const submitUserDetail = (name, email, password) => {
        setLoading(true);
        UserRegister(name, email, password).then((result) => {
            console.log('user', result);
            database.auth().currentUser.sendEmailVerification().then(() => {
                setVerificationMessageTimeOut(true);
                setVerificationMessage('Please verify your email address ');
                console.log('verification func')
            })
            database.database().ref(`users/${result.user.uid}`).set({
                id: result.user.uid,
                name: name,
                email: email,
                url: '',
                online: false
            })
                .then(() => {
                    alert(`user registerd successfully`);
                    setUserName('');
                    setUserEmail('');
                    setUserPassword('');
                    setLoading(false);

                })
                .catch((error) => {
                    console.log('error', error);
                })
        })
            .catch((error) => {
                console.log('error', error.message);
            })
    }

    const handleName = (ev) => {
        setUserName(ev.target.value);
    }

    const handleEmail = (ev) => {
        setUserEmail(ev.target.value);
        let email_isValid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim).test(ev.target.value);
        if (ev.target.value !== '') {
            if (email_isValid) {
                setErrorMessage('');
                setErrorState(false);
            }
            else {
                setErrorMessage('Please provide valid email');
                setErrorState(true);
            }
        }
        else {
            setErrorState(true);
            setErrorMessage('Email is required')
        }
    }

    const handlePassword = (ev) => {
        setUserPassword(ev.target.value);
        let checkPassword = ev.target.value;
        if (checkPassword !== '') {
            if (checkPassword.length > 6) {
                setErrorPasswordState(true);
                setErrorPasswordMessage('Password must contain less 7 letter long');
            }
            else if (checkPassword.length < 4) {
                setErrorPasswordState(true);
                setErrorPasswordMessage('Password must contain 6 letter long ');
            }
            else {
                setErrorPasswordState(false);
                setErrorPasswordMessage('');
            }
        }
        else {
            setErrorPasswordState(true);
            setErrorPasswordMessage('Password is requird');
        }
    }

    const signupForm = () => {
        return <div className="signup-form">
            <h3>Create Account</h3>
            <div className="signup-fields">
                <TextField
                    label="Username"
                    variant="outlined"
                    type="text"
                    name="username"
                    value={userName}
                    onChange={handleName}
                    fullWidth
                />
            </div>
            <div className="signup-fields">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={userEmail}
                    onChange={handleEmail}
                    error={errorState ? true : false}
                    helperText={errorState ? <span>{errorMessage}</span> : ''}
                    fullWidth
                />
            </div>
            <div className="signup-fields">
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={userPassword}
                    onChange={handlePassword}
                    type="password"
                    error={errorPasswordState ? true : false}
                    helperText={errorPasswordState ? <span>{errorPasswordMessage}</span> : ''}
                    fullWidth
                />
            </div>
            <div>
                <Button variant="contained"
                    className="signup-btn"
                    color="primary"
                    size="large"
                    disabled={userName.length === 0 || userEmail.length === 0 || userPassword.length === 0 || loading === true || errorState === true || errorPasswordState === true ? true : false}
                    onClick={() => submitUserDetail(userName, userEmail, userPassword)}
                    fullWidth>
                    Signup
                    <CircularProgress size={20} style={{ display: loading ? 'block' : 'none' }} />
                </Button>
            </div>
            <div className="advice-container">
                <p>Already have an account</p>
                <div>
                    <Button variant="contained"
                        className="signup-btn"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={props.onStateChange}
                    >
                        Login
                </Button>
                    <p style={{color:'#ffc107',fontSize:'16px'}}>{verificationMessageTimeOut ? `${verificationMessage}` : ''}</p>
                </div>
            </div>
        </div>
    }
    return (
        <div className="signup-main-container">
            {signupForm()}
        </div>
    )
}
export default Signup_Component;