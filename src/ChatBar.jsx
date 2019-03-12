import React, {Component} from 'react';

export class ChatBar extends Component {
    constructor (){
        super();
    }
    render() {
    return (
        <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
      );
    }
    
}