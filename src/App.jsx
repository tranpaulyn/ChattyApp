import React, {Component} from 'react';
import { ChatBar } from './ChatBar.jsx';
import { MessageList } from './MessageList.jsx';
import { NavBar } from './NavBar.jsx'


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Annonymous"},
      messages: [],
      notifications: [],
      onlineUsers: 0,
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.ws = new WebSocket('ws://localhost:3001');
    this.changeName = this.changeName.bind(this);
  }

    // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");

  const parent = this 

  this.ws.onopen = function () {
    console.log('connected!');
  }

  this.ws.onmessage = function(message) {
    let receivedMessage = JSON.parse(message.data);

    switch(receivedMessage.type) {
      case "incomingMessage":
        const newMessages = parent.state.messages.concat(receivedMessage);
        parent.setState({messages: newMessages})
        break;
      case "incomingNotification":
        const newNotifications = parent.state.messages.concat(receivedMessage);
        parent.setState({messages: newNotifications});
        break;
      case "userCountChanged":
        parent.setState({onlineUsers: receivedMessage.userCount});
        break;
      default:
        throw new Error("Unknown event type " + receivedMessage.type);

    }
  }

  this.ws.onclose = function () {
    console.log('disconnected :(');
  }
  
}

  addNewMessage(message) {
    const newMessage = {
      username: this.state.currentUser.name, 
      content: message, 
      type:"postMessage"};
    let obj = JSON.stringify(newMessage);
    this.ws.send(obj);
  }

  changeName(name) {
    let oldName = this.state.currentUser.name;

    this.setState({currentUser: {name: name}}, () => {
      let changeMessage = `${oldName} has changed their name to ${this.state.currentUser.name}`;
      const changeNameMessage = {
        username: this.state.currentUser.name, 
        content: changeMessage, 
        type:"postNotification"}
      let obj = JSON.stringify(changeNameMessage);
      this.ws.send(obj);
    });
  }

  render() {
    const currentUserName = this.state.currentUser.name;

    return (
      <div>
      <NavBar count={this.state.onlineUsers}/>
      <MessageList messages={this.state.messages}/>
      <ChatBar username={currentUserName} addNewMessage={this.addNewMessage} changeName={this.changeName}/>
      </div>
    );
  }

}



export default App;

