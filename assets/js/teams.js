searchBtn = document.querySelector("#search-btn");

const teamsUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";
const rosterUrl =
    "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/19/roster";
    
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
        showRosterData(data);
    })
});
}



 const offenseRoster = document.querySelector('#offense-roster')
 const defenseRoster = document.querySelector('#defense-roster')
 const specialTeansRoster = document.querySelector('#special-teams-roster')


function showRosterData(data){
    console.log(data)
    
    const coachFirstName = data.coach[0].firstName;
    const coachLastName = data.coach[0].lastName
    
    const showCoachName = document.querySelector('#coach-name')
    
    showCoachName.textContent = `${coachFirstName} ${coachLastName}`
    // offense  foreach loop for player data
    data.athletes[0].items.forEach((item) =>{ 
        const playerName = item.fullName
        //create div, append child name, append child player POS
        const playerPOS = item.position.abbreviation
        const playerNUM = item.jersey
        
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        

        div.appendChild(h3)
        

        h3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `
         
        offenseRoster.appendChild(div)
    })
    // defense foreach loop for player data

    data.athletes[1].items.forEach((item) =>{ 
        const playerName = item.fullName
        //create div, append child name, append child player POS
        const playerPOS = item.position.abbreviation
        const playerNUM = item.jersey
        
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        

        div.appendChild(h3)
        

        h3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `
         
        defenseRoster.appendChild(div)
    })
    // special teams foreach loop for player data
    data.athletes[1].items.forEach((item) =>{ 
        const playerName = item.fullName
        //create div, append child name, append child player POS
        const playerPOS = item.position.abbreviation
        const playerNUM = item.jersey
        
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        

        div.appendChild(h3)
        

        h3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `
         
        specialTeansRoster.appendChild(div)
    })

}


fetchTeamData(teamsUrl);
fetchRosterData(rosterUrl);