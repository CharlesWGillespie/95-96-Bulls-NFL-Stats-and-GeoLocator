searchBtn = document.querySelector("#search-btn");

const teamsUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";
const rosterUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/4/roster";

function fetchTeamData(url) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Having trouble loading page");
    }
    return response.json()
    .then((data) =>{
        const getData = data;
        showTeamData(data);
    })
  });
}
function showTeamData(data){
    console.log(data)
    const teamOne = data.sports[0].leagues[0].teams[0].team.logos[0].href; 
    const teamLink = data.sports[0].leagues[0].teams[0].team.links[0].href
    const teamSchedule = data.sports[0].leagues[0].teams[0].team.links[3].href

    const currentDay = dayjs().format('MM/DD/YYYY')


    const showTeamOne = document.querySelector('#team-logo')
    const showTeamLink= document.querySelector('#team-link')
    const showTeamSchedule = document.querySelector('#team-schedule')
    
    const currentDayId = document.querySelector('#current-date')


    showTeamOne.setAttribute('src', teamOne)
    showTeamLink.setAttribute('href', teamLink)
    showTeamSchedule.setAttribute('href', teamSchedule)

    currentDayId.textContent = `${currentDay}`
}

function fetchRosterData(url) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Having trouble loading roster");
    }
    return response.json()
    .then((data) =>{
        const getData = data;
        showTeamData(data);
    })
  });
}




function showRosterData(data){
    console.log(data)
}


fetchTeamData(teamsUrl);
fetchRosterData(rosterUrl);