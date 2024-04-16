module.exports = {
    url: "http://automationpractice.multiformis.com/index.php?controller=contact",
    elements: {
      ContuctUs_Selector:"#contact-link > a",
      File_Upload_Selector:"#fileUpload",
      subjectHeadingDropDownSelector: "#id_contact",
      emailSelector: "#email",
      messageSelector: "#message",
      submitButtonSelector: "#submitMessage",
      successMessageSelector: "p.alert.alert-success",
      invalidEmailAddress:"div.alert.alert-danger",
      invalidsubject:"div.alert.alert-danger",
      invalidmessage:"div.alert.alert-danger",
      OrderReferenceInput:"#id_order",
      CostumerService:"2",
      Webmaster:"3"
    },
    commands: [
      {
        selectFilter(selector, value) {
          const page = this;
          page.click(selector).click(`.form-control option[value="${value}"]`);
  
          return this;
        },
      },
      {Set_Value(selector,value){
        const page = this;
        page.clearValue(selector) // Replace '#myInput' with the selector for your input field
  .setValue(selector, value); // Set the new value for the input field
     return this;
      }
      },
     {
        Submit_File(){
            const page=this;
            page.click('#uniform-fileUpload').setValue("#fileUpload", require('path').resolve(__dirname, "M:\\file.pdf"))
            return this;
        }
     } 
    ],
  };
  