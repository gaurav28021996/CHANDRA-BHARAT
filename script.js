const API_KEY = '51c83cd1198f1a137e448732abf813ef';
const categoryContainer = document.getElementById('category-container');
const categoryTitle = document.getElementById('category-title');

// Category mapping (GNews categories)
const categories = {
    politics: 'politics',
    technology: 'technology',
    entertainment: 'entertainment',
    sports: 'sports',
    general: 'general'
};

// Fetch news by category
async function fetchCategoryNews(category = 'general') {
    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=${category}&token=${API_KEY}&lang=en`
        );
        const data = await response.json();
        
        // Update category title
        categoryTitle.textContent = `${category.toUpperCase()} NEWS`;
        
        // Clear previous content
        categoryContainer.innerHTML = '';
        
        // Generate news cards
        data.articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'news-card';
            articleCard.innerHTML = `
                <div class="news-image">
                    <img src="${article.image || 'placeholder.jpg'}" alt="${article.title}" loading="lazy">
                </div>
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <div class="article-meta">
                        <span class="source">${article.source.name}</span>
                        <span class="published-at">${new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <a href="${article.url}" target="_blank" class="read-more">Read More →</a>
                </div>
            `;
            categoryContainer.appendChild(articleCard);
        });

    } catch (error) {
        console.error('Error fetching category news:', error);
        categoryContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ ${category} news unavailable</h3>
                <p>Please try another category or check back later.</p>
            </div>
        `;
    }
}

// Handle category clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        
        // Fetch category news
        fetchCategoryNews(category);
    });
});

// Initial load
fetchCategoryNews('general');
