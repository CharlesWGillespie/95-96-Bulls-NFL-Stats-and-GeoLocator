

const teamUrl = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams?limit=700"
const dropDown = document.querySelector('#dropDown')
dropDown.addEventListener('click', () => {
    fetch(teamUrl)
     .then(res => {
        return res.json()
     })
})


