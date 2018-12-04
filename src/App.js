import React, { Component } from 'react';
import { APP_ID } from '../config.json';
const REDIRECT_URI = 'https://6ba61450.ngrok.io';
const GET_CODE_URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodeURI(REDIRECT_URI)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

class App extends Component {
  state = {
    authed: false,
  }
  componentDidMount() {
    this.checkAuth();
  }
  render() {
    const { authed, code, nickname, headimgurl } = this.state;
    if (!authed) {
      return (
        <div>{`正在授权 ${code || ''}`}</div>
      );
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div>{nickname}</div>
        <img style={{
          width: 100,
          height: 100,
          marginTop: 20,
        }} src={headimgurl} alt="" />
      </div>
    );
  }
  checkAuth = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
      window.location.href = GET_CODE_URL;
    } else {
      this.setState({ code });
      const url = `https://a65951c8.ngrok.io?code=${code}`;
      fetch(url, {
        headers: { mode: 'cors' }
      }).then(r => r.json()).then(r => {
        this.setState({
          ...r,
          authed: true,
        });
      });
    }
  }
}

export default App;
