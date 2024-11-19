// Initialisation de la page
async function init() {
    const photographerId = getPhotographerIdFromURL();
    const photographerData = await getPhotographerById(photographerId);
    console.log(photographerData)
    const mediaData = await getPhotographerMedia(photographerId);

    if (photographerData) {
        displayPhotographerData(photographerData);
    }

    if (mediaData.length > 0) {
        displayMedia(mediaData, photographerData);
    }
}

init();

// Récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Fonction pour récupérer les informations d'un photographe à partir du JSON
async function getPhotographerById(id) {
    try {
        const response = await fetch('../data/photographers.json');
        const data = await response.json();
        return data.photographers.find(photographer => photographer.id == id);
    } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe:', error);
        return null;
    }

}

// Fonction pour afficher les informations du photographe dans le DOM
function displayPhotographerData(photographer) {
    const photographHeader = document.querySelector('.photograph-header');

    // Insertion directe du HTML pour la carte du photographe
    photographHeader.insertAdjacentHTML('beforeend', `
                <div class="infos_photographer">
                    <h1>${photographer.name}</h1>
                    <h2>${photographer.city}, ${photographer.country}</h2>
                    <p>${photographer.tagline}</p>
                </div>
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                <img src="../assets/photographers/PhotographersIDPhotos/${photographer.portrait}" 
                    alt="Portrait de ${photographer.name}" class="img_photographers">
    `);
}

// Fonction pour récupérer les médias d'un photographe spécifique
async function getPhotographerMedia(photographerId) {
    try {
        const response = await fetch('../data/photographers.json'); // Assure-toi que le chemin est correct
        const data = await response.json();

        // Filtrer les médias par l'ID du photographe
        const media = data.media.filter(item => item.photographerId == photographerId);
        console.log(media)
        return media;
    } catch (error) {
        console.error('Erreur lors de la récupération des médias:', error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}

// Fonction pour afficher les médias dans le DOM
const displayMedia = (media, photographerData) => {
    
    const mediaSection = document.querySelector('.media-section');
    console.log(media.length)
    for (let i = 0; i < media.length; i++) {
        if (media[i].image) {
            let imageMedia = new ImageMedia(media[i], photographerData.name);
            let article = imageMedia.createMedia();
            mediaSection.appendChild(article);
        }else {
            let videoMedia = new VideoMedia(media[i], photographerData.name);
            let article = videoMedia.createMedia();
            mediaSection.appendChild(article);
        }
    }
}




document.addEventListener('click', function (event) {
    if (event.target.classList.contains('media-thumbnail')) {
        openLightbox(event.target.src);
    }
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

