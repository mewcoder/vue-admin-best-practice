import Mock from 'mockjs';

const userMap = {
  admin: {
    username: 'admin',
    password: 'admin',
    token: 'xxxxxxxx',
    codes: ['001', '002', '003', '004', '005'],
    role: 'admin'
  },
  user: {
    username: 'user',
    password: 'user',
    token: 'xxxxxxxx',
    codes: ['001'],
    role: 'user'
  }
};

Mock.mock('/user/info', 'post', options => {
  console.log('/user/info', options);
  const { username } = JSON.parse(options.body);
  console.log('username', username);
  return userMap[username];
});
