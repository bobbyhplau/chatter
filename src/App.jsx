import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: { name: 'Anonymous' }, // optional. if currentUser is not defined, it means the user is Anonymous
            messages: [],
            usercount: 0
        };
        this.addMessage = this.addMessage.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    addMessage(content) {
        const newMessage = {
            type: 'postMessage',
            username: this.state.currentUser.name,
            content: content
        }
        this.socket.send(JSON.stringify(newMessage));
    }

    setUsername(username) {
        const newNotification = `${this.state.currentUser.name} has changed their name to ${username}`;
        const notificationObject = { type: 'postNotification', content: newNotification };
        this.socket.send(JSON.stringify(notificationObject));
        this.setState({ currentUser: { name: username } });
    }

    componentDidMount() {
        this.socket = new WebSocket('ws://localhost:3001');
        this.socket.onopen = () => {
            this.socket.onmessage = event => {
                const incomingData = JSON.parse(event.data);
                if (incomingData.type === 'incomingUserCount') {
                    this.setState({ usercount: incomingData.numberOfUsers });
                } else {
                    this.setState({ messages: [...this.state.messages, incomingData] });
                }
            }
        }
    }

    render() {
        return (
            <div>
              <nav className='navbar'>
               <a href='/' className='navbar-brand'>Chatty</a>
               <div className='users-online'>{this.state.usercount} users online</div>
              </nav>
              <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} setUsername={this.setUsername}/>
              <MessageList messages={this.state.messages}/>
            </div>
        )
    }
}
export default App;