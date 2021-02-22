import React, { useState, useEffect } from 'react';
import './messageBox.css';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import user from '../assets/images/user.png';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { sendMessageApiForReciever, sendMessageApiForSender } from '../apis/sendMessageApi';
import { getMessagesByIds } from '../Redux/actions/getMessagesAction';
import { getMessagesClasses } from '../Redux/actions/getClassesAction';
import { sendTypingAlert } from '../apis/messageTypingApi';
import { getTypingAlertAction } from '../Redux/actions/getTypingAlertAction';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructer');
        this.state = {
            message: '',
            changeState: ''
        }
    }
    componentDidMount() {
        this.props.getMessages(this.props.senderID, this.props.recieverID);
        this.props.getClasses(this.props.senderID, this.props.recieverID);
        console.log('props in message component', this.props.allMessages);
        console.log('props in message component Classes', this.props.allClasses);
        // this.props.getTypingAlert(this.props.recieverID, this.props.senderID);
        console.log('data',this.props.data);

        this.scrollToBottom();
    }

    handleMessage = (ev) => {
        console.log('write messsage', ev.target.value)
        this.setState({
            message: ev.target.value
        })
    }

    sendMessage = (ev) => {
        ev.preventDefault();
        sendMessageApiForReciever(this.state.message, this.props.recieverID, this.props.senderID)
            .then(() => {
                sendMessageApiForSender(this.state.message, this.props.recieverID, this.props.senderID)
                    .then(() => {
                        this.setState({
                            message: ''
                        })
                        this.scrollToBottom();
                    })
                    .catch((err) => {
                        console.log('err', err);
                    })
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    handleFocus = (event) => {
        console.log('focus', event);
        sendTypingAlert(true, this.props.recieverID, this.props.senderID)
            .then(() => {
                console.log('user is typing .....');
                this.setState({
                    changeState: ''
                })
                console.log('typing alert', this.props.typing);
                console.log('typing Id', this.props.typerId);
                console.log('logged in user id', this.props.data.id);
                console.log('typing state', this.props.data.id === this.props.typerId);
            })
            .catch((err) => {
                console.log('err', err)
            })
    }
    handleBlur = (event) => {
        console.log('blur', event);
        sendTypingAlert(false, this.props.recieverID, this.props.senderID)
            .then(() => {
                console.log(' user is not typing .....');
                this.setState({
                    changeState: ''
                })
                console.log('typing alert', this.props.typing);
                console.log('typing Id', this.props.typerId);
                console.log('logged in user id', this.props.data.id);

            })
            .catch((err) => {
                console.log('err', err)
            })
    }

    messageContainer = () => {
        return (
            <div className="sub-message-container">
                <div className="header">
                    {this.props.data.online === true ?
                        <div className="online-show-message-div">
                            <FiberManualRecordIcon
                                fontSize={'small'}
                                style={{ color: 'green' }} />
                        </div> :
                        <div className="online-show-message-div">
                            <FiberManualRecordIcon
                                fontSize={'small'}
                                style={{ color: 'lightgray' }} />
                        </div>
                    }
                    <div className="user-avatar">
                        {this.props.data.url !== '' ?
                            <img className="avatar-img" src={this.props.data.url} /> :
                            <img className="avatar-img" src={user} />
                        }
                    </div>
                    <div className="username">
                        <h6>{this.props.data.name}</h6>
                    </div>
                    <div>
                        {/* {(this.props.data.id !== this.props.typerId) && (this.props.typing === true ? "typing..." : "")} */}
                    </div>
                </div>
                <div className="messages-container">
                    <div className="messgaes-list">
                        <ul className="list-style">
                            {this.props.allMessages.map((message, index) => {
                                let time = message.createAt.split('T', 11);
                                let otherTime = time[1].split('+', 8);
                                return <li key={message.id} index={index} className={`${this.props.allClasses[index]}`}>
                                    {message.message}
                                    <br />
                                    <span className="time-style">{otherTime[0]}</span>
                                </li>

                            })
                            }
                            <div
                                style={{ float: "left", clear: "both" }}
                                ref={(el) => {
                                    this.messagesEnd = el;
                                }}
                            ></div>
                        </ul>

                    </div>
                    <form onSubmit={this.sendMessage.bind(this)}>
                        <div className="input-button-container">
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Type here for message"
                                value={this.state.message}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                onChange={this.handleMessage.bind(this)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn-send"
                                type="submit"
                            >
                                Send
                            </Button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
    render() {
        return (
            <div className="message-container">
                {this.messageContainer()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        logInUserData: state.loginUserDetail.loggedUserDetail,
        setAllUsersDetail: state.fetchUsersDetail.allUsers,
        singleUserDetail: state.getUserById.userById,
        allMessages: state.specificUserMessages.allMessages,
        allClasses: state.specificUserMessages.allClasses,
        typing: state.typingAlert.typing,
        typerId: state.typingAlert.typerId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        getMessages: (senderID, recieverID) => { dispatch(getMessagesByIds(senderID, recieverID)) },
        getClasses: (senderID, recieverID) => { dispatch(getMessagesClasses(senderID, recieverID)) },
        getTypingAlert: (recieverID, senderID) => { dispatch(getTypingAlertAction(senderID, recieverID)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);