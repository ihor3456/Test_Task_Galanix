const images = document.getElementsByTagName("img")
const countElem = document.getElementById("img-count")
const dataTimeElem = document.getElementById("current-time")


countElem.innerHTML += images.length

setInterval(() => {
    const now = new Date()
    dataTimeElem.innerHTML = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
}, 1000)


const openPopUp = (image) => {
    const popup = document.createElement('div')
    popup.className = "pop-up"
    document.body.appendChild(popup)
    popup.innerHTML = `
        <div class="pop-up__image-container">
            <img src="${image.src}" alt="">
            <div class="pop-up__close"></div>
        </div>
`
    const closeBtn = document.getElementsByClassName("pop-up__close")
    closeBtn[0].addEventListener('click', () => {closePopUp(image)})
}

const closePopUp = (image) => {
    const closeBtn = document.getElementsByClassName("pop-up__close")
    closeBtn[0].removeEventListener('click', () => {closePopUp(image)})
    document.body.removeChild(document.getElementsByClassName("pop-up")[0])
}

for (const imagesKey in images) {
    if (isNaN(imagesKey))
        continue;
    images[imagesKey].addEventListener('click', () => {openPopUp(images[imagesKey])})
}