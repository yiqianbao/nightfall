/* eslint-disable no-undef */

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    { role: 'userAdmin', db: 'ZKPDemo' },
    { role: 'dbAdmin', db: 'ZKPDemo' },
    { role: 'readWrite', db: 'ZKPDemo' },
  ],
});
