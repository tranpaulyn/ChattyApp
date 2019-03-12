/* 
state.messages = [
    {
      type: "incomingMessage",
      content: "I won't be impressed with technology until I can download food.",
      username: "Anonymous1"
    },
    {
      type: "incomingNotification",
      content: "Anonymous1 changed their name to nomnom",
    },
    {
      type: "incomingMessage",
      content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
      username: "Anonymous2"
    },
    {
      type: "incomingMessage",
      content: "...",
      username: "nomnom"
    },
    {
      type: "incomingMessage",
      content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
      username: "Anonymous2"
    },
    {
      type: "incomingMessage",
      content: "This isn't funny. You're not funny",
      username: "nomnom"
    },
    {
      type: "incomingNotification",
      content: "Anonymous2 changed their name to NotFunny",
    },
  ]
*/

import React, {Component} from 'react';
import { Message } from './Message.jsx';
import messages from './messages.json';

export class MessageList extends Component {
    constructor (){
        super();
        this.state = {messages};
    }
    render() {
        const messages = this.state.messages.messages.map(message => {
            console.log(message.username);
            console.log(message.content);
            <Message username={message.username} content={message.content}/>
        });
        return (
            <main className="messages">
            {messages}
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
                </div>
            </main>
        );
    }
    
}