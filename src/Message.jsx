import React, { Component } from 'react';

class Message extends Component {
    render() {

        const message = this.props.message;

        return (
            (message.type === 'incomingMessage') ?
            (<div className='message'>
                <span className='message-username'>{message.username}</span>
                <span className='message-content'>{message.content}</span>
            </div>) :
            (<div className='notification'>
                <span className='notification-content'>{message.content}</span>
            </div>)
        )
    }
}
export default Message;