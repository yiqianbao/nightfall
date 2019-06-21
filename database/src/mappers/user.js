/* eslint-disable import/no-commonjs */

module.exports = ({ name, email, address, isAuditor, shhIdentity }) => {
    const user = {};
    user.name = name;
    user.email = email;
    user.address = address.toLowerCase();
    user.is_auditor = isAuditor;
    user.shh_identity = shhIdentity || '';
    return user;
  };
