const idParameter = window.location.search
let team
team = checkForParameter()

const suggestedTeamsURL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";
const teamsUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}`;
const rosterUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team}/roster`;

function fetchSuggestedTeamData(url) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Having trouble loading page");
    }
    return response.json().then((data) => {
      const getData = data;
      showSuggestedTeamData(data);
    });
  });
}

function showSuggestedTeamData(data) {
  console.log(data);
  // for suggested section
  const suggestedOne = data.sports[0].leagues[0].teams[3].team.logos[0].href;
  const suggestedOneName = data.sports[0].leagues[0].teams[3].team.nickname;
  const suggestedTwo = data.sports[0].leagues[0].teams[6].team.logos[0].href;
  const suggestedTwoName = data.sports[0].leagues[0].teams[6].team.nickname;
  const suggestedThree = data.sports[0].leagues[0].teams[18].team.logos[0].href;
  const suggestedThreeName = data.sports[0].leagues[0].teams[18].team.nickname;
  const suggestedFour = data.sports[0].leagues[0].teams[19].team.logos[0].href;
  const suggestedFourName = data.sports[0].leagues[0].teams[19].team.nickname;

  // target suggested img and paragraph
  const showSuggestedOne = document.querySelector("#suggested-one");
  const showSuggestedOneName = document.querySelector("#suggested-team-name-one");
  const showSuggestedTwo = document.querySelector("#suggested-two");
  const showSuggestedTwoName = document.querySelector("#suggested-team-name-two");
  const showSuggestedThree = document.querySelector("#suggested-three");
  const showSuggestedThreeName = document.querySelector("#suggested-team-name-three");
  const showSuggestedFour = document.querySelector("#suggested-four");
  const showSuggestedFourName = document.querySelector("#suggested-team-name-four");

  //show logo and team name for suggested
  showSuggestedOne.setAttribute("src", suggestedOne);
  showSuggestedTwo.setAttribute("src", suggestedTwo);
  showSuggestedThree.setAttribute("src", suggestedThree);
  showSuggestedFour.setAttribute("src", suggestedFour);

  showSuggestedOneName.textContent = `${suggestedOneName}`;
  showSuggestedTwoName.textContent = `${suggestedTwoName}`;
  showSuggestedThreeName.textContent = `${suggestedThreeName}`;
  showSuggestedFourName.textContent = `${suggestedFourName}`;
}

function fetchTeamData(url) {
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Having trouble loading page");
    }
    return response.json().then((data) => {
      const getData = data;
      showTeamData(data);
    });
  });
}
function showTeamData(data) {
  console.log(data);
  //for team data
  const teamOne = data.team.logos[0].href;
  const teamLink = data.team.links[0].href;
  const teamSchedule = data.team.links[3].href;
  const teamName = data.team.displayName;

  // const currentDay = dayjs().format('MM/DD/YYYY')

  //target id's for team data
  const showTeamOne = document.querySelector("#team-logo");
  const showTeamLink = document.querySelector("#team-link");
  const showTeamSchedule = document.querySelector("#team-schedule");
  const showTeamName = document.querySelector("#team-name");

  showTeamOne.setAttribute("src", teamOne);
  showTeamLink.setAttribute("href", teamLink);
  showTeamSchedule.setAttribute("href", teamSchedule);

  showTeamName.textContent = `${teamName}`;
}

function fetchRosterData(url) {
  
  fetch(url).then((response) => {
    // if (!response.ok) {
    //   throw new Error("Having trouble loading roster");
    // }
    return response.json().then((data) => {
      const getData = data;
      showRosterData(data);
    });
  });
}

const offenseRoster = document.querySelector("#offense-roster");
const defenseRoster = document.querySelector("#defense-roster");
const specialTeansRoster = document.querySelector("#special-teams-roster");

function showRosterData(data) {
  console.log(data);

  const coachFirstName = data.coach[0].firstName;
  const coachLastName = data.coach[0].lastName;

  const showCoachName = document.querySelector("#coach-name");

  showCoachName.textContent = `${coachFirstName} ${coachLastName}`;
  // offense  foreach loop for player data
  data.athletes[0].items.forEach((item) => {
    const playerName = item.fullName;
    //create div, append child name, append child player POS
    const playerPOS = item.position.abbreviation;
    const playerNUM = item.jersey;

    const offenseDiv = document.createElement("div");
    const offenseH3 = document.createElement("h3");

    offenseDiv.appendChild(offenseH3);

    offenseH3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `;

    offenseRoster.appendChild(offenseDiv);
  });
  // defense foreach loop for player data

  data.athletes[1].items.forEach((item) => {
    const playerName = item.fullName;
    //create div, append child name, append child player POS
    const playerPOS = item.position.abbreviation;
    const playerNUM = item.jersey;

    const defenseDiv = document.createElement("div");
    const defenseH3 = document.createElement("h3");

    defenseDiv.appendChild(defenseH3);

    defenseH3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `;

    defenseRoster.appendChild(defenseDiv);
  });
  // special teams foreach loop for player data
  data.athletes[1].items.forEach((item) => {
    const playerName = item.fullName;
    //create div, append child name, append child player POS
    const playerPOS = item.position.abbreviation;
    const playerNUM = item.jersey;

    const specialTeamsDiv = document.createElement("div");
    const specialTeamsH3 = document.createElement("h3");

    specialTeamsDiv.appendChild(specialTeamsH3);

    specialTeamsH3.textContent = `${playerName} #${playerNUM} | ${playerPOS} `;

    specialTeansRoster.appendChild(specialTeamsDiv);
  });
}

function checkForParameter() {  
  if (idParameter) {
    let teamId = idParameter.split('=')[1]
    return teamId
  } else {
    let teamId = Math.floor(Math.random() * 32)
    return teamId
  }
}

checkForParameter()
fetchTeamData(teamsUrl);
fetchRosterData(rosterUrl);
fetchSuggestedTeamData(suggestedTeamsURL);
