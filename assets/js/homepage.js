const awayTeamSpan = document.querySelector('.event-name span:first-child')
const homeTeamSpan = document.querySelector('.event-name span:last-child')
const teamSection = document.querySelector('#teamSection')
const newsSection = document.querySelector('#newsSection')

const nextEventDateAndTime = document.querySelector('#nextEventDateAndTime')
const nextStadium = document.querySelector('#nextStadium')
const nextForecast = document.querySelector('#nextForecast')
const gameLink = document.querySelector('#gameLink')

const homeName = document.querySelector('#homeName')
const homeLogo = document.querySelector('#homeLogo')

const awayName = document.querySelector('#awayName')
const awayLogo = document.querySelector('#awayLogo')

const eventUrl = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/'
const teamUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
const articleUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=8'

let eventIndex = 0

const teamSearchForm = document.querySelector('#teamSearchForm')
const searchInput = document.querySelector('#searchInput')

// !CHECKED AND CONVERTED TO HTTPS
async function getEventList(nextEventUrl) {

  const response = await fetch(nextEventUrl);
  const data = await response.json();

  getGameIndex()

  const selectedEvent = data.items[eventIndex].$ref
  getNextEventDetails(`https://${selectedEvent.split('://')[1]}`)
}

// !CHECKED - USES HTTPS
async function getNextEventDetails(eventUrl) {
  const response = await fetch(eventUrl);
  const data = await response.json()
  const dataAndTime = data.date
  nextEventDateAndTime.textContent = convertTimeAndDate(dataAndTime)
  nextStadium.textContent = data.competitions[0].venue.fullName
  try {
    nextForecast.textContent = `${data.weather.displayValue}, ${data.weather.temperature} F`
  } catch {
    nextForecast.textContent = 'Weather not available'
  }
  gameLink.textContent = 'Click for more details'
  // !CHECKED - USES HTTPS
  gameLink.setAttribute('href', data.links[0].href)

  const homeTeamUrl = data.competitions[0].competitors[0].team.$ref
  const awayTeamUrl = data.competitions[0].competitors[1].team.$ref

  getHomeTeam(`https://${homeTeamUrl.split('://')[1]}`)
  getAwayTeam(`https://${awayTeamUrl.split('://')[1]}`)
}

// !CHECKED AND CONVERTED TO HTTPS
async function getHomeTeam(homeTeamUrl) {
  const response = await fetch(homeTeamUrl)
  const data = await response.json();
  homeLogo.setAttribute('src', data.logos[0].href)
  homeLogo.setAttribute('alt', 'Team Logo')

  homeName.textContent = data.shortDisplayName
}

// !CHECKED AND CONVERTED TO HTTPS
async function getAwayTeam(awayTeamUrl) {
  const response = await fetch(awayTeamUrl)
  const data = await response.json();
  awayLogo.setAttribute('src', data.logos[0].href)
  awayLogo.setAttribute('alt', 'Team Logo')

  awayName.textContent = data.shortDisplayName
}

function convertTimeAndDate(timeAndDate) {
  const inputTime = timeAndDate;
  const parsedDate = new Date(inputTime);

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  return parsedDate.toLocaleString('en-US', options);
}

// !CHECKED - USES HTTPS
async function getTeams(teamUrl) {
  const response = await fetch(teamUrl);
  const data = await response.json();
  data.sports[0].leagues[0].teams.forEach(team => {
    const teamDiv = document.createElement('div')
    const teamLogo = document.createElement('img')
    const teamName = document.createElement('h3')
    const teamLink = document.createElement('a')
    teamLogo.setAttribute('src', team.team.logos[0].href)

    teamLink.appendChild(teamDiv)
    teamLink.setAttribute('href', `./teams.html?id=${team.team.id}`)
    teamLink.setAttribute('class', 'team-link')
    teamLink.setAttribute('data-name', team.team.name)


    teamDiv.appendChild(teamLogo)
    teamDiv.appendChild(teamName)
    teamSection.appendChild(teamLink)
    teamName.textContent = team.team.name
  })
  // when I search, I need to compare the search value with the teams name
  const teamListArr = document.querySelectorAll('[data-name]')
  let searchedTeam;

  searchInput.addEventListener('keyup', (e) => {
    e.preventDefault()
    searchedTeam = searchInput.value
    searchTeam(teamListArr, searchedTeam)
  })
}

function searchTeam(teamListArr, searchedTeam) {
  teamListArr.forEach(team => {
    if (!team.getAttribute('data-name').toLowerCase().includes(searchedTeam.toLowerCase())){
      team.classList.add('hidden')
      console.log('match')
    } else {
      team.classList.remove('hidden')
    }
  })
}


// !CHECKED - USES HTTPS
async function getNews(articleUrl) {
  const response = await fetch(articleUrl);
  const data = await response.json();
  data.articles.forEach(article => {
    const newsDiv = document.createElement('div')
    const articleHeader = document.createElement('h3')
    const articleDescription = document.createElement('p')
    const articleAuthor = document.createElement('p')
    const fullArticleLink = document.createElement('a')

    articleHeader.textContent = article.headline
    articleDescription.textContent = article.description
    articleAuthor.textContent = article.byline
    fullArticleLink.textContent = 'Read the full article'
    fullArticleLink.setAttribute('href', article.links.web.href)
    fullArticleLink.setAttribute('target', '_blank')

    newsDiv.appendChild(articleHeader)
    newsDiv.appendChild(articleDescription)
    newsDiv.appendChild(articleAuthor)
    newsDiv.appendChild(fullArticleLink)
    newsSection.appendChild(newsDiv)
  })
}

function saveGameIndex() {
  localStorage.setItem('gameIndex', eventIndex)
}
function getGameIndex() {
  const gameIndex = localStorage.getItem('gameIndex')
  if (localStorage.getItem('gameIndex') === null) {
    eventIndex = 0
  } else {
    eventIndex = gameIndex
  }
}

const prevGameBtn = document.querySelector('#prevGameBtn')
const nextGameBtn = document.querySelector('#nextGameBtn')
prevGameBtn.addEventListener('click', () => {
  fetch(eventUrl)
    .then(res => {
      return res.json()
    })
    .then(data => {
      let numberOfGames = data.items.length
      eventIndex--
      if (eventIndex < 0) {
        eventIndex = numberOfGames - 1
      }
      saveGameIndex()
      getEventList(eventUrl)
    })
})
nextGameBtn.addEventListener('click', () => {
  fetch(eventUrl)
    .then(res => {
      return res.json()
    })
    .then(data => {
      let numberOfGames = data.items.length
      eventIndex++
      if (eventIndex > numberOfGames - 1) {
        eventIndex = 0
      }
      saveGameIndex()
      getEventList(eventUrl)
    })
})

// getEventList(eventUrl)
// getTeams(teamUrl)
// getNews(articleUrl)