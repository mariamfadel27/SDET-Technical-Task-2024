/*importing the page objects*/ 
const page = browser.page.Submit_Form();
const Order_num="12345678";
const CustomerService="2";
const WebMaster="1";
const Default= "0";
const path = require('path');

// Example file name

module.exports = {

  "My first test case all enteries are given happy scenario "(browser) {
    
    page.click("@ContuctUs_Selector")
      .waitForElementVisible("body")
      .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
      .pause(500)
      .Set_Value("@emailSelector", "test@gmail.com")
      .pause(500)
      .Set_Value("@messageSelector", "Test Case_1")
      .pause(500)
      .Set_Value("@OrderReferenceInput",Order_num)
      .pause(500)
      .click("@submitButtonSelector")
      .pause(500)
      .assert.visible("@successMessageSelector");
  },
/** 
 * my second test case:submit file
*/
  "My second test case-submit file"(browser) {

    page.click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .waitForElementVisible("body")
      .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
      .pause(500)
      .Set_Value("@emailSelector", "test@gmail.com")
      .pause(500)
      //.Submit_File() /*submit file*/ 
      // Wait for the filename to be visible in the specified element
      .Set_Value("@messageSelector", "Test Case_2: file submitted successfully")
      .pause(500)
      .Set_Value("@OrderReferenceInput",Order_num)
      .pause(500)
      .click("@submitButtonSelector")
      .pause(500)
      .assert.visible("@successMessageSelector");
    
  },
  /** 
 * my third test case: email is missing expected to message won't send
*/
  "My third test case-No email"(browser) {

      page.click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
        .waitForElementVisible("body")
        .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
        .pause(500)
        .Set_Value("@messageSelector", "Test Case_3: failed to send this message,email is missed")
        .pause(500)
        .click("@submitButtonSelector")
        .pause(500)
        .assert.visible("@invalidEmailAddress");
    },

    /** 
 * my fourth test case: subject is missing expected to message won't send
*/
"My fourth test case-No subject header is selected "(browser) {
    
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      .pause(500)
      .Set_Value("@messageSelector", "Test Case_4: failed to send this message,please select subject")
      .pause(500)
      .click("@submitButtonSelector")
      .pause(500)
      .assert.visible("@invalidsubject");
  },

  /*
  my fifth test case: message is missing(it's required field should be provided)
  */ 
  "fifth test case: message is missing(it's required field should be provided)"(browser) {
    
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
      .pause(500)
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      .pause(500)
      .click("@submitButtonSelector")
      .pause(500)
      .assert.visible("@invalidmessage");
  },

  /*
  my sixth test case to prove that: only(message,subject header,email) are required fields,
  while(reference order ,file attachement not required)->without them form will be submitted
  */ 
  "sixth test case:(reference order ,file attachement not required)->form will be submitted regarding their non-existance"(browser) {
    
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
      .pause(500)
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      .pause(500)
      .Set_Value("@messageSelector", "Test Case_6:(reference order ,file attachement not required fields")
      .pause(500)
      .click("@submitButtonSelector")
      .pause(500)
      .assert.visible("@successMessageSelector");
  },
      "My seventh test case to check wether there's format checking on email address entry,it should fail & messag: invalid email entry "(browser) {
    
        page
          .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
          .waitForElementVisible("body")
          .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
          .pause(500)
          .Set_Value("@emailSelector", "test")//wrong email format
          .pause(500)
          .Set_Value("@messageSelector", "Test Case_7: wrong email format")
          .pause(500)
          .Set_Value("@OrderReferenceInput",Order_num)
          .pause(500)
          .click("@submitButtonSelector")
          .pause(500)
          .assert.visible("@invalidEmailAddress")
          .end();
      }

  };
  
