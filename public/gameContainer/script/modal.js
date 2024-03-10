const overlay = document.getElementById('overlay');

document.querySelectorAll('[data-close-button]').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
});

export function openModal(modal) {
    if (modal == null) return;
    overlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}