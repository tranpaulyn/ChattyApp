import React, {Component} from 'react';
import { Message } from './Message.jsx';

export class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
    return (<Message key={message.id} message={message} color={message.color} />)
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}