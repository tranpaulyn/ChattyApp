import React, {Component} from 'react';
import { ChatBar } from './ChatBar.jsx';
import { MessageList } from './MessageList.jsx';
import { Message } from './Message.jsx'
import messages from './messages.json';

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
    this.state = messages;
    this.addNewMessage = this.addNewMessage.bind(this);
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
}

  addNewMessage(message) {
    let ID = function () {
      return Math.random().toString(36).substr(2, 9);
    };
    const oldMessages = this.state.messages;
    const newMessage = {id: ID(), username:this.state.currentUser.name, content: message};
    const updatedMessages = oldMessages.concat(newMessage);
    console.log(updatedMessages);
    this.setState({ messages: updatedMessages});
  }

  render() {
    const currentUserName = this.state.currentUser.name;

    return (
      <div>
      <Navbar />
      <MessageList messages={this.state.messages}/>
      <ChatBar username={currentUserName} addNewMessage={this.addNewMessage} />
      </div>
    );
  }

}



export default App;

