import React, {Component} from 'react';
import { Footer } from './ChatBar.jsx';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  );
}

function Main() {
  return (
    <main className="messages">
      <div className="message">
    <span className="message-username">Anonymous1</span>
    <span className="message-content">I won't be impressed with technology until I can download food.</span>
  </div>
  <div className="message system">
    Anonymous1 changed their name to nomnom.
  </div>
    </main>
  )
}

// function Footer() {
//     return (
//       <footer className="chatbar">
//     <input className="chatbar-username" placeholder="Your Name (Optional)" />
//     <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
//   </footer>
//     )
//   }



class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
      <Navbar />
      <Main />
      <Footer />
      </div>
    );
  }
}
export default App;

