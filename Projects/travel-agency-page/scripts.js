// Menu mobile toggle
document.querySelector('.mobile-menu').addEventListener('click', function () {
    document.querySelector('nav ul').classList.toggle('active');
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Fechar menu mobile após clicar em um link
            document.querySelector('nav ul').classList.remove('active');
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Obrigado por se inscrever com o e-mail: ${email}`);
    this.reset();
});