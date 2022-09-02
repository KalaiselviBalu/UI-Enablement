import { APP_CONSTANTS } from "./constants/constants.js";


const wrapper = document.querySelector(".wrapper");
const notes_wrapper = document.querySelector(".notes-wrapper");
const addNoteArea = document.querySelector(".add-note");
var modal_container = document.querySelector(".modal-container");
const modalDataAddNote = APP_CONSTANTS.MODAL_DATA.ADD_NOTE;
const modalDataDeleteNote = APP_CONSTANTS.MODAL_DATA.DELETE_NOTE;
const formInputDataAdd = APP_CONSTANTS.FORM_INPUT_DATA.INPUT_FIELDS.ADD_NOTE;
const form = document.getElementById("add-note-form");
const notesArr = JSON.parse(localStorage.getItem("notesArr") || "[]");

let noteObject ;

  
       //  Start of layout change selection //
        (function () {
             // Invoke createNoteElement() //
            document.querySelector("#add-note-btn").addEventListener("click" , createNoteElement);
            
            // Invoke ShowNotes() //
            showNotes();
           

            // Select view-selection container  //
            var viewSelection = document.querySelector(".header .view-selection");

            // Create DOM Element for select box //
            var selectContainer = document.createElement("select");

            // Set attribute for select box //
            selectContainer.setAttribute("id" , "view-by-selection");

            // Create arr from layout options //
            const optionsArr = APP_CONSTANTS.LAYOUT_OPTIONS;

            // Iterate option values //
            let optionValues = optionsArr.map((option,index) => {
                return `<option key=${option.CLASS_NAME}>${option.LABEL}</option>`;
            });

            // Set innerHTML value for select box//
            selectContainer.innerHTML = optionValues;

            // Insert select box in view selection
            viewSelection.insertAdjacentElement("beforeend" , selectContainer);

            // Add Event listerner on change //
            selectContainer.addEventListener("change" , changeLayout);

            //Function : ChangeLayout //
            function changeLayout(){

                // Target selected value to apply class name //
                var selectedLayoutValue = selectContainer.options[selectContainer.selectedIndex].getAttribute('key');

                // Add class name to change layout //
                notes_wrapper.className = "notes-wrapper container "+selectedLayoutValue;

            }
        })();
            //  End of layout change selection //
           
        // Start of function createNoteElement() //
        function createNoteElement() {
            createModal(addNotemodal); 
            showModal();
            showColorOptions();
            document.querySelector("#submit-form").addEventListener("click" , submitForm);
        }   
        // Start of function createNoteElement() //
 
        const addModalTitle = modalDataAddNote.MODAL_TITLE;
        const addModalButtons = modalDataAddNote.BUTTON_LABELS;
        

        const addNotemodal = `<div class="modal">
                                        <div class="modal-header">
                                            <h4>${addModalTitle}</h4>
                                        </div>
                                        <form action="" id="add-note-form">
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <input
                                                    type="text"
                                                    name="note-title"
                                                    id="note-title"
                                                    placeholder = ${formInputDataAdd.NOTE_TITLE.LABEL}
                                                    class="input-item"
                                                    />
                                                    <span class="error-text"></span>
                                                </div>
                                                <div class="form-group">
                                                    <textarea
                                                        name="note-desc"
                                                        id="note-desc"
                                                        rows="7"
                                                        class="input-item"
                                                        placeholder=${formInputDataAdd.NOTE_DESCRIPTION.LABEL}
                                                    ></textarea>
                                                    <span class="error-text"></span>
                                                </div>
                                                <div class="form-group bg-choice-group">
                                                    <div class="input-group">
                                                        <label>${formInputDataAdd.NOTE_BACKGROUND.LABEL}</label>
                                                     
                                                    </div>                                      
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-md btn-light text-dark hide-modal" type="button" >${addModalButtons.CANCEL}</button>
                                                <button class="btn btn-md btn-danger text-white submit" id="submit-form" type="button">${addModalButtons.ADD_NOTE}</button>
                                            </div>
                                        </form>
                              </div>`
                           
        // Start of function showColorOptions() //                  
        function showColorOptions(){
        
            const bgColors = formInputDataAdd.NOTE_BACKGROUND.BG_COLORS;  
           
            
            const bgOptionsContainer = document.createElement("div");
              
            bgOptionsContainer.classList.add("bg-options-container");
             // Append and join to avoid comma from bgOption array //

             var inputGroup = document.querySelector('.input-group');
             
             inputGroup.insertAdjacentElement("beforeend" , bgOptionsContainer)

            
                function displayColors() {
                    let bgOption = bgColors.map((color) => {
                        return (                         
                                `<div>
                                    <label key=${color.CODE}>
                                        <input type="radio" name="bg-color" class="choose-color" value="${color.CODE}" style="background-color:${color.CODE}">
                                        <p id="demo"></p>
                                    </label>
                                 </div>`
                                );
                        });
                        bgOptionsContainer.innerHTML = "";
                        bgOptionsContainer.innerHTML = bgOption.join(" ");
                        document.querySelector('input[type="radio"]').setAttribute('checked', 'checked');
                }
                displayColors();
        }
        // Start of function showColorOptions() //

        // Start of function submitForm() //
        function submitForm() {
           
             
                let noteTitle = document.getElementById("note-title").value.trim();
                let noteDescription = document.getElementById("note-desc").value.trim();  
                
                // Get Todays Date //
                const todaysDate = new Date();
                // Get date value //

                const dateVal = String(todaysDate.getDate());
                // Get month value //

                const monthVal = todaysDate.toLocaleString('en-us', {
                month: 'short'
                });


                let selectedBgColor;
                (function setBgColor(){
                    let colorOptions = document.getElementsByName('bg-color');                 
                    for(let i = 0; i < colorOptions.length; i++){
                        if(colorOptions[i].checked){
                            selectedBgColor = colorOptions[i].value;
                        }
                    }
                   
                })();

                 noteObject = {
                                    title : noteTitle,
                                    description : noteDescription,
                                    color : selectedBgColor,
                                    date : dateVal + monthVal,
                                   
                                }
                                hideModal();
                                notesArr.push(noteObject);
                                showNotes(noteObject);
                                // Set local storage for new note //
                                localStorage.setItem("notesArr", JSON.stringify(notesArr));
                              
                         
                           
            
        }
        // End of function showColorOptions() //

        // Start of function showNotes() //
        function showNotes(){
           
            document.querySelectorAll(".note").forEach(div => div.remove());
            // Loop through each note in notes array //
            notesArr.forEach((note, id , index) => {
                const defaultBg = "#b8e986";
                const checkColor = note.color ? note.color : defaultBg;
            // Create note element //
          
            let noteElement = `
            <div class="note"  style="background-color:${checkColor}" id=${id}>
            <div class="note-header darken-background" style="background-color:${checkColor}">
                <h2>${note.title}</h2>
            </div>
            <div class="note-body">
                <p>
                    ${note.description}
                </p>
            </div>
            <div class="note-footer">
                <p>${note.date}</p>
                <button class="delete-note-btn" id = ${id}  ><i class="fa fa-solid fa-trash-can"></i></button>
            </div>
            </div>
            `;
            // Insert before end of note_wrapper_container //
            addNoteArea.insertAdjacentHTML("afterend", noteElement);
           
            });
          
           var buttons =  document.querySelectorAll(".delete-note-btn");
         
            buttons.forEach(element => {
                element.addEventListener("click", function(e) {
                    let noteId = element.getAttribute("id");
                    deleteNote(noteId)
                });
            }); 
        }
        // End of function showNotes() //

       
        const deleteModalTitle = modalDataDeleteNote.MODAL_TITLE;
        const deleteModalText = modalDataDeleteNote.MODAL_DESCRIPTION_TEXT;
        const deleteModalButtons = modalDataDeleteNote.BUTTON_LABELS;

        const deleteNoteModal = `<div class="modal">
                                    <div class="modal-header">
                                        <h4>${deleteModalTitle}</h4>
                                    </div>
                                    <div class="modal-body">
                                    <p class="confirm-desc-text">${deleteModalText}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-md btn-light text-dark hide-modal" type="button">${deleteModalButtons.NO}</button>
                                        <button class="btn btn-md btn-danger text-white confirm-delete" type="button">${deleteModalButtons.YES}</button>
                                    </div>
                                </div>
                      
                                `
        // Start of function deletNote() //             
        function deleteNote(noteId) {
                   console.log("i recived" , noteId)
                    createModal(deleteNoteModal);
                    showModal();
                    document.querySelector(".confirm-delete").addEventListener("click" , removeNote)
                     
                    function removeNote() {
                        hideModal();
                            notesArr.splice(noteId,  1);
                  
                    showNotes();
                    localStorage.setItem("notesArr", JSON.stringify(notesArr));
                    }
        }           
        // End of function deletNote() //  

         // Start of function showModal() //  
        function showModal(){
         
            modal_container.classList.add("show");
        }
        // End of function showModal() //  
        
        // Start of function hideModal() //  
        function hideModal() {
            modal_container.classList.remove("show");
        }
        // Start of function hideModal() //  
        // Start of function createModal() //  
        function createModal(modelName){
          
            let modalLayout = modelName;
            modal_container.innerHTML = "";
            modal_container.insertAdjacentHTML("beforeend" , modalLayout);
            var inputGroup = document.querySelector('.input-group');
         
            document.querySelector(".hide-modal").addEventListener("click" , hideModal);
        }
        // End of function createModal() //  
       
      

       





       


     





 

























