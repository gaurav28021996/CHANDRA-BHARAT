const apiKey = '3c91a649bfe848aba334207d0b5854f8';
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
