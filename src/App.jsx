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

  render() {
    const currentUserName = this.state.currentUser.name;

    return (
      <div>
      <Navbar />
      <MessageList messages={this.state.messages}/>
      <ChatBar username={currentUserName}/>
      </div>
    );
  }

}



export default App;

