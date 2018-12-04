```bash
$ git clone https://github.com/FaiChou/wechat-auth-react-demo.git
$ cd wechat-auth-react-demo && yarn
$ cd server && node app.js # 3000 port listening to node
$ yarn start # choose another port
```

1. Configure for the `APP_ID` and `APP_SECRET` in `config.json` of your wechat
project.
2. start 2 port NAT using `ngrok`.
3. open wechat then open the `3000` NAT ngrok link

