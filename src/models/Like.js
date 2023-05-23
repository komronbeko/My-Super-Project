class Like{
    constructor(post_id, user_id, liked = "false", disliked = "false", date){
        this.post_id = post_id
        this.user_id = user_id
        this.liked = liked
        this.disliked = disliked
        this.date = date
    }
}
module.exports = Like;