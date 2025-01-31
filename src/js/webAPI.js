const campos = "media_url,media_type,caption,permalink";
const limit = 45;
let token = "IGQWROcElrc0dqVmxwNWVkbGpma3pkM1ktUmV6RXVVT19qT3VOd2VtNl9WanVYRFFXV3JQY2RORVVPc1JsOFpNaVUybjQwSXhSX3h3OGYwRmsxZA3dtaldmNGJSZAXlLMVM4eEd1b1M5YlBpdWZAyRDRZASS1KQ0VHR2MZD"

/* 
ATUALIZAR TOKEN:

https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQWROcElrc0dqVmxwNWVkbGpma3pkM1ktUmV6RXVVT19qT3VOd2VtNl9WanVYRFFXV3JQY2RORVVPc1JsOFpNaVUybjQwSXhSX3h3OGYwRmsxZA3dtaldmNGJSZAXlLMVM4eEd1b1M5YlBpdWZAyRDRZASS1KQ0VHR2MZD;
*/  


const baseURL = `https://graph.instagram.com/me/media?fields=${campos}&access_token=${token}&limit=${limit}`

let numeroCards = 0


fetch(baseURL)
    .then(response => response.json())
    .then((data) => {
        const containerCards = document.querySelector('.swiper-wrapper')

        data.data.forEach((img) => {
            const mediaType = img.media_type;
            
            if (numeroCards < 10) {
                if(mediaType === "VIDEO" || mediaType === "CAROUSEL_ALBUM") {
                    return
                } 
                else {
                    const mediaUrl = img.media_url;
                    const captionText = img.caption;
                    const permaLink = img.permalink;

                    const card = document.createElement('div');
                    card.classList.add('card', 'swiper-slide');

                    const ancoraCard = document.createElement('a');
                    ancoraCard.href = permaLink;
                    ancoraCard.target = 'black'
                    ancoraCard.rel = 'noopener noreferrer'

                    const containerImageCard = document.createElement('div');
                    containerImageCard.classList.add('image-news');

                    const imageCard = document.createElement("img")
                    imageCard.src = mediaUrl

                    const overlayNews = document.createElement('div')
                    overlayNews.classList.add('overlay-news')

                    const overlayNewsContent = document.createElement('div')
                    overlayNewsContent.classList.add('overlay-news-content')

                    const titleNews = document.createElement('h2');
                    titleNews.classList.add('title-news')
                    titleNews.innerHTML = 'DIOCESANO <span class="text-green"> CONCEITO </span>';

                    const textNews = document.createElement('p');
                    textNews.classList.add('text-news')
                    textNews.innerHTML = `${captionText}`


                    overlayNewsContent.appendChild(titleNews)
                    overlayNewsContent.appendChild(textNews)
                    overlayNews.appendChild(overlayNewsContent)
                    containerImageCard.appendChild(imageCard)
                    containerImageCard.appendChild(overlayNews)
                    ancoraCard.appendChild(containerImageCard)
                    card.appendChild(ancoraCard)
                    containerCards.appendChild(card);

                    numeroCards += 1
                }
            }
        })
        console.log(numeroCards)
    })
    .catch((err) => {
        console.log(err)
    })

