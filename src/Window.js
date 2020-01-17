import React, { Component } from 'react';
import './Window.css';
import { withWebRTC } from 'react-liowebrtc';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
  }
    
  generateChats = () => {
    if(this.chatBox) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      <div className="chat">
        <b className="name" style={{ color: item.alert ? '#888' : '#333' }}>{item.name}</b> 
      </div>
    ));
  }

  handleSend = (chatMsg) => {
    this.props.webrtc.shout('chat', chatMsg);
    this.props.onSend(chatMsg);
  }

  render() {
    const { chatLog } = this.props;
    return (
      <div className="container">
        <div className="chatHeader">
          <h1 className="title">P2P Example</h1>
          <hr />
        </div>
        <div className="chatBox" ref={(div) => this.chatBox = div}>
          {chatLog.length ? this.generateChats() : (
            <div className="info">
              <p>To test this component out, click the button below to open the RTC channel.</p>
            </div>
          )}
        </div>
        <hr />
        <div className="bottomBar">
          <button onClick={()=> window.open("http://localhost:3000",
           "_blank", "height=200, width=200, modal=yes, alwaysRaised=yes")}>Click me!</button>
        </div>
      </div>
    );
  }
}

export default withWebRTC(Window);
