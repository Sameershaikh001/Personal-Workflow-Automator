// API communication functions
class WorkflowAPI {
    constructor() {
        this.baseURL = 'http://localhost:5000/api'; // Updated to match Flask port
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw new Error(`Failed to connect to server: ${error.message}`);
        }
    }

    // Test connection to backend
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Workflow methods
    async getWorkflows() {
        return this.request('/workflows');
    }

    async createWorkflow(description) {
        return this.request('/workflows', {
            method: 'POST',
            body: JSON.stringify({ description }),
        });
    }

    async runWorkflow(workflowId) {
        return this.request(`/workflows/${workflowId}/run`, {
            method: 'POST',
        });
    }
}

// Create global API instance
window.workflowAPI = new WorkflowAPI();