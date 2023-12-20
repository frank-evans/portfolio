const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const gameContainer = document.getElementById('game-container');

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        /* const modal = button.closest('.modal');
        closeModal(modal); */
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    })
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    gameContainer.style.pointerEvents = "none";

}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    gameContainer.style.pointerEvents = "auto";
}