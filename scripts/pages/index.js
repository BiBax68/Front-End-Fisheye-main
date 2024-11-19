async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json'); // Assure-toi que le chemin est correct
        const data = await response.json();
        return data.photographers;
    } catch (error) {
        console.error('Erreur lors de la récupération des photographes:', error);
        return [];
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = new photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        // Créer un lien vers la page du photographe
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${photographer.id}`);
        link.setAttribute('aria-label', `Voir la page de ${photographer.name}`);
        link.appendChild(userCardDOM); 

        photographersSection.appendChild(link); // Ajoute la carte à la section
    });
}

async function init() {
    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
