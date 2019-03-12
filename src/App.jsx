import React, {Component} from 'react';
import { ChatBar } from './ChatBar.jsx';
import { MessageList } from './MessageList.jsx';
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
    this.state = { messages };
  }
  render() {
    const currentUserName = this.state.messages.currentUser.name;

    return (
      <div>
      <Navbar />
      <MessageList />
      <ChatBar username={currentUserName}/>
      </div>
    );
  }
}
export default App;

