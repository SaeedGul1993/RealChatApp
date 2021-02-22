import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import user from '../../assets/images/user.png';
import './chat.css';
import { GetAllUsersFromDatabase } from '../../Redux/actions/getUsersAction';
import { TextField } from '@material-ui/core';
import MessageBox from '../../components/messageBox';
import { Switch, Route, useHistory } from 'react-router-dom';
import Dashboard from '../Dashboard/index';
import { getUserById } from '../../Redux/actions/getSingleUserByUd';
import { getMessagesByIds } from '../../Redux/actions/getMessagesAction';
import { getMessagesClasses } from '../../Redux/actions/getClassesAction';
import { logged_User_Action } from '../../Redux/actions/loggedUserAction';
import { getTypingAlertAction } from '../../Redux/actions/getTypingAlertAction';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ChatArea(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [senderId, setSenderId] = React.useState('');
  const [recieverId, setRecieverId] = React.useState('');
  const [userDataById, setUserDataById] = React.useState('');
  const [toggle, setToggle] = React.useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log('getData', props.allUsersDetail(props.logInUserData.id));
    console.log('fetchData', props.setAllUsersDetail);
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const changeState = () => {
    setToggle(false);
  }
  const goToMessageBox = (senderId, recieverId) => {
    setSenderId(senderId);
    setRecieverId(recieverId);
    props.singleUser(recieverId);
    console.log('single user by Id', props.singleUserDetail);
    setUserDataById(props.singleUserDetail);
    props.getMessages(senderId, recieverId);
    props.getClasses(senderId, recieverId);
    setToggle(true);
  }
  const drawer = (
    <div >
      <div className="profile-in-sidebar" onClick={changeState}>
        <div className="profile-div">
          {props.logInUserData.url != "" ?
            <img className="avatar-img" src={props.logInUserData.url} /> :
            <img className="avatar-img" src={user} />}
        </div>
        <div className="user-name">{props.logInUserData.name}</div>
      </div>
      {props.logInUserData.online === true ?
        <div className="online-div">
          <span>
            <FiberManualRecordIcon
              fontSize={'small'}
              style={{ color: 'green' }} />
          </span>
          <span> Online</span>
        </div>
        : ''}
      <Divider />
      <div className="search-field">
        <TextField type="text"
          variant="outlined"
          size="small"
          label="Search Users in List" />
      </div>
      <List>
        {props.setAllUsersDetail.map((detail, index) => (
          <ListItem button key={detail.id} index={index} onClick={() => goToMessageBox(props.logInUserData.id, detail.id)}>
            {detail.online === true ? <div className="online-show">
              <FiberManualRecordIcon
                fontSize={'small'}
                style={{ color: 'green' }} />
            </div> :
              <div className="online-show">
                <FiberManualRecordIcon
                  fontSize={'small'}
                  style={{ color: 'lightgray' }} />
              </div>}
            <ListItemIcon>
              {detail.url ?
                <div className="profile-div1">
                  <img className="avatar-img" src={detail.url} />
                </div>
                : <div className="profile-div1">
                  <img className="avatar-img" src={user} />
                </div>}
            </ListItemIcon>
            <ListItemText primary={detail.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Chat With Friends
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          toggle ?
            <MessageBox
              senderID={senderId}
              recieverID={recieverId}
              data={props.singleUserDetail}
            />
            : <Dashboard userDetail={props.logInUserData} />
        }
      </main>
    </div>
  );
}

ChatArea.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    logInUserData: state.loginUserDetail.loggedUserDetail,
    setAllUsersDetail: state.fetchUsersDetail.allUsers,
    singleUserDetail: state.getUserById.userById
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    allUsersDetail: (data) => { dispatch(GetAllUsersFromDatabase(data)) },
    singleUser: (data) => { dispatch(getUserById(data)) },
    getMessages: (senderID, recieverID) => { dispatch(getMessagesByIds(senderID, recieverID)) },
    getClasses: (senderID, recieverID) => { dispatch(getMessagesClasses(senderID, recieverID)) },
    setLoggedInUserDetail: (data) => { dispatch(logged_User_Action(data)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);