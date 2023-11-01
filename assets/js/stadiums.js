

// const teamUrl = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams?limit=700"
// const dropDown = document.querySelector('#dropDown')
// dropDown.addEventListener('click', () => {
//     fetch(teamUrl)
//      .then(res => {
//         return res.json()
//      })
// })
let stadiumName = "metlife+stadium"
const stadiumurl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${stadiumName}&size=@2x&key=LpjPW9yazZcA1a5kMLxc6eNq8XiigHyr`
const locationImg = document.querySelector('#location')

function fetchStadiumImage(url) {
   fetch (url)
   .then(function(res){
      return res
   })
   .then(function(data){
      locationImg.setAttribute("src",data.url)
   })
}
fetchStadiumImage (stadiumurl)

/* store users input to a variable
fetch to https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams
add if statement to match useres input to team name
if/else userinput matches teamname within api store teamid

2nd fetch
editurl https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams/ 
create var for team-id and attach to the end of the url 
add image 
locationImg.setAttribute */
