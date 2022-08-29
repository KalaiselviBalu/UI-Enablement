// Global Elements //
var wrapper = document.querySelector(".wrapper");
var notes_wrapper = document.querySelector(".notes-wrapper");
var addNoteArea = document.querySelector(".addNote");
var modal_container = document.querySelector(".modal-container");
var modal_heading = document.querySelector(".modal-header h4");
var modal_body = document.querySelector(".modal-body");
var modal_footer = document.querySelector(".modal-footer");
//End of global elements //

// Create new empty array and get local storage //
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let colorVal = "green";

// Create noteInfo Object//
let noteInfo;

// Get Todays Date //
var todaysDate = new Date();
// Get date value //

var dd = String(todaysDate.getDate());
// Get month value //

var month = todaysDate.toLocaleString('en-us', {
month: 'short'
});

// Start of function : addNote() //
function addNote() {
    
// Invoke : openModal() function //
openModal(modal.addNote.addNoteHeadingText , modal.addNote.addNoteBody , modal.addNote.addNoteButtons.cancelBtn , modal.addNote.addNoteButtons.confirmBtn);

// Select form //
var form = document.getElementById("addNoteForm");
var checkItem = document.querySelectorAll(".checkbox");

// Allow to select one checkbox and uncheck the rest //
for (var i = 0; i < checkItem.length; i++) {
    checkItem[i].onchange = function () {
        for (var i = 0; i < checkItem.length; i++) {
            if (checkItem[i] != this && this.checked) {
            // console.log("checkItem[i]" , checkItem[i]);
            // console.log("this" , this);
            // console.log(this.checked);
            colorVal = this.value;
            checkItem[i].checked = false;
            }   
        }
    };   
} 

// Event listener on form submit //
form.addEventListener("submit", function(event) {

    // Input value of note title //
    var noteTitle = document.querySelector("#note_title").value.trim();

    // Input value of note description //
    var noteDesc = document.querySelector("#note_desc").value.trim();

    // Prevent from submitting //
    event.preventDefault();

    // Prevent from creating multiple submits //
    event.stopImmediatePropagation();

    //Check for validation conditions //

    // Both values are empty //
    if (noteTitle === "" && noteDesc === "") {
    setErrorFor(note_title, error.requiredTitle);
    setErrorFor(note_desc, error.requiredDescription);
    }

    // note title is empty //
    else if (noteTitle === "") {
    setErrorFor(note_title, error.requiredTitle);
    }

    // note description is empty //
    else if (noteDesc === "") {
    setErrorFor(note_desc, error.requiredDescription);
    } 

    // Max title length //
    else if (noteTitle.length > error.maxLengthTitle) {
    setErrorFor(note_title, error.maxLengthTitleError);
    }

    // Max description length //
    else if (noteDesc.length > error.maxLengthDescription) {
    setErrorFor(note_desc, error.maxLengthDescriptionError);
    }

    else {
    setSuccessFor(note_title);
    setSuccessFor(note_desc);

    // Set object with values //
    noteInfo = {
    noteTitle,
    noteDesc,
    colorVal,
    date: `${month} ${dd}`
    }

    //Push each noteInfo to array //                  
    notes.push(noteInfo);

    // Function call : showNotes() //
    showNotes(noteInfo);

    // Set local storage for new note //
    localStorage.setItem("notes", JSON.stringify(notes));

    // Reset Input value of note title //
    var noteTitle = document.querySelector("#note_title").value = "";

    // Reset Input value of note description //
    var noteDesc = document.querySelector("#note_desc").value = "";

    colorVal = "bgChoiceGreen" ;
    // Invoke closeModal() function //
    closeModal();

    }
});
}
// End of function : addNote() //

// Start of Function : showNotes() //
function showNotes() {

    document.querySelectorAll(".note").forEach(div => div.remove());
    // Loop through each note in notes array //
    notes.forEach((note, id ) => {
    // Create note element //
    let noteElement = `
    <div class="note body-${note.colorVal}">
    <div class="note-header header-${note.colorVal}">
        <h2>${note.noteTitle}</h2>
    </div>
    <div class="note-body">
        <p>
            ${note.noteDesc}
        </p>
    </div>
    <div class="note-footer">
        <p>${note.date}</p>
        <button onclick="deleteNote(${id})"><i class="fa fa-solid fa-trash-can"></i></button>
    </div>
    </div>
    `;
    // Insert before end of note_wrapper_container //
    addNoteArea.insertAdjacentHTML("afterend", noteElement);
    });
}
// End of Function : showNotes() //


// Function call :  showNotes() //
showNotes();
// End of Function : showNotes() //


// Start of Function To  deleteNote //
function deleteNote(noteId) {
    // Invoke openModal() //
    openModal(modal.deleteNote.deleteNoteHeadingText ,
    modal.deleteNote.deleteNoteBody ,
    modal.deleteNote.deleteNoteButtons.cancelBtn , 
    modal.deleteNote.deleteNoteButtons.confirmBtn);

    document.querySelector(".confirmBtn").addEventListener("click", function() {
        // Remove element based on index in array //
        notes.splice(noteId, 1);
        closeModal();
        // Invoke show notes to display updated array //
        showNotes();
        localStorage.setItem("notes", JSON.stringify(notes));
    });
}
// End of Function : deleteNote() //

// Change based on view selection //

// Dom selection : select box //
const viewSelection = document.getElementById('viewBySelection');
// Event listener on change //
viewSelection.addEventListener('change', function handleChange(event) {
// Prevent default behaviour //    
event.preventDefault();
// Check for 2 column layout selection /
if (event.target.value == 2) {
// Add class for 2 column layout selection //
notes_wrapper.classList.add("two-col-layout");
} else {
// Change to 5 column layout selection //
notes_wrapper.classList.remove("two-col-layout");
}
});


// Start of function : openModal () //
function openModal(titleValue,bodyValue,buttonValue_1,buttonValue2){
modal_container.classList.add("show");
modal_heading.textContent = titleValue;
modal_body.innerHTML = bodyValue;
modal_footer.innerHTML = buttonValue_1 + buttonValue2;
}
// End of function : openModal () //

// Start of function : closeModal () //
function closeModal() {
modal_container.classList.remove("show");
}
// End of function : closeModal () //

// Function : Set error for input //
function setErrorFor(input, message) {
const formGroup = input.parentElement;
formGroup.classList.add('error');
input.classList.add("border-danger")
const error_text = formGroup.querySelector(".error-text");
error_text.classList.add("show")
error_text.innerText = message;
}

// Function : Set success for input //
function setSuccessFor(input) {
const formGroup = input.parentElement;
const error_text = formGroup.querySelector(".error-text");
error_text.classList.remove("show");
}