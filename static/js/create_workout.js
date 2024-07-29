// Array of workout exercises
let workoutExercises = [
    "Bench Press",
    "Cable Fly",
    "Bicep curls",
    "Tricep Extensions",
    "Lateral Raises",
    "Pull Ups",
    "Squats",
    "Calf Raises",
    "Seated Cable Row",
    "Deadlifts"
  ];
  
  // Arrays to track routine A and routine B exercises
  let routineA = [];
  let routineB = [];
  let openedExercises = [];
  
  const bodyParts = {
      "Bench Press": "Chest",
      "Cable Fly": "Chest",  
      "Bicep curls": "Arms",
      "Tricep Extensions": "Arms",
      "Lateral Raises": "Back",
      "Pull Ups": "Back",
      "Squats": "Legs",
      "Calf Raises": "Legs",
      "Seated Cable Row": "Back",
      "Deadlifts": "Back"
  };
  // Dictionary to store exercise IDs by name
  let exerciseIdsByName = {
      "Bench Press": 0,
      "Cable Fly": 1,
      "Bicep curls": 2,
      "Tricep Extensions": 3,
      "Lateral Raises": 4,
      "Pull Ups": 5, 
      "Squats": 6,
      "Calf Raises": 7,
      "Seated Cable Row": 8,
      "Deadlifts": 9
  };
  
  // Populate the workout list dynamically
  const workoutList = document.getElementById("workoutList");
  populateLists();
  
  function handleQuizButtonClick(event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    saveRoutines(function() {
      window.location.href = '/view_quiz/0'; // Navigate after saving routines
    });
  }
  
  function saveRoutines(callback) {
    $.ajax({
      url: '/save_routines/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ routineA: routineA, routineB: routineB }),
      success: function(response) {
        console.log(response.message);
        if (response.success) {
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          alert("Failed to save routines.");
        }
      },
      error: function() {
        console.error('Error occurred while saving routines');
      }
    });
  }
  
  // Populate Routine A list dynamically
  const routineAList = document.getElementById("routineAList");
    routineA.forEach((exercise, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/view_workout/${exerciseIdsByName[exercise]}`;
      link.textContent = exercise;
      li.appendChild(link);
      li.draggable = true;
      li.id = `exerciseA${index + 1}`;
      li.setAttribute("data-target", bodyParts[exercise]);
      li.addEventListener("dragstart", drag);
      routineAList.appendChild(li);
      routineA.push(li.id);
    });
  
    // Populate Routine B list dynamically
    const routineBList = document.getElementById("routineBList");
    routineB.forEach((exercise, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/view_workout/${exerciseIdsByName[exercise]}`;
      link.textContent = exercise;
      li.appendChild(link);
      li.draggable = true;
      li.id = `exerciseB${index + 1}`;
      li.setAttribute("data-target", bodyParts[exercise]);
      li.addEventListener("dragstart", drag);
      routineBList.appendChild(li);
      routineB.push(li.id);
    });
  
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.textContent);
    ev.dataTransfer.setData("target", ev.target.getAttribute("data-target"));
  }
  
  function drop(ev, targetList) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var target = ev.dataTransfer.getData("target");
    target_muscle = bodyParts[data];
    //console.log("before drop")
    //console.log(routineA, routineB, workoutExercises);
    updateLists(targetList, data, target);
    //console.log(routineA, routineB, workoutExercises);
    populateLists();
  }
  
  function loadListsFromServer() {
    fetch('/get_lists')
        .then(response => response.json())
        .then(data => {
            // Update the JavaScript lists with the data received from the server
            routineA = data.routineA;
            routineB = data.routineB;
            workoutExercises = data.workoutExercises;
            openedExercises = data.openedExercises;
            console.log(routineA, routineB, workoutExercises);
            // Perform any additional actions required with the updated lists
        })
        .catch(error => {
            console.error('Error:', error);
        });
      }
  
  
  
  function highlightBodyPart(part, targetList) {
      let frontContainer, backContainer;
  
      if (targetList === 'routineAList') {
          frontContainer = document.querySelector('.silhouette-front');
          backContainer = document.querySelector('.silhouette-back');
      } else if (targetList === 'routineBList') {
          frontContainer = document.querySelector('.silhouette-front-2');
          backContainer = document.querySelector('.silhouette-back-2');
      }
  
      // Add red overlay divs based on the body part
      switch (part) {
          case 'Chest':
              frontContainer.appendChild(createOverlayDiv('red-overlay-chest'));
              break;
          case 'Back':
              backContainer.appendChild(createOverlayDiv('red-overlay-back'));
              break;
          case 'Arms':
              frontContainer.appendChild(createOverlayDiv('red-overlay-arms'));
              backContainer.appendChild(createOverlayDiv('red-overlay-arms'));
              break;
          case 'Legs':
              frontContainer.appendChild(createOverlayDiv('red-overlay-legs'));
              backContainer.appendChild(createOverlayDiv('red-overlay-legs'));
              break;
          default:
              break;
      }
  }
  
  // Function to create overlay div
  function createOverlayDiv(className) {
      const div = document.createElement('div');
      div.classList.add(className);
      return div;
  }
  
  function unhighlightBodyPart() {
      frontContainer = document.querySelector('.silhouette-front');
      backContainer = document.querySelector('.silhouette-back');
  
      // Remove all red overlay divs from both front and back containers
      removeOverlayDiv(frontContainer, 'red-overlay-chest');
      removeOverlayDiv(backContainer, 'red-overlay-back');
      removeOverlayDiv(frontContainer, 'red-overlay-arms');
      removeOverlayDiv(backContainer, 'red-overlay-arms');
      removeOverlayDiv(frontContainer, 'red-overlay-legs');
      removeOverlayDiv(backContainer, 'red-overlay-legs');
  
      frontContainer = document.querySelector('.silhouette-front-2');
      backContainer = document.querySelector('.silhouette-back-2');
  
      // Remove all red overlay divs from both front and back containers
      removeOverlayDiv(frontContainer, 'red-overlay-chest');
      removeOverlayDiv(backContainer, 'red-overlay-back');
      removeOverlayDiv(frontContainer, 'red-overlay-arms');
      removeOverlayDiv(backContainer, 'red-overlay-arms');
      removeOverlayDiv(frontContainer, 'red-overlay-legs');
      removeOverlayDiv(backContainer, 'red-overlay-legs');
  }
  
  // Function to remove overlay div
  function removeOverlayDiv(container, className) {
      const divToRemove = container.querySelector('.' + className);
      if (divToRemove) {
          container.removeChild(divToRemove);
      }
  }
  
  // Function to reload all three lists
  function updateLists(targetList, data, target) {
      if (targetList === "routineAList") {
          routineA = routineA.filter(exercise => exercise !== data);
          routineB = routineB.filter(exercise => exercise !== data);
          workoutExercises = workoutExercises.filter(exercise => exercise !== data);
          routineA.push(data);
      } 
      else if (targetList === "workoutList") {
          routineA = routineA.filter(exercise => exercise !== data);
          routineB = routineB.filter(exercise => exercise !== data);
          workoutExercises = workoutExercises.filter(exercise => exercise !== data);
          workoutExercises.push(data);
      }
      else if (targetList === "routineBList") {
          routineA = routineA.filter(exercise => exercise !== data);
          routineB = routineB.filter(exercise => exercise !== data);
          workoutExercises = workoutExercises.filter(exercise => exercise !== data);
          routineB.push(data);
      }
  
      checkRoutineCoverage();
    sendUpdatedListsToServer();
  }
  
  function populateLists(){
      // Clear the lists
    document.getElementById("routineAList").innerHTML = "";
    document.getElementById("routineBList").innerHTML = "";
    document.getElementById("workoutList").innerHTML = "";
  
    // Repopulate Routine A list dynamically
    routineA.forEach((exercise, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/view_workout/${exerciseIdsByName[exercise]}`;
        link.textContent = exercise; 
        link.draggable = true; 
        link.id = `exerciseA${index + 1}`; 
        link.setAttribute("data-target", bodyParts[exercise]);
        link.addEventListener("dragstart", function(ev) {
            drag(ev, link.id); 
        });
        li.appendChild(link); 
        document.getElementById("routineAList").appendChild(li);
    });
  
    // Repopulate Routine B list dynamically
    routineB.forEach((exercise, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/view_workout/${exerciseIdsByName[exercise]}`;
        link.textContent = exercise;
        link.draggable = true;
        link.id = `exerciseB${index + 1}`; 
        link.setAttribute("data-target", bodyParts[exercise]);
        link.addEventListener("dragstart", function(ev) {
            drag(ev, link.id);
        });
  
        li.appendChild(link);
        document.getElementById("routineBList").appendChild(li);
    });
  
    // Repopulate the workout list dynamically
    workoutExercises.forEach((exercise, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/view_workout/${exerciseIdsByName[exercise]}`;
      link.draggable = false; // Setting draggable to false for the link
      link.textContent = exercise;
      li.appendChild(link);
      li.id = `exercise${100*index + 1}`;
      li.setAttribute("data-target", bodyParts[exercise]);
      // Check if the exercise should be draggable
      if (openedExercises.includes(exercise)) {
          li.draggable = true;
          li.addEventListener("dragstart", drag);
          // Adding styles to make it look like a button
          li.style.padding = "10px 20px";
          li.style.border = "1px solid #ccc";
          li.style.background = "#f0f0f0";
          li.style.cursor = "pointer";
          li.style.borderRadius = "5px";
          li.style.margin = "5px";
          li.style.display = "inline-block";
      }
      // Add click event to link
      link.addEventListener("click", (event) => {
          // Optional: Prevent default if you need to do something before navigating
          event.preventDefault();
          // Add to openedExercises if not already present
          console.log(exercise);
          if (!openedExercises.includes(exercise)) {
              openedExercises.push(exercise);
          }
          console.log(openedExercises);
          // Send updated lists to server
          sendUpdatedListsToServer();
          // Optional: Navigate manually if default was prevented
          window.location.href = link.href;
      });
      document.getElementById("workoutList").appendChild(li);
    });
  
    
  
    updateTickBoxes()
    
  }
  
  // Change silhouette based on gender selection
  document.querySelectorAll('input[name="gender"]').forEach(input => {
    input.addEventListener("change", function(event) {
      let gender = event.target.value;
      document.querySelectorAll(".silhouette img").forEach(img => {
        if (img.classList.contains(gender)) {
          img.classList.remove("hide");
        } else {
          img.classList.add("hide");
        }
      });
      document.querySelectorAll(".silhouette-front img").forEach(img => {
        if (img.classList.contains(gender)) {
          img.classList.remove("hide");
        } else {
          img.classList.add("hide");
        }
      });
      document.querySelectorAll(".silhouette-back img").forEach(img => {
        if (img.classList.contains(gender)) {
          img.classList.remove("hide");
        } else {
          img.classList.add("hide");
        }
      });
      document.querySelectorAll(".silhouette-front-2 img").forEach(img => {
        if (img.classList.contains(gender)) {
          img.classList.remove("hide");
        } else {
          img.classList.add("hide");
        }
      });
      document.querySelectorAll(".silhouette-back-2 img").forEach(img => {
        if (img.classList.contains(gender)) {
          img.classList.remove("hide");
        } else {
          img.classList.add("hide");
        }
      });
    });
  });
  
  
  
  //Updates our tickboxes
  function updateTickBoxes() {
  
      // Check checkboxes based on the presence of red overlays in routineA
      document.getElementById('armsCheckbox-2').checked = muscleExistsInList('Arms', 'routineAList');
      document.getElementById('legsCheckbox-2').checked = muscleExistsInList('Legs', 'routineAList');
      document.getElementById('backCheckbox-2').checked = muscleExistsInList('Back', 'routineAList');
      document.getElementById('chestCheckbox-2').checked = muscleExistsInList('Chest', 'routineAList');
  
      // Check checkboxes based on the presence of red overlays in routineB
      document.getElementById('armsCheckbox').checked = muscleExistsInList('Arms', 'routineBList');
      document.getElementById('legsCheckbox').checked = muscleExistsInList('Legs', 'routineBList');
      document.getElementById('backCheckbox').checked = muscleExistsInList('Back', 'routineBList');
      document.getElementById('chestCheckbox').checked = muscleExistsInList('Chest', 'routineBList');
  
      unhighlightBodyPart();
  
      // Highlight body parts if checkboxes are checked
      if (muscleExistsInList('Arms', 'routineAList')) {
          highlightBodyPart('Arms', 'routineAList');
      }
      if (muscleExistsInList('Legs', 'routineAList')) {
          highlightBodyPart('Legs', 'routineAList');
      }
      if (muscleExistsInList('Back', 'routineAList')) {
          highlightBodyPart('Back', 'routineAList');
      }
      if (muscleExistsInList('Chest', 'routineAList')) {
          highlightBodyPart('Chest', 'routineAList');
      }
      if (muscleExistsInList('Arms', 'routineBList')) {
          highlightBodyPart('Arms', 'routineBList');
      }
      if (muscleExistsInList('Legs', 'routineBList')) {
          highlightBodyPart('Legs', 'routineBList');
      }
      if (muscleExistsInList('Back', 'routineBList')) {
          highlightBodyPart('Back', 'routineBList');
      }
      if (muscleExistsInList('Chest', 'routineBList')) {
          highlightBodyPart('Chest', 'routineBList');
      }
      
  }
  
  function muscleExistsInList(muscle, listType) {
      let list;
      if (listType === 'routineAList') {
          list = routineA;
      } else if (listType === 'routineBList') {
          list = routineB;
      }
      return list.some(exercise => bodyParts[exercise] === muscle);
  }
  
  function checkRoutineCoverage() {
      // Reference the quiz button
      const quizButton = document.querySelector('.button[href="/view_quiz/0"]');
      
      // Check routine A coverage
      const routineACoversAll = muscleExistsInList('Arms', 'routineAList') &&
                                muscleExistsInList('Legs', 'routineAList') &&
                                muscleExistsInList('Back', 'routineAList') &&
                                muscleExistsInList('Chest', 'routineAList');
      
      // Check routine B coverage
      const routineBCoversAll = muscleExistsInList('Arms', 'routineBList') &&
                                muscleExistsInList('Legs', 'routineBList') &&
                                muscleExistsInList('Back', 'routineBList') &&
                                muscleExistsInList('Chest', 'routineBList');
      
      // Enable or disable the quiz button
      if (routineACoversAll && routineBCoversAll) {
          quizButton.style.display = 'inline-block'; // Show button
      } else {
          quizButton.style.display = 'none'; // Hide button
      }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
      // Load the lists from the server when the page loads
      fetch('/get_lists')
        .then(response => response.json())
        .then(data => {
            // Update the JavaScript lists with the data received from the server
            routineA = data.routineA;
            routineB = data.routineB;
            workoutExercises = data.workoutExercises;
            openedExercises = data.openedExercises;
            console.log(routineA, routineB, workoutExercises, openedExercises);
            populateLists();
            checkRoutineCoverage();
            // Perform any additional actions required with the updated lists
        })
        .catch(error => {
            console.error('Error:', error);
        });
  });
  
  // Function to send updated lists to the server
  function sendUpdatedListsToServer() {
      // Prepare data to send in the AJAX request
      const data = {
          routineA: routineA,
          routineB: routineB,
          workoutExercises: workoutExercises,
          openedExercises: openedExercises
      };
  
      // Send POST request to Flask route
      fetch('/update_lists', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              console.log('Lists updated successfully');
          } else {
              console.error('Failed to update lists');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  
  window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
          // The page was loaded from the cache
          window.location.reload();
      }
  });
  
  