module.exports = {
    url: "http://automationpractice.multiformis.com/index.php?controller=contact",
    elements: {
      ContuctUs_Selector:"#contact-link > a",
      File_Upload_Selector:"#fileUpload",
      subjectHeadingDropDownSelector: "#id_contact",
      emailSelector: "#email",
      messageSelector: "#message",
      submitButtonSelector: "#submitMessage",

      Success_message: "p.alert.alert-success",
      Error_message:"div.alert.alert-danger",
      
      POP_UP_MSG:"#center_column > div > ol > li",
      
      OrderReferenceInput:"#id_order",
      CostumerService:"2",
      Webmaster:"3",
      default:"0"
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
            page.click('#uniform-fileUpload').setValue("#fileUpload", require('path').resolve(__dirname, '../submit_file/MariamWaleed_computer_engineer.pdf'))
            return this;
        }
     } 
    ],
  };
  