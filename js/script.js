const input = document.getElementById('scannerInput');
const responseText = document.getElementById('responseText');

// Fichiers audio locaux (remplace par le chemin réel)
const successSound = new Audio("audio/succes.mp3");
const errorSound = new Audio("audio/denied.mp3");


function resetBackground() {
    document.body.style.backgroundColor = '#fff';
    responseText.textContent = '';
}

function fetchApi(token) {
    const apiUrl = 'https://serversouyouf.onrender.com/scan-checkin/';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(async (response) => {
        let text = await response.text();
        if (response.ok) {
            document.body.style.backgroundColor = 'green';
            responseText.textContent = text || 'Succès';
            successSound.play();
        } else {
            document.body.style.backgroundColor = 'red';
            responseText.textContent = text || 'Erreur';
            errorSound.play();
        }
        setTimeout(resetBackground, 4000);
    })
    .catch(() => {
        document.body.style.backgroundColor = 'red';
        responseText.textContent = 'Erreur de connexion';
        errorSound.play();
        setTimeout(resetBackground, 4000);
    });
}

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let scannedCode = input.value.trim();
        if (scannedCode) {
            fetchApi(scannedCode);
            input.value = '';
        }
    }
});

input.focus();
window.addEventListener('click', () => input.focus());
