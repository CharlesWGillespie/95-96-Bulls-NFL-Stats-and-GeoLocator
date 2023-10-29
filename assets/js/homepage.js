// working functionality for adding main event title.

const url = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/401547508?lang=en&region=us'
let eventName
const awayTeamSpan = document.querySelector('.event-name span:first-child')
const homeTeamSpan = document.querySelector('.event-name span:last-child')
const teamSection = document.querySelector('#team-section')
// fetch(url)
// .then((res) => {
//   return res.json()
// })
// .then((data) =>{
//   eventName = data.name
//   console.log(eventName)
//   let arr =[]
//   arr = eventName.split(' at ')
//   console.log(arr)
//   awayTeamSpan.textContent = arr[0]
//   homeTeamSpan.textContent = arr[1]
// })
const teamUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
async function getTeams() {
  const response = await fetch(teamUrl);
  const data = await response.json();
  console.log(data)
  data.sports[0].leagues[0].teams.forEach(team => {
    const teamDiv = document.createElement('div')
    const teamLogo = document.createElement('img')
    const teamName = document.createElement('h2')
    teamLogo.setAttribute('src', team.team.logos[0].href)
    teamDiv.appendChild(teamLogo)
    teamName.textContent = team.team.name
    teamDiv.appendChild(teamName)
    teamDiv
    teamSection.appendChild(teamDiv)
  })
}
getTeams()