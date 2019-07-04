import React, { Component } from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.currentUser.name,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.generateId = this.generateId.bind(this);
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            const newMessage = {
                id: this.generateId(),
                username: this.state.username,
                content: this.state.message
            }

            console.log(newMessage);

            this.props.addMessage(newMessage);
        }
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    generateId() {
        const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = possibleLetters.length;

        let randomId = '';

        for (let i = 0; i < 10; i++) {
            const randomLetter = possibleLetters.charAt(Math.floor(Math.random() * length));
            randomId += randomLetter;
        }

        return randomId;
    }

    render() {
        return (
            <form onKeyUp={this.onKeyUp.bind(this)}>
            <footer className='chatbar'>
                    <input className='chatbar-username' placeholder='Your Name (Optional)' value={this.props.currentUser.name} />
                    <input className='chatbar-message' placeholder='Type a message and hit ENTER' value={this.state.message} onChange={this.handleChange}/>
            </footer>
            </form>
        )
    }
}
export default ChatBar;