// Dream Constructor
function Dream (date, time, log) {  
    this.date = date;
    this.time = time;
    this.log = log;
  }


// UI Constructor
function UI () {}



//2nd local storage
// function Store () {}

// Store.prototype.getStoredDreams = function(){
//     let dreams;
//     if (localStorage.getItem('dreams') === null) {
//         dreams = [];
//     } else {
//         dreams = JSON.parse(localStorage.getItem('dreams'));
//     }
//     return dreams;
// }
// Store.prototype.displayStoredDreams = function(dream){
//     const store = new Store;
//     const dreams = store.getStoredDreams();
//     dreams.forEach(function(dream) {
//         const ui = new UI;
//         ui.addDreamToList(dream);
//     });
// }
// Store.prototype.storeDreams = function(dream){
//     const store = new Store;
//     const dreams = store.getStoredDreams();

//     dreams.push(dream);

//     localStorage.setItem('dreams', JSON.stringify(dreams));
// }
// Store.prototype.removeStoredDreams = function(){
    
// }

//first local storafge
// UI.prototype.setLocalStorage = function(dream){
        
//         localStorage.setItem('Jounral Date', `${dream.date}`);
//         localStorage.setItem('Jounral Time', `${dream.time}`);
//         localStorage.setItem('Jounral Log', `${dream.log}`);


    
// }

// UI.prototype.getLocalStorage(){
    
// }

// UI.prototype.removeLocalStorage = function(){
//     localStorage.clear();
// }




// UI Add Dream
UI.prototype.addDreamToList = function(dream){  
    const list = document.getElementById('dream-list'),
    lucidCheck = document.getElementById('Lucid-check'),
    row = document.createElement('tr');
    if (lucidCheck.checked) {
        row.className = 'lucid-log';
    } 

    row.innerHTML = `
        <td class="date">${dream.date}</td>
        <td>${dream.time}</td>
        <td>${dream.log}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}

// Clear form fields
UI.prototype.clearFields = function(){
   document.getElementById('Date').value = '';
   document.getElementById('Time').value = '';
   document.getElementById('Log').value = '';
   document.getElementById("Lucid-check").checked = false;
}

// Insert Success/Error Div 
UI.prototype.validationAlert = function(className, message){
    const container = document.getElementById('dream-form'),
        validationAlert = document.createElement('div');
        validationAlert.className = `
            ${className}
        `;
        validationAlert.appendChild(document.createTextNode(message));
        container.insertBefore(validationAlert, container.firstChild);

        if (className === 'lucid') {
            setTimeout(function(){
                container.removeChild(validationAlert);
            }, 8000);
        } else {
            setTimeout(function(){
                container.removeChild(validationAlert);
            }, 3000);
        }
}

UI.prototype.deleteDream = function(target){

    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
     }
  }
  

// Event Listener

//Add dream Event Listener
document.getElementById('dream-form').addEventListener('submit', function(e){
    const dateValidation = /[0-9]/,
          date = document.getElementById('Date').value,
          time = document.getElementById('Time').value,
          log = document.getElementById('Log').value,
          lucidCheck = document.getElementById("Lucid-check"),
          dream = new Dream(date, time, log),
          ui = new UI();
        //   store = new Store();

          //Validate then add dream if validation is correct
    if (date === '' || time === '' || log === '') {
        ui.validationAlert('error', 'Error: No input can be left empty...so fill it out');
    } else if(dateValidation.test(date)){
        ui.addDreamToList(dream);
        // store.storeDreams(dream);
        if (lucidCheck.checked) {
            ui.validationAlert('lucid', 'Impressive, but can you do this Noob?');
            ui.clearFields();
        } else {
            ui.validationAlert('success', 'Dream successfully logged. Now go to work bum.');
            ui.clearFields();
        }
        
    } else {
        ui.validationAlert('error', 'Error: Date input field can only contain numbers and hyphens');
    }
    e.preventDefault();
  });

  //Delete button Event Listener
  document.getElementById('dream-list').addEventListener('click', function(e){ 
    const ui = new UI;
    ui.deleteDream(e.target);
    ui.validationAlert('success', 'Dream entry removed');
    e.preventDefault();
  });