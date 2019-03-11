import React, {Component} from 'react';
import { Footer } from './ChatBar.jsx';
import { Main } from './Message.jsx';

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

