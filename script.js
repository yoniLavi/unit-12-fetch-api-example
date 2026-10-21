const API_KEY = 'rc_live_1693f45350cc47f6a67555099254656a';
const API_URL = 'https://api.restcountries.com/countries/v5/names.common/';
const OPTIONS = {
  headers: { Authorization: 'Bearer ' + API_KEY }
};

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
const statusText = document.getElementById("statusText");

function renderCountryProperties(countryData) {
  result.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add('result');
  const h2 = document.createElement('h2');
  h2.innerText = countryData.names.common;
  const capitalP = document.createElement('p');
  capitalP.innerText = `Capital: ${countryData.capitals[0].name}`;
  const populationP = document.createElement('p');
  populationP.innerText = `Population: ${countryData.population.toLocaleString()}`;

  div.append(h2, capitalP, populationP);
  result.append(div);
}

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const country = searchInput.value.trim();

  if (country === '') {
    statusText.innerText = 'You must enter a valid country name';
    return;
  }

  statusText.innerText = "Loading ...";

  try {
    const response = await fetch(API_URL + encodeURIComponent(country), OPTIONS);
    const body = await response.json();

    if (body.data.objects.length === 0) {
      statusText.innerText = `Error: the country '${country}' was not found.`;
      return;
    }

    const countryData = body.data.objects[0];

    renderCountryProperties(countryData);
    statusText.innerText = '';
    console.log(countryData);
  } catch (error) {
    console.error("We got this error when calling the API:");
    console.error(error);

    statusText.innerText = `Failed to get info about the country '${country}'.`;

    return;
  }
});
