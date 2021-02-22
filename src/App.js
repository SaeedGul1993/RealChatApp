import React, { Component } from "react";
import "./index.css";
import Session_Component from './screens/sessions/index';
import ChatArea from './screens/chat/chatArea';
import { Route, BrowserRouter } from 'react-router-dom';
import { store, persistedStore } from './Redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <BrowserRouter>
            <Route path="/" exact component={Session_Component} />
            <Route path="/chatarea" component={ChatArea} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
