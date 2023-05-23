class Post{
    constructor(id, user_id, title, place, description, video, date, views = [], liked = [], disliked = []){
        this.id = id
        this.user_id = user_id
        this.title = title
        this.description = description
        this.place = place
        this.video = video
        this.date = date
        this.views = views
        this.liked = liked
        this.disliked = disliked
    }
}

module.exports = Post;