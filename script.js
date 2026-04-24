// fetch(Lenin.txt)
//     .then(response => response.text())
//     .then(data => {
//         const contentDiv = document.querySelector('.dynamicContent').innerHTML=data;
 // var iframe = document.getElementById('iframe-Lenin');
// // iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
async function loadContent() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        document.getElementById('main-title').innerText = data.title;
        document.getElementById('site-description').innerText = data.description;
        document.getElementById('about-section').innerText = data.about;
    } catch (error) {
        console.error("Помилка завантаження окремого файлу:", error);
    }
}

loadContent();