window.addEventListener("load", ()=>{

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         missionTarget.style.visibility = "visible";
         const destination = document.getElementById("missiontTarget");
         let index = Math.floor(Math.random()*Object.keys(json).length);
          
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
         <img src="${json[index].image}">
         `;
      });
   }); 
  
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      
      event.preventDefault();
     
      const pilotName = document.querySelector("input[name=pilotName]");
      const pilotStatus = document.getElementById("pilotStatus");
      pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`

      const copilotName = document.querySelector("input[name=copilotName]");
      const copilotStatus = document.getElementById("copilotStatus");
      copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`

      const fuelLevel = document.querySelector("input[name=fuelLevel]");
      const fuelStatus = document.getElementById("fuelStatus");
    
      const cargoMass = document.querySelector("input[name=cargoMass]");
      const cargoStatus = document.getElementById("cargoStatus");

      console.log(`type: ${typeof pilotName.value}`);
      if (pilotName.value === "" || !isNaN(pilotName.value)  || (typeof pilotName.value) !== 'string') {
         alert('"Pilot Name:" is required and must be a number')
         event.preventDefault();
      }
      if (copilotName.value === "" || !isNaN(copilotName.value) ) {
         alert('"Co-Pilot Name:" is required and must NOT be a number')
         event.preventDefault();
      }
      if (fuelLevel.value === "" || isNaN(fuelLevel.value)) {
         alert('Fuel Level:" is required and must NOT be a number')
         event.preventDefault();
      }
      if (cargoMass.value === "" || isNaN(cargoMass.value)) {
         alert('Cargo Mass:" is required and must be a number')
         event.preventDefault();
      }
      if (pilotName.value === "" || !isNaN(pilotName.value) || 
      copilotName.value === "" || !isNaN(copilotName.value) || 
      fuelLevel.value === "" || isNaN(fuelLevel.value) ||
      cargoMass.value === "" || isNaN(cargoMass.value) ) {
         return;
      }

      const launchStatus = document.getElementById("launchStatus");
      const faultyItems = document.getElementById("faultyItems");
      launchStatus.style.color = "green";
      launchStatus.innerHTML ="Shuttle Ready For Launch";


      function fail() {
         launchStatus.innerHTML ="Shuttle not ready for launch";
         launchStatus.style.color = "red";
         faultyItems.style.visibility = "visible";
      }

      if(Number(fuelLevel.value) < 10000) {
         fuelStatus.innerHTML = `${fuelLevel.value}(L) is NOT enough fuel for the journey`;
         fail();
      } else { 
         fuelStatus.innerHTML = `${fuelLevel.value}(L) is good. Ready to launch`;
      }

      if(Number(cargoMass.value) > 10000) {
         cargoStatus.innerHTML = `${cargoMass.value}(kg) is too much mass for the journey.`;
         fail();
      } else {
         cargoStatus.innerHTML = `${cargoMass.value}(kg) is good. Ready to launch.`;
      }


    
   });
});

