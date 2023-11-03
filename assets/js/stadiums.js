

// const teamUrl = "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams?limit=700"
// const dropDown = document.querySelector('#dropDown')
// dropDown.addEventListener('click', () => {
//     fetch(teamUrl)
//      .then(res => {
//         return res.json()
//      })
// })
// let stadiumName = "metlife+stadium"
// const stadiumurl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${stadiumName}&size=@2x&key=LpjPW9yazZcA1a5kMLxc6eNq8XiigHyr`
// const locationImg = document.querySelector('#location')

// function fetchStadiumImage(url) {
//    fetch (url)
//    .then(function(res){
//       return res
//    })
//    .then(function(data){
//       locationImg.setAttribute("src",data.url)
//    })
// }
// fetchStadiumImage (stadiumurl)

// const teamList = document.getElementsById("team-list");
// const searchBtn = document.getElementsById("searchBtn");
// const userInput = document.getElementsById("userInput");




// fetch(teamUrl)
//    .then(response => response.json())
//    .then(data => {
//       const teams = data.sports[0].leagues[0].teams;
//       const teamNames = [];
//       teams.forEach(team => {
//          const teamName = team.team.displayName;
//          teamNames.push(teamName);
//       });

//       displayTeams(teamNames);
//       userInput.addEventListener("input", function () {
//          const searchTerm = searchInput.ariaValueMax.toLowerCase();
//          const filteredTeams = teamNames.filter(teamName => teamName.toLowerCase().includes(searchTerm));
//          displayTeams(filteredTeams);
//       });
//    })

   // function displayTeams(teams) {
   //    teamList.innerHTML = "";
   //    teams.forEach(teamName => {
   //       const listItem = document.createElement("li");
   //       listItem.textContent = teamName;
   //       teamList.appendChild(listItem);
   //    });
   // }
   const searchInput = document.querySelector("#searchInput")
   const search = document.querySelector("#search")
   const locationImg = document.querySelector('#location')
   
   // function getVenueImageByInput() {
   //  fetch (venueUrl)
   //    .then((data) => {
   //      const venueImage = data.team.venue.image;
   //      console.log(`Venue Image URL: ${venueImage}`); 
   //      const venueImageContainer = document.getElementById("venueImageContainer");
   //      const imageElement = document.createElement("img");
   //      imageElement.src = venueImage;
        
       
   //      venueImageContainer.appendChild(imageElement);
   //    })
     
     
   //  }
   const teamUrl = ("https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams")

   search.addEventListener("submit", function(e){
      e.preventDefault()
      getVenueImageByInput()
   }) 
function getVenueImageByInput() {
fetch(teamUrl)
   .then((response) => {
      if(response.status === 200) {
         return response.json();
      } else {
         throw new Error("Failed to fetch data from the first API");
      }
   })
   .then((data) => {
      let teamId
      data.sports[0].leagues[0].teams.forEach(function(team){
         if (team.team.name === searchInput.value) {
            teamId = team.team.id
            console.log(teamId)
            searchInput.value = ""
         }
      })
         const secondApiUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}`;
         console.log(secondApiUrl)
      fetch (secondApiUrl)
      .then((response) => {
         if(response.status === 200) {
            return response.json();
         } else {
            throw new Error("Failed to fetch data from the first API");
         }
      })
      .then((data) => {
         let stadiumName = data.team.franchise.venue.fullName.split(" ").join("+")
         console.log(stadiumName) 
         const stadiumUrl = `https://www.mapquestapi.com/staticmap/v5/map?locations=${stadiumName}&size=@2x&key=LpjPW9yazZcA1a5kMLxc6eNq8XiigHyr`
         fetch (stadiumUrl)
         .then((response) => {
            if(response.status === 200) {
               return response;
            } else {
               throw new Error("Failed to fetch data from the first API");
            }
         })
         .then(data => {
           locationImg.setAttribute("src", data.url) 
         })
      })
      })
   }

//       const teamName = data.team.displayName;
//       if (userInput.toLowerCase() === teamName.toLowerCase()) {
//          console.log(`User input matches the team name: ${teamName}`);
//          console.log(`Team ID: ${teamId}`);

//          const secondApiUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams/${teamId}`;
//          fetch(secondApiUrl)
//          .then((response) => {
//            if (response.status === 200) {
//              return response.json();
//            } else {
//              throw new Error("Failed to fetch data from the second API");
//            }
//          })
//          .then((data) => {
//            const venueImage = data.team.venue.image;
//            console.log(`Venue Image URL: ${venueImage}`)
//          })
//          .catch((error) => {
//            console.error(error);
//          });
//      } else {
//        console.log(`User input does not match the team name: ${teamName}`);
//      }
//    })
//    .catch((error) => {
//      console.error(error);
//    });
// }








/* store users input to a variable
fetch to https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams
add if statement to match useres input to team name
if/else userinput matches teamname within api store teamid

2nd fetch
editurl https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2023/teams/ 
create var for team-id and attach to the end of the url 
add image 
locationImg.setAttribute */
