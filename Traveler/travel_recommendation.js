
let apiData = null;

window.onload = function() {
    loadPage('home');
    fetchAPIData();
};

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
});

function fetchAPIData() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            apiData = data;
            generateBeachesHTML();
            generateTemplesHTML();
        })
        .catch(error => console.error('Error fetching API data:', error));
}

function loadPage(pageName) {
    fetch(`${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            if (pageName === 'beaches' || pageName === 'temples') {
                populateDestinations(pageName);
            }
        })
        .catch(error => console.error('Error:', error));
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm === 'beaches' || searchTerm === 'temples') {
        loadPage(searchTerm);
    } else {
        alert('Please search for "beaches" or "temples"');
    }
}
