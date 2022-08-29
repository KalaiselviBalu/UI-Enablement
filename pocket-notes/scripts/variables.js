

// start of modal object //
var modal = {
  // Add note object //
  addNote : {
    addNoteHeadingText : "New Note",
    addNoteBody : `
    <div class="form-group">
      <input
        type="text"
        name="note_title"
        id="note_title"
        placeholder="Note Title"
        class="input-item"
       
      />
      <span class="error-text"></span>
    </div>
    <div class="form-group">
      <textarea
        name="note_desc"
        id="note_desc"
        rows="7"
        class="input-item"
        placeholder="Say Something"
       
      ></textarea>
      <span class="error-text"></span>
    </div>
    <div class="input-group">
      <label for="">Notes Background</label>
      <label class="checkbox_container">
        <input
          type="checkbox"
          class="checkbox chooseBgColor"
          name="bgChoice"
          id="bgChoiceGreen"
          value="green"
          checked
        />
        <span class="checkmark green"></span>
      </label>

      <label class="checkbox_container">
        <input
          type="checkbox"
          class="checkbox chooseBgColor"
          name="bgChoice"
          id="blue"
          value="blue"
        />
        <span class="checkmark blue"></span>
      </label>

      <label class="checkbox_container">
        <input
          type="checkbox"
          class="checkbox chooseBgColor"
          name="bgChoice"
          id="grey"
          value="grey"
        />
        <span class="checkmark grey"></span>
      </label>

      <label class="checkbox_container">
        <input
          type="checkbox"
          class="checkbox chooseBgColor"
          name="bgChoice"
          id="brown"
          value="brown"
        />
        <span class="checkmark brown"></span>
      </label>
    </div>
 
    `,
    addNoteButtons:{
        cancelBtn : `<button class="btn btn-md btn-light text-dark" type="button" onclick="closeModal(event)">CANCEL</button>`,
        confirmBtn:`<button class="btn btn-md btn-danger text-white" id="submitForm" type = "submit">ADD</button>`
    }
  },
    // Delete note object //
  deleteNote : {
    deleteNoteHeadingText : "Confirm Delete",
    deleteNoteBody : `<p class="confirm-desc-text">Deleting this note will remove all its traces from the system and cannot be rolled back. Do you really wish to delete this note?</p>`,
    deleteNoteButtons:{
        cancelBtn : `<button class="btn btn-md btn-light text-dark" type="button" onclick="closeModal(event)">NO</button>`,
        confirmBtn:`<button class="btn btn-md btn-danger confirmBtn text-white">YES</button>`
    }
  } 
}
// End of modal object //

// Start of error object //
var error = {
  maxLengthTitle : 60,
  maxLengthDescription : 255,
  requiredTitle : "Please Enter Note Title",
  requiredDescription : "Please Enter Note Description",
  maxLengthTitleError : "Note Title must be less than 60 characters",
  maxLengthDescriptionError : "Note desscription must be less than 255 characters"
}
// End of error object//

