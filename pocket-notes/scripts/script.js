// Import APP_CONSTANTS //
import { APP_CONSTANTS } from "./constants/constants.js";


// Select notes-wrapper //

const NOTES_WRAPPER = document.querySelector(".notes-wrapper");
// Select add-note //
const ADD_NOTE_WRAPPER = document.querySelector(".add-note");

// Select modal-container //
const MODAL_CONTAINER = document.querySelector(".modal-container");

//Select add-note-form //
const FORM = document.getElementById("add-note-form");

// Start of APP_CONSTANTS PROPERTIES //
const MODAL_DATA_ADD_NOTE = APP_CONSTANTS.MODAL_DATA.ADD_NOTE;
const MODAL_DATA_DELETE_NOTE = APP_CONSTANTS.MODAL_DATA.DELETE_NOTE;
const FORM_INPUT_DATA_ADD = APP_CONSTANTS.FORM_INPUT_DATA.INPUT_FIELDS.ADD_NOTE;
// End of APP_CONSTANTS PROPERTIES //


// Create NOTES_ARR //
const NOTES_ARR = JSON.parse(localStorage.getItem("NOTES_ARR") || "[]");

// Create noteObject //
let noteObject ;

  
       //  Start of layout change selection //
        (function () {
             // Invoke createNoteElement() //
            document.querySelector("#add-note-btn").addEventListener("click" , createNoteElement);
            
            // Invoke ShowNotes() //
            showNotes();
           

            // Select view-selection container  //
            const VIEW_SELECTION = document.querySelector(".header .view-selection");

            // Create DOM Element for select box //
            const SELECT_CONTAINER = document.createElement("select");

            // Set attribute for select box //
            SELECT_CONTAINER.setAttribute("id" , "view-by-selection");

            // Create arr from layout options //
            const OPTIONS_ARR = APP_CONSTANTS.LAYOUT_OPTIONS;

            // Iterate option values //
            let optionValues = OPTIONS_ARR.map((option,index) => {
                return `<option key=${option.CLASS_NAME}>${option.LABEL}</option>`;
            });

            // Set innerHTML value for select box//
            SELECT_CONTAINER.innerHTML = optionValues;

            // Insert select box in view selection
            VIEW_SELECTION.insertAdjacentElement("beforeend" , SELECT_CONTAINER);

            // Add Event listerner on change //
            SELECT_CONTAINER.addEventListener("change" , changeLayout);

            //Function : ChangeLayout //
            function changeLayout(){

                // Target selected value to apply class name //
                let selectedLayoutValue = SELECT_CONTAINER.options[SELECT_CONTAINER.selectedIndex].getAttribute('key');

                // Add class name to change layout //
                NOTES_WRAPPER.className = "notes-wrapper container "+selectedLayoutValue;

            }
        })();
            //  End of layout change selection //
           
        // Start of function createNoteElement() //
        function createNoteElement() {
            createModal(ADD_NOTE_MODAL); 
            showModal();
            showColorOptions();
            document.querySelector("#submit-form").addEventListener("click" , submitForm);
        }   

        // Start of function createNoteElement() //
 
        const ADD_MODAL_TITLE = MODAL_DATA_ADD_NOTE.MODAL_TITLE;
        const ADD_MODAL_BUTTONS = MODAL_DATA_ADD_NOTE.BUTTON_LABELS;
        
        const ADD_NOTE_MODAL = `<div class="modal">
                                        <div class="modal-header">
                                            <h4>${ADD_MODAL_TITLE}</h4>
                                        </div>
                                        <form action="" id="add-note-form">
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <input
                                                    type="text"
                                                    name="note-title"
                                                    id="note-title"
                                                    placeholder = "Note Title"
                                                    class="input-item"
                                                    />
                                                    <span class="error-text error-text-title"></span>
                                                </div>
                                                <div class="form-group">
                                                    <textarea
                                                        name="note-desc"
                                                        id="note-desc"
                                                        rows="7"
                                                        class="input-item"
                                                        placeholder="Note Description"
                                                    ></textarea>
                                                    <span class="error-text error-text-description"></span>
                                                </div>
                                                <div class="form-group bg-choice-group">
                                                    <div class="input-group">
                                                        <label>${FORM_INPUT_DATA_ADD.NOTE_BACKGROUND.LABEL}</label>
                                                     
                                                    </div>                                      
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-md btn-light text-dark hide-modal" type="button" >${ADD_MODAL_BUTTONS.CANCEL}</button>
                                                <button class="btn btn-md btn-danger text-white submit" id="submit-form" type="button">${ADD_MODAL_BUTTONS.ADD_NOTE}</button>
                                            </div>
                                        </form>
                              </div>`
                           
        // Start of function showColorOptions() //                  
        function showColorOptions(){

            // Create BG_COLORS //
            const BG_COLORS = FORM_INPUT_DATA_ADD.NOTE_BACKGROUND.BG_COLORS;  
           
            // Create BG_OPTIONS //
            const BG_OPTIONS_CONTAINER = document.createElement("div");

            // Add class //  
            BG_OPTIONS_CONTAINER.classList.add("bg-options-container");
             // Append and join to avoid comma from bgOption array //

            // Select inputGroup //
             var inputGroup = document.querySelector('.input-group');
             
             inputGroup.insertAdjacentElement("beforeend" , BG_OPTIONS_CONTAINER)

                // Start of function displayColors() //
                function displayColors() {
                    let bgOption = BG_COLORS.map((color) => {
                        return (                         
                                `<div>
                                    <label key=${color.CODE}>
                                        <input type="radio" name="bg-color" class="choose-color" value="${color.CODE}" style="background-color:${color.CODE}">
                                        <p id="demo"></p>
                                    </label>
                                 </div>`
                                );
                        });
                        // Clear BG_OPTIONS_CONTAINER //
                        BG_OPTIONS_CONTAINER.innerHTML = "";
                         // SET INNER HTML //
                        BG_OPTIONS_CONTAINER.innerHTML = bgOption.join(" ");
                          // SET DEFAULT FOR FIRST COLOR //
                        document.querySelector('input[type="radio"]').setAttribute('checked', 'checked');
                }
                displayColors();
                // End of function displayColors() //
        }
        // Start of function showColorOptions() //

        // Start of function submitForm() //
        function submitForm() {
                // Create noteTitle //
                let noteTitle = document.getElementById("note-title").value.trim();
                  // Create noteDescription //
                let noteDescription = document.getElementById("note-desc").value.trim();  
                
                // Get Todays Date //
                const TODAYS_DATE = new Date();
                // Get date value //
                const DATE_VAL = String(TODAYS_DATE.getDate());
                // Get month value //
                const MONTH_VAL = TODAYS_DATE.toLocaleString('en-us', {
                month: 'short'
                });

                // Start of function BgColor //
                let selectedBgColor;
                (function setBgColor(){
                    let colorOptions = document.getElementsByName('bg-color');                 
                    for(let i = 0; i < colorOptions.length; i++){
                        if(colorOptions[i].checked){
                            selectedBgColor = colorOptions[i].value;
                        }
                    }
                   
                })();
                 // End of function BgColor //

                validateForm(noteTitle,noteDescription);

                 // Start of function validateForm //
                function validateForm(noteTitle , noteDescription) {
            
                    const ERROR_OBJ = APP_CONSTANTS.ERROR_MESSAGES.ADD_NOTE;
                    const ERROR_TEXT_TITLE =  document.querySelector(".error-text-title");
                    const ERROR_TEXT_DESCRIPTION =  document.querySelector(".error-text-description");

                        if(noteTitle === "" & noteDescription === "" ){
                            ERROR_TEXT_TITLE.classList.add("show")
                            ERROR_TEXT_TITLE.textContent = ERROR_OBJ.NOTE_TITLE.TITLE_REQUIRED_ERROR;
                            ERROR_TEXT_DESCRIPTION.classList.add("show")
                            ERROR_TEXT_DESCRIPTION.textContent = ERROR_OBJ.NOTE_DESCRIPTION.DESCRIPTION_REQUIRED_ERROR;
                        }
                        else if(noteTitle === "" && noteDescription){
                            ERROR_TEXT_TITLE.classList.add("show")
                            ERROR_TEXT_TITLE.textContent = ERROR_OBJ.NOTE_TITLE.TITLE_REQUIRED_ERROR;
                            ERROR_TEXT_DESCRIPTION.textContent = "";
                        }
                       else if(noteDescription === "" && noteTitle) {
                            ERROR_TEXT_TITLE.textContent = "";
                            ERROR_TEXT_DESCRIPTION.classList.add("show")
                            ERROR_TEXT_DESCRIPTION.textContent = ERROR_OBJ.NOTE_DESCRIPTION.DESCRIPTION_REQUIRED_ERROR;
                       }
                       else if(noteTitle.length > 60) {
                            ERROR_TEXT_TITLE.classList.add("show");
                            ERROR_TEXT_TITLE.textContent = ERROR_OBJ.NOTE_TITLE.TITLE_MAX_LENGTH_ERROR;
                       }
                       else if(noteDescription.length > 255) {
                            ERROR_TEXT_DESCRIPTION.classList.add("show");
                            ERROR_TEXT_DESCRIPTION.textContent = ERROR_OBJ.NOTE_DESCRIPTION.DESCRIPTION_MAX_LENGTH_ERROR;
                       }
                       else {
                        pushData()
                       }
                      
                  };
                 // End of function validateForm //

                 // Start of function pushData //
                function pushData(){
                    noteObject = {
                        title : noteTitle,
                        description : noteDescription,
                        color : selectedBgColor,
                        date : DATE_VAL + " " +MONTH_VAL,     
                       }
    
                     hideModal();
                    NOTES_ARR.push(noteObject);
                    showNotes(noteObject);
                    // Set local storage for new note //
                    localStorage.setItem("NOTES_ARR", JSON.stringify(NOTES_ARR));
    
                }   
                // End of function pushData //
        }
        // End of function showColorOptions() //

        // Start of function showNotes() //
        function showNotes(){
           
            document.querySelectorAll(".note").forEach(div => div.remove());
            // Loop through each note in notes array //
            NOTES_ARR.forEach((note, id , index) => {
            // Create DEFAULT_BG //
            const DEFAULT_BG = "#b8e986";
            // Check condition based on value from noteObject else set DEFAULT_BG //
            const CHECK_COLOR = note.color ? note.color : DEFAULT_BG;

            // Create note element //
            let noteElement = `
            <div class="note"  style="background-color:${CHECK_COLOR}" id=${id}>
            <div class="note-header darken-background" style="background-color:${CHECK_COLOR}">
                <h2>${note.title}</h2>
            </div>
            <div class="note-body">
                <p>
                    ${note.description}
                </p>
            </div>
            <div class="note-footer">
                <p>${note.date}</p>
                <button class="delete-note-btn" id=${id}  ><i class="fa fa-light fa-trash-can"></i></button>
            </div>
            </div>
            `;
            // Insert before end of note_wrapper_container //
            ADD_NOTE_WRAPPER.insertAdjacentHTML("afterend", noteElement);
           
            });
          // Select all delete-note-btns //
           let buttons =  document.querySelectorAll(".delete-note-btn");
            //Loop through each button //
            buttons.forEach(element => {
                element.addEventListener("click", function(e) {
                    // Create noteID from button's attribute value //
                    let noteId = element.getAttribute("id");
                    //Invoke deleteNote function by passing id //
                    deleteNote(noteId)
                });
            }); 
        }
        // End of function showNotes() //

       
        const DELETE_MODAL_TITLE = MODAL_DATA_DELETE_NOTE.MODAL_TITLE;
        const DELETE_MODAL_TEXT = MODAL_DATA_DELETE_NOTE.MODAL_DESCRIPTION_TEXT;
        const DELETE_MODAL_BUTTONS = MODAL_DATA_DELETE_NOTE.BUTTON_LABELS;

        const DELETE_NOTE_MODAL = `<div class="modal">
                                    <div class="modal-header">
                                        <h4>${DELETE_MODAL_TITLE}</h4>
                                    </div>
                                    <div class="modal-body">
                                    <p class="confirm-desc-text">${DELETE_MODAL_TEXT}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-md btn-light text-dark hide-modal" type="button">${DELETE_MODAL_BUTTONS.NO}</button>
                                        <button class="btn btn-md btn-danger text-white confirm-delete" type="button">${DELETE_MODAL_BUTTONS.YES}</button>
                                    </div>
                                </div>
                      
                                `
        // Start of function deletNote() //             
        function deleteNote(noteId) {
             
                    createModal(DELETE_NOTE_MODAL);
                    showModal();
                    document.querySelector(".confirm-delete").addEventListener("click" , removeNote)
                     // Start of function removeNote()//
                    function removeNote() {
                        hideModal();
                        NOTES_ARR.splice(noteId,  1);
                        showNotes();
                        localStorage.setItem("NOTES_ARR", JSON.stringify(NOTES_ARR));
                         // End of function removeNote()//
                    }
        }           
        // End of function deletNote() //  

         // Start of function showModal() //  
        function showModal(){
         
            MODAL_CONTAINER.classList.add("show");
        }
        // End of function showModal() //  
        
        // Start of function hideModal() //  
        function hideModal() {
            MODAL_CONTAINER.classList.remove("show");
        }
        // Start of function hideModal() //  
        // Start of function createModal() //  
        function createModal(modelName){
            let modalLayout = modelName;
            MODAL_CONTAINER.innerHTML = "";
            MODAL_CONTAINER.insertAdjacentHTML("beforeend" , modalLayout);
            let inputGroup = document.querySelector('.input-group');
            document.querySelector(".hide-modal").addEventListener("click" , hideModal);
        }
        // End of function createModal() //  
       
 

       





       


     





 

























