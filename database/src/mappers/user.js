module.exports = ({name, email, address, shhIdentity}) => {
    let user = {}
    user.name = name
    user.email = email
    user.address = address.toLowerCase()
    user.shh_identity = shhIdentity || ''
    return user
}
