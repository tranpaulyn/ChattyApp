import React, {Component} from 'react';
import { ChatBar } from './ChatBar.jsx';
import { MessageList } from './MessageList.jsx';
import { NavBar } from './NavBar.jsx'
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: 'Anonymous'}, // Set current user as Anonymous until they set their name
      messages: [],
      notifications: [],
      onlineUsers: [],
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeName = this.changeName.bind(this);
    this.ws = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    const parent = this 

    // Check Connection
    this.ws.onopen = function () {};

    // Receive Message from server and change the state
    this.ws.onmessage = function(message) {
      let receivedMessage = JSON.parse(message.data);

      switch(receivedMessage.type) {
        case 'incomingMessage':
          const newMessages = parent.state.messages.concat(receivedMessage);
          parent.setState({messages: newMessages})
          break;
        case 'incomingNotification':
          const newNotifications = parent.state.messages.concat(receivedMessage);
          parent.setState({messages: newNotifications});
          break;
        case 'userCountChanged':
          parent.setState({onlineUsers: receivedMessage});
          break;
        case 'incomingImage':
          const newImage = parent.state.messages.concat(receivedMessage);
          parent.setState({messages: newImage})
          break;
        default:
          throw new Error('Unknown event type ' + receivedMessage.type);
      }
    };

    // Disconnect from websocket
    this.ws.onclose = function () {};
  }

  // Receive message from chatbar and send it to the server
  addNewMessage(message) {
    // Check if the message ends with an image file extension
    let image = message.slice(message.length - 3);

    if (image === 'png' || image === 'gif' || image === 'jpg') {
      // If an image URL was sent, set different message type
      const newMessage = {
        username: this.state.currentUser.name, 
        content: message, 
        type:'postImage'};
      let obj = JSON.stringify(newMessage);
      this.ws.send(obj);
    } else {
      const newMessage = {
        username: this.state.currentUser.name, 
        content: message, 
        type:'postMessage'};
      let obj = JSON.stringify(newMessage);
      this.ws.send(obj);
    }
  }

  // Receive name change from chatbar and send it to the server
  changeName(name) {
    // Hold on to the original name to compare it
    let oldName = this.state.currentUser.name;

    this.setState({currentUser: {name: name}}, () => {
      // Create a message to notify the name change
      let changeMessage = `${oldName} has changed their name to ${this.state.currentUser.name}`;
      // Create an object with the information and stringify it to send to the server
      const changeNameMessage = {
        username: this.state.currentUser.name, 
        content: changeMessage, 
        type:'postNotification'}
      let obj = JSON.stringify(changeNameMessage);
      this.ws.send(obj);
    });
  }

  render() {
    return (
      <div>
      <NavBar count={this.state.onlineUsers.userCount}/>
      <MessageList messages={this.state.messages} color={this.state.messages.color}/>
      <ChatBar username={this.state.currentUser.name} addNewMessage={this.addNewMessage} changeName={this.changeName}/>
      </div>
    );
  }

}

export default App;