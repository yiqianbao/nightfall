/* eslint-disable no-undef */

const existingRole = db.getRoles().map(data => data.role);

db.getCollectionNames().forEach(c => {
  if (existingRole.indexOf(c) !== -1) return;
  if (c.indexOf('_') === -1) return;

  const username = c.split('_')[0];
  const dbName = db.toString();

  db.createRole({
    role: c,
    privileges: [
      { resource: { db: dbName, collection: c }, actions: ['find', 'update', 'insert'] },
    ],
    roles: [],
  });

  db.grantRolesToUser(username, [{ role: c, db: dbName }]);
  db.revokeRolesFromUser(username, [{ role: 'read', db: dbName }]);
});
