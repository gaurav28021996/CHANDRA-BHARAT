const apiKey = '51c83cd1198f1a137e448732abf813ef';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  const response = await fetch(`https://gnews.io/api/v4/{endpoint}?apikey=51c83cd1198f1a137e448732abf813ef`);
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
