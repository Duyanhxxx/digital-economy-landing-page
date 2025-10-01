// Component Loader - Tải và chèn các components vào trang
class ComponentLoader {
    constructor() {
        this.components = {
            'navigation-container': 'components/navigation.html',
            'hero-container': 'components/hero.html',
            'concept-container': 'components/concept.html',
            'analysis-container': 'components/analysis.html',
            'solutions-container': 'components/solutions.html',
            'interactive-container': 'components/interactive.html',
            'conclusion-container': 'components/conclusion.html',
            'footer-container': 'components/footer.html',
            'chatbox-container': 'components/chatbox.html'
        };
    }

    async loadComponent(containerId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    async loadAllComponents() {
        const loadPromises = Object.entries(this.components).map(
            ([containerId, componentPath]) => 
                this.loadComponent(containerId, componentPath)
        );
        
        try {
            await Promise.all(loadPromises);
            console.log('All components loaded successfully');
            // Trigger custom event when all components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        } catch (error) {
            console.error('Error loading some components:', error);
        }
    }
}

export default ComponentLoader;