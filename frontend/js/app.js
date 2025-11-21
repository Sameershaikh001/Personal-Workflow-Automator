// Main application logic
class WorkflowApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadWorkflows();
    }

    bindEvents() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                this.showPage(page);
            });
        });

        // Run workflow buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-run')) {
                this.runWorkflow(e.target.closest('.workflow-item'));
            }
        });
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(pageName).classList.add('active');

        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-page') === pageName) {
                btn.classList.add('active');
            }
        });

        this.currentPage = pageName;
        
        // Load page-specific content
        if (pageName === 'workflows') {
            this.loadWorkflows();
        }
    }

    async loadWorkflows() {
        try {
            // This will be connected to backend later
            const workflows = await this.fetchWorkflows();
            this.renderWorkflows(workflows);
        } catch (error) {
            console.error('Error loading workflows:', error);
            this.showNotification('Failed to load workflows', 'error');
        }
    }

    async fetchWorkflows() {
        // Mock data for now - will be replaced with actual API call
        return [
            {
                id: 1,
                name: "Schedule Team Meeting",
                description: "Schedule meeting and email team members",
                status: "completed",
                icon: "fas fa-calendar-plus"
            },
            {
                id: 2,
                name: "Create Project Report",
                description: "Generate and share weekly project report",
                status: "pending",
                icon: "fas fa-file-alt"
            }
        ];
    }

    renderWorkflows(workflows) {
        const container = document.querySelector('.workflows-grid');
        if (!container) return;

        container.innerHTML = workflows.map(workflow => `
            <div class="workflow-item">
                <div class="workflow-icon">
                    <i class="${workflow.icon}"></i>
                </div>
                <div class="workflow-details">
                    <h4>${workflow.name}</h4>
                    <p>${workflow.description}</p>
                    <span class="status-badge ${workflow.status}">${workflow.status}</span>
                </div>
                <button class="btn-run">
                    <i class="fas fa-play"></i> Run
                </button>
            </div>
        `).join('');
    }

    async runWorkflow(workflowElement) {
        const workflowName = workflowElement.querySelector('h4').textContent;
        this.showNotification(`Running workflow: ${workflowName}`, 'success');
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification(`Workflow "${workflowName}" completed successfully!`, 'success');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    animation: slideIn 0.3s ease;
                }
                .notification.success { background: var(--success-color); }
                .notification.error { background: var(--error-color); }
                .notification.info { background: var(--primary-color); }
                .notification button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global functions for HTML onclick attributes
function showPage(pageName) {
    window.app.showPage(pageName);
}

async function createWorkflow() {
    const description = document.getElementById('workflow-description').value;
    if (!description.trim()) {
        window.app.showNotification('Please enter a workflow description', 'error');
        return;
    }

    window.app.showNotification('Creating workflow...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        window.app.showNotification('Workflow created successfully!', 'success');
        showPage('workflows');
    }, 1500);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WorkflowApp();
});