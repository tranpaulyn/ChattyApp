import React, {Component} from 'react';

export class Footer extends Component {
    constructor (){
        super();
    }
    render() {
    return (
        <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
      );
    }
    
}