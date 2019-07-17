/* eslint-disable no-undef */

if (db == "nightfall_test") {
	// user created for integration testing.
	db.createUser({
	  user: 'admin',
	  pwd: 'admin',
	  roles: [
	    { role: 'userAdmin', db: 'nightfall_test' },
	    { role: 'dbAdmin', db: 'nightfall_test' },
	    { role: 'readWrite', db: 'nightfall_test' },
	  ],
	});
} else {
	db.createUser({
	  user: 'admin',
	  pwd: 'admin',
	  roles: [
	    { role: 'userAdmin', db: 'nightfall' },
	    { role: 'dbAdmin', db: 'nightfall' },
	    { role: 'readWrite', db: 'nightfall' },
	  ],
	});
}
