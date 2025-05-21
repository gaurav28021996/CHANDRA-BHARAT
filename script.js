const apiKey = '9185d55dbda14e73bfb4c1a08e85b429';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
  const data = await response.json();
  data.articles.forEach(article => {
    newsContainer.innerHTML += `
      <div class="news-card">
        <h3>${article.title}</h3>
        <img src="${article.urlToImage}" width="100%">
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
  });
}
fetchNews();