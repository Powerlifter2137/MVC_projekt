// Walidacja formularzy Bootstrap
(function() {
    'use strict';
    
    // Pobierz wszystkie formularze z klasą needs-validation
    const forms = document.querySelectorAll('.needs-validation');
    
    // Pętla przez formularze i zapobiegaj wysłaniu
    Array.from(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Dodatkowa walidacja dla pól tekstowych
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
    
    // Walidacja czasu przygotowania
    const czasInput = document.getElementById('czasPrzygotowania');
    if (czasInput) {
        czasInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 1 || value > 60) {
                this.setCustomValidity('Czas musi być między 1 a 60 minut');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Licznik znaków dla pól tekstowych
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength');
        if (maxLength) {
            const counter = document.createElement('small');
            counter.className = 'text-muted float-end';
            textarea.parentElement.appendChild(counter);
            
            function updateCounter() {
                const remaining = maxLength - textarea.value.length;
                counter.textContent = `Pozostało ${remaining} znaków`;
            }
            
            textarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
    
    // Automatyczne zamykanie alertów po 5 sekundach
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeBtn = alert.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.click();
            }
        }, 5000);
    });
    
    // Potwierdzenie usunięcia
    const deleteForms = document.querySelectorAll('form[onsubmit*="confirm"]');
    deleteForms.forEach(form => {
        // Usuń atrybut onsubmit aby uniknąć duplikacji
        const onsubmitAttr = form.getAttribute('onsubmit');
        if (onsubmitAttr) {
            form.removeAttribute('onsubmit');
            form.addEventListener('submit', function(e) {
                if (!confirm('Czy na pewno chcesz usunąć ten element?')) {
                    e.preventDefault();
                }
            });
        }
    });
    
})();

// Funkcja do formatowania składników
function formatIngredients() {
    const skladnikiInput = document.getElementById('skladniki');
    if (skladnikiInput) {
        skladnikiInput.addEventListener('blur', function() {
            const lines = this.value.split('\n');
            const formatted = lines
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join('\n');
            this.value = formatted;
        });
    }
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    formatIngredients();
    
    // Tooltip dla przycisków
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});