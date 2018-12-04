import { APP_ID, APP_SECRET } from '../../config.json';

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const fetch = require('node-fetch');

app.use(cors());
app.get('/', (req, res) => {
  const code = req.query.code;
  const GET_ACCESS_TOKEN_URL = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`;
  fetch(GET_ACCESS_TOKEN_URL).then(r => r.json()).then(r => {
    const { access_token, openid } = r;
    const GET_USERINFO_URL = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
    fetch(GET_USERINFO_URL).then(r => r.json()).then(r => {
      res.send(r);
    });
  });
});

app.listen(port, () => console.log(`wechat demo app listen on ${port}!`));
