import React, {Component} from 'react';
import { ChatBar } from './ChatBar.jsx';
import { MessageList } from './MessageList.jsx';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Annonymous"},
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.ws = new WebSocket('ws://localhost:3001');
    this.changeName = this.changeName.bind(this);
  }

    // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessages = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessages)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);

  const parent = this 

  this.ws.onopen = function () {
    console.log('connected!');
  }

  this.ws.onmessage = function(message) {
    let receivedMessage = JSON.parse(message.data);
    // console.log(receivedMessage.type);
    // If incomingMessage type, show message as usual
    if (receivedMessage.type === 'incomingMessage') {
      const newMessages = parent.state.messages.concat(receivedMessage);
      parent.setState({messages: newMessages})
    } else { // Else if incomingNotification, show username change message
      console.log('Notification not a message')
      console.log(receivedMessage.type);
    }

  }

  this.ws.onclose = function () {
    console.log('disconnected :(');
  }
  
}

  addNewMessage(message) {
    const newMessage = {username: this.state.currentUser.name, content: message, type:"postMessage"};
    let obj = JSON.stringify(newMessage);
    this.ws.send(obj);
  }

  changeName(name) {
    let oldName = this.state.currentUser.name;
    this.setState({currentUser: {name: name}}, () => {
      // If username did not change do a warning
      if (oldName === this.state.currentUser.name) {
        console.log('Try again bud!');
      }
      let changeMessage = `${oldName} has changed their name to ${this.state.currentUser.name}`;
      const changeNameMessage = {username: this.state.currentUser.name, content: changeMessage, type:"postNotification"}
      let obj = JSON.stringify(changeNameMessage);
      console.log(obj);
      this.ws.send(obj);
    });
  }

  render() {
    const currentUserName = this.state.currentUser.name;

    return (
      <div>
      <Navbar />
      <MessageList messages={this.state.messages} />
      <ChatBar username={currentUserName} addNewMessage={this.addNewMessage} changeName={this.changeName}/>
      </div>
    );
  }

}



export default App;

