class Media {
    constructor(data) {
        const { id, photographerId, title, image, likes, name } = data;
        this.title = title;
        this.likes = likes;
        this.image = image;
        this.id = id;
        this.name = name;
        this.photographerId = photographerId;

        console.log(data)
    }
    

    createMedia(){
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <div class ="descriptionPicture">
                    <p tabindex="0">${this.title}</p>
                    <div class="likes"><p tabindex="0">${this.likes}</p><img tabindex="0" class="heart" src="assets/icons/close.svg" alt="icône coeur permettant de liker un média"/></div>
                </div>  
            `
        );
        return (article)
    }
}

class ImageMedia extends Media {

    constructor(data, photographerName) {
        super(data)
        const namePhotographer = photographerName.split(" ")[0]; // Prend le premier mot du nom
        console.log(namePhotographer)
        
        this.image = `assets/photographers/${namePhotographer}/${data.image}`;
    }

    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
                <img src="${this.image}" class="mediaPicture" alt="${this.title}" tabindex="0"/>
            `
        )

        return (article);
    }
}

class VideoMedia extends Media {

    constructor(data, photographerName) {
        super(data)
        this.id = data.id
        const namePhotographer = photographerName.split(" ")[0];
        
        this.video = `assets/photographers/${namePhotographer}/` + data.video
    }

    createMedia() {
        const article = super.createMedia()
        article.insertAdjacentHTML(
            "afterbegin",
            `
            <video controls width="350"  alt="${this.title}" class="video" tabindex="0">
            <source src="${this.video}" type="video/mp4">
            </video>
            `
        )


        return (article);
    }

}