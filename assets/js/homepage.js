// working functionality for adding main event title.

const url = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/401547508?lang=en&region=us'
let eventName
const awayTeamSpan = document.querySelector('.event-name span:first-child')
const homeTeamSpan = document.querySelector('.event-name span:last-child')
// fetch(url)
.then((res) => {
  return res.json()
})
.then((data) =>{
  eventName = data.name
  console.log(eventName)
  let arr =[]
  arr = eventName.split(' at ')
  console.log(arr)
  awayTeamSpan.textContent = arr[0]
  homeTeamSpan.textContent = arr[1]
})