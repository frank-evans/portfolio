const overlay = document.getElementById('overlay');
const gameContainer = document.getElementById('game-container');

gameContainer.addEventListener('click', event => {
    if (event.target.matches('[data-close-button]')) {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
});

export function openModal(modal) {
    if (modal == null) return;
    /* gameContainer.style.pointerEvents = "none"; */
    overlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    /* gameContainer.style.pointerEvents = "auto"; */
    overlay.classList.remove('active');
    modal.classList.remove('active');
}