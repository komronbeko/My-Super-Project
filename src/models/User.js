class User{
    constructor(id, username, password, image, subscribe = []){
        this.id = id
        this.username = username
        this.password = password
        this.image = image;
        this.subscribe = subscribe;
    }
}

module.exports = User;