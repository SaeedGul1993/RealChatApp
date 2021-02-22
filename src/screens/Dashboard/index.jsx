import React, { useState, useEffect } from 'react';
import './dashboard.css';
import user from '../../assets/images/user.png';
import { Button, Fab, CircularProgress } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { UserLogout, UpdateOnlineKey } from "../../apis/logoutApi";
import { useHistory } from 'react-router-dom';
import { UpdateProfileImage } from '../../apis/updateUserProfileApi';
import { connect } from 'react-redux';
import { logged_User_Action } from '../../Redux/actions/loggedUserAction';

const Dashboard = (props) => {
    const [file, setFile] = useState('');
    const [loader, setLoader] = useState(false);
    const history = useHistory();

    useEffect(() => {
        console.log('userDetail', props.userDetail);
        // console.log('user detai action func',props.loggedInUserDetail());
    }, [])

    useEffect(() => {
        if (file !== "") {
            imageUpload(props.userDetail.id, file)
        }
    }, [file])
    
    const handleFile = (event) => {
        let originalFile = event.target.files[0];
        console.log('originalFile', originalFile);
        let reader = new FileReader();
        reader.onloadend = () => {
            setFile(reader.result);
        };
        reader.readAsDataURL(originalFile);

    }

    const imageUpload = (userId, File) => {
        setLoader(true);
        console.log('userID', userId);
        console.log('File', File);
        UpdateProfileImage(userId, File)
            .then(() => {
                var updatedData = {
                    email: props.userDetail.email,
                    id: props.userDetail.id,
                    name: props.userDetail.name,
                    online: true,
                    url: File
                }
                props.setLoggedInUserDetail(updatedData);
                alert('image successfully uploaded');
                setLoader(false);
                setFile('')

            })
            .catch((err) => {
                console.log('err', err);
                setLoader(false);
            })
    }

    const logoutUser = () => {
        UserLogout()
            .then(() => {
                UpdateOnlineKey(props.userDetail.id)
                    .then(() => {
                        console.log('user logout successfully');
                        history.push('/');
                    })
                    .catch((err) => {
                        console.log('err', err);
                    })
            })
            .catch((err) => {
                console.log('err', err);
            })
    }
    return (
        <div className="main-div">
            <div className="user-profile-image">
                {loader ? <CircularProgress size={40} color="primary" /> :
                    <img className="proile-image" src={props.userDetail.url !== "" ? props.userDetail.url : user} />
                }
            </div>
            <div className="update-image">
                <Fab color="primary" aria-label="edit" >
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} htmlFor="update-input-field">
                        <Edit className="edit-icon" />
                    </label>
                </Fab>
            </div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="update-input-field"
                multiple
                type="file"
                onChange={handleFile}
            />
            <div className="user-detail">
                <h5>{props.userDetail.name}</h5>
                <p>{props.userDetail.online === true && "Online"}</p>
            </div>
            <div>
                <Button
                    color="secondary"
                    variant="contained"
                    className="log-out"
                    onClick={logoutUser}
                >Logout</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        logInUserData: state.loginUserDetail.loggedUserDetail,
        setAllUsersDetail: state.fetchUsersDetail.allUsers,
        singleUserDetail: state.getUserById.userById
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        // allUsersDetail: (data) => { dispatch(GetAllUsersFromDatabase(data)) },
        // singleUser: (data) => { dispatch(getUserById(data)) },
        // getMessages: (senderID, recieverID) => { dispatch(getMessagesByIds(senderID, recieverID)) },
        // getClasses: (senderID, recieverID) => { dispatch(getMessagesClasses(senderID, recieverID)) },
        setLoggedInUserDetail: (data) => { dispatch(logged_User_Action(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);