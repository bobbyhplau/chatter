import React, { Component } from 'react';

class ChatBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.currentUser.name,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            if (event.target.name === 'message') {
                this.props.addMessage(this.state.message);
                this.setState({ message: '' });
            } else if (event.target.name === 'username') {
                this.props.setUsername(this.state.username);
            }
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onKeyUp={this.onKeyUp.bind(this)}>
            <footer className='chatbar'>
                    <input className='chatbar-username' name='username' placeholder='Your Name (Optional)' value={this.state.username} onChange={this.handleChange} />
                    <input className='chatbar-message' name='message' placeholder='Type a message and hit ENTER' value={this.state.message} onChange={this.handleChange}/>
            </footer>
            </form>
        )
    }
}
export default ChatBar;