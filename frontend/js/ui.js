// UI-specific functionality
class WorkflowUI {
    constructor() {
        this.initUI();
    }

    initUI() {
        this.addBackButtonHandlers();
        this.addFormHandlers();
        this.initializeTooltips();
    }

    addBackButtonHandlers() {
        // Back button functionality is handled in app.js
        // Additional back button logic can be added here
    }

    addFormHandlers() {
        // Add form submission handlers
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Form-specific handling can be added here
        console.log('Form submitted:', data);
    }

    initializeTooltips() {
        // Initialize any tooltips if needed
        // Can be extended with a tooltip library
    }

    // Loading states
    showLoading(element) {
        element.classList.add('loading');
        element.disabled = true;
    }

    hideLoading(element) {
        element.classList.remove('loading');
        element.disabled = false;
    }

    // Modal functionality
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('active');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workflowUI = new WorkflowUI();
});