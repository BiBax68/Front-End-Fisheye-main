/**
* Class PhotographerTemplate qui gêre la structure de base des photographes.
* @class
* Pattern method
*/
class photographerTemplate {

    constructor(data) {
        const { name, id, city, country, tagline, price, portrait } = data;
        const picture = `./assets/photographers/PhotographersIDPhotos/${portrait}`;

        this.id = id;
        this.nom = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.picture = picture;
    }

    /**
    * Method qui permet la création d'un article pour un photographe
    * @function [<getUserCardDOM>]
    * @returns {HtmlElement} - Retourne un article d'un photographe.
    */
    getUserCardDOM() {
        const article = document.createElement('article');
        article.insertAdjacentHTML(
            "beforeend",
            `
                <a href="./photographer.html?id=${this.id}" tabindex="0">
                    <img src="${this.picture}" alt="Photo de profil de ${this.nom}">
                    <h2>${this.nom}</h2>
                </a>        
                <h3>${this.city}, ${this.country}</h3>
                <p class="tagline">${this.tagline}</p>
                <p class="price" aria-label="Le coût de prestation de ${this.nom} est de ${this.price}€ par jour.">${this.price}€/jour</p>
            `
        );

        return (article);
    }

    // getContactPhotograph() {

    // }

}