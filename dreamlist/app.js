// Dream Constructor
function Dream (date, time, log, lucidCheck) {  
    this.date = date;
    this.time = time;
    this.log = log;
    this.lucidCheck = lucidCheck;
  }

// UI Constructor
function UI () {}

// Local Storage Constructor
function Store () {}

//UI Prototypes
// Clear form fields
UI.prototype.clearFields = function(){
   document.getElementById('Date').value = '';
   document.getElementById('Time').value = '';
   document.getElementById('Log').value = '';
   document.getElementById("Lucid-check").checked = false;
}

// Insert Success/Error Div 
UI.prototype.showAlert = function(className, message){
    const container = document.getElementById('dream-form'),
        showAlert = document.createElement('div');
        showAlert.className = `
            ${className}
        `;
        showAlert.appendChild(document.createTextNode(message));
        container.insertBefore(showAlert, container.firstChild);

        if (className === 'lucid') {
            setTimeout(function(){
                container.removeChild(showAlert);
            }, 8000);
        } else {
            setTimeout(function(){
                container.removeChild(showAlert);
            }, 6000);
        }
}

UI.prototype.deleteDream = function(target){
        target.parentElement.parentElement.remove();
  }

// UI Add Dream
UI.prototype.addDreamToList = function(dream){  
    const list = document.getElementById('dream-list'),
        row = document.createElement('tr');
    if (dream.lucidCheck) {
        row.className = 'lucid-log';
    } 

    row.innerHTML = `
        <td>${dream.date}</td>
        <td>${dream.time}</td>
        <td>${dream.log}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}


//Local Storage Prototypes
//Step 1: Check/Get Dreams from LS
Store.prototype.getLocalDreams = function(){
    let dreams;
    if (localStorage.getItem('dreams') === null) {
        dreams = [];
    } else {
        // Parse the JSON string and assign it to dreams array
        dreams = JSON.parse(localStorage.getItem('dreams'));
    }   
    return dreams;
}

//Step 2: Display local Dreams
Store.prototype.displayLocalDreams = function(){
    const store = new Store;
          ui = new UI,
          dreams = store.getLocalDreams();
    dreams.forEach(function(dream){
        ui.addDreamToList(dream);
    });
}

//Step 3: Set dreams to local
Store.prototype.addLocalDreams = function(dream){
    const store = new Store;
    const dreams = store.getLocalDreams();
    dreams.push(dream);
    // Convert dreams array into a JSON string so it can be stored in LS
    localStorage.setItem('dreams', JSON.stringify(dreams));
}

//Step 4: Remove local dream
Store.prototype.removeLocalDreams = function(log){
    const store = new Store;
          dreams = store.getLocalDreams();
    dreams.forEach(function(dream, index) {
        if (dream.log === log) {
            dreams.splice(index, 1)            
        }
    });
    localStorage.setItem('dreams', JSON.stringify(dreams));
}


// Event Listener
//Add dream Event Listener
document.getElementById('dream-form').addEventListener('submit', function(e){
    // Date/time form validation
    const dateValidation = /^([0-9]{1,2}[\-\/]){2}[0-9]{2,4}$/,
          timeValidation = /^([0-9]{1,2}[\:][0-9]{2})/,
          //checks for a.m. or p.m. at the end of the time
          nightDayValidation = /[ap].m.$/i
          // Grab input values, then pass into instantiated dream
          date = document.getElementById('Date').value,
          time = document.getElementById('Time').value,
          log = document.getElementById('Log').value,
          lucidCheck = document.getElementById("Lucid-check").checked,
          dream = new Dream(date, time, log, lucidCheck),
          ui = new UI(),
          store = new Store;

    // If inputs are empty, throw empty error
    if (dream.date === '' || dream.time === '' || dream.log === '') {
        ui.showAlert('error', 'Error: Date, time and log can\'t be left empty...so fill them out!');
    } 
    // If all inputs are valid, add dream to UI and LS
    else if(dateValidation.test(date) & timeValidation.test(time) & nightDayValidation.test(time)) {
        ui.addDreamToList(dream);
        store.addLocalDreams(dream);
        // If lucid dream box is checked, add a special alert, otherwise add the regular alert
        if (dream.lucidCheck) {
            ui.showAlert('lucid', 'Impressive, but can you do this Noob?');
        } else {
            ui.showAlert('success', 'Dream successfully logged. Now go to work bum.');
        }
        // clear all fields once we've successfully added the dreams
        ui.clearFields();
    } 
    // If date fails validation, throw date error
    else if (!dateValidation.test(date)) {
        ui.showAlert('error', "Error: Date input field must be formated correctly, some acceptable examples are: 11-11-11 and 1/1/1.");
    }
    // Otherwise the Time validation failed, so throw that error
    else {
        ui.showAlert('error', "Error: Time input field must be formated correctly, some acceptable examples are: 9:00 A.M. and 08:00p.m.");
    }
    e.preventDefault();
  });

  //Delete button Event Listener
  document.getElementById('dream-list').addEventListener('click', function(e){ 
    const ui = new UI,
          store = new Store;
    if (e.target.className === 'delete') {
        ui.deleteDream(e.target);
        ui.showAlert('success', 'Dream entry removed');
        store.removeLocalDreams(e.target.parentElement.previousElementSibling.textContent);    
    }
  });


  //Display dream(s) from local storage to UI
  document.addEventListener('DOMContentLoaded', function(e){
    const store = new Store;
    store.displayLocalDreams();
  });