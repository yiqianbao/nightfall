module.exports = ({name, email, address, isAuditor, shhIdentity}) => {
    let user = {}
    user.name = name
    user.email = email
    user.address = address.toLowerCase()
    user.is_auditor = isAuditor,
    user.shh_identity = shhIdentity || ''
    return user
}
