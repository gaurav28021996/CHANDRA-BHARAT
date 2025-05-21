const API_KEY = '51c83cd1198f1a137e448732abf813ef'; // Get from gnews.io
const newsContainer = document.getElementById('news-container');
const featuredSection = document.querySelector('.featured-news');

async function fetchGNews() {
    try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en`);
        const data = await response.json();
        
        // Clear loading state
        newsContainer.innerHTML = '';
        
        // Display featured article
        const featuredArticle = data.articles[0];
        featuredSection.innerHTML = `
            <div class="featured-card">
                <div class="featured-content">
                    <span class="category-tag">Top Story</span>
                    <h2>${featuredArticle.title}</h2>
                    <p>${featuredArticle.description}</p>
                    <a href="${featuredArticle.url}" target="_blank" class="read-more">Read Full Article →</a>
                </div>
                <div class="featured-image">
                    <img src="${featuredArticle.image || 'placeholder.jpg'}" alt="${featuredArticle.title}">
                </div>
            </div>
        `;

        // Display other articles
        data.articles.slice(1).forEach(article => {
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
            newsContainer.appendChild(articleCard);
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ News temporarily unavailable</h3>
                <p>Please check back later or try refreshing the page.</p>
            </div>
        `;
    }
}

// Auto-refresh news every 30 minutes
setInterval(fetchGNews, 1800000);

// Initial load
fetchGNews();

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-list').classList.toggle('active');
});
