
var contact_container = document.getElementById("contactContainer");

(function () {
   for(let i = 0 ;i < data.length; i++){
      // Start of item // 
      var item = document.createElement("div");
      item.classList.add("item");
      // End of item // 
      
      // Start of image //
      var image = document.createElement("img");
      image.src = data[i].img;
      item.appendChild(image);
      // End of image //

      // Start of content //
      var content = document.createElement("div");
      item.appendChild(content);
      // End of content //

      // Start of name //
      var name = document.createElement("h3");
      content.appendChild(name);
      name.textContent = data[i].first_name + " " +data[i].last_name;
      // End of name //
      
      // Start of email //
      var email = document.createElement("p");
      email.textContent = data[i].email;
      content.appendChild(email);
      // End of email //
      
      contact_container.appendChild(item);
  }
 })();

