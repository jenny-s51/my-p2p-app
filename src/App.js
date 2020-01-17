import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc';
import './App.css';
import Window from './Window';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }
  
  join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
  }
  
  handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'chat':
        this.addChat(`Peer-${peer.id.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  }
  addChat = (name, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      alert
    })});
  }
  
  render() {
    const { chatLog, options } = this.state;
    return (
      <div className="App">
        <LioWebRTC
            options={options}
            onReady={this.join}
            onCreatedPeer={this.handleCreatedPeer}
            onReceivedPeerData={this.handlePeerData}
          >
          <Window
            chatLog={chatLog}
            onSend={() => this.addChat('Me')}
          />
        </LioWebRTC>
      </div>
    );
  }
}

export default App;