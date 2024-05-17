/*importing the page objects*/ 
const page = browser.page.Submit_Form();
const Order_num="12345678";
const CustomerService="2";/* drop down index*/
const WebMaster="1";
const Default= "0";
const path = require('path');

// Example file name

module.exports = {

  "My first test case all enteries are given happy scenario "(browser) {
    page
      .navigate()
      .waitForElementVisible("body")
      .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
      
      .Set_Value("@emailSelector", "test@gmail.com")
      
      .Submit_File() /*submit file*/ 
      .Set_Value("@messageSelector", "Test Case_1:happy case all elements are given")
      
      .Set_Value("@OrderReferenceInput",Order_num)
      
      .click("@submitButtonSelector")
      
      .assert.visible("@Success_message").assert.containsText("@Success_message","Your message has been successfully sent to our team.")
      .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase1.png'));
  },
/** 
 * my second test case:submit file is missing
*/
  "My second test case-submit file is missing"(browser) {

    page.click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .waitForElementVisible("body")
      .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
      
      .Set_Value("@emailSelector", "test@gmail.com")
      
      // Wait for the filename to be visible in the specified element
      .Set_Value("@messageSelector", "Test Case_2: attach file is missing(not a required field),message sent any way")
      
      .Set_Value("@OrderReferenceInput",Order_num)
      
      .click("@submitButtonSelector")
      
      .assert.visible("@Success_message").assert.containsText("@Success_message","Your message has been successfully sent to our team.")
      .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase2.png'));
  },
  /** 
 * my third test case: email is missing expected to message won't send
*/
  "My third test case-No email"(browser) {

      page.click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
        .waitForElementVisible("body")
        .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
        
        .Set_Value("@messageSelector", "Test Case_3: failed to send this message,email is missed")
        .click("@submitButtonSelector")
        
        .assert.visible("@Error_message")
        .assert.containsText('@POP_UP_MSG', 'Invalid email address.')
        .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase3.png'));
    },

    /** 
 * my fourth test case: subject is missing expected to message won't send
*/
"My fourth test case-No subject header is selected "(browser) {
    
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      
      .Set_Value("@messageSelector", "Test Case_4: failed to send this message,please select subject")
      
      .click("@submitButtonSelector")
      
      .assert.visible("@Error_message")
      .assert.containsText('@POP_UP_MSG', 'Please select a subject from the list provided.')
      .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase4.png'));
  },

  /*
  my fifth test case: message is missing(it's required field should be provided)
  */ 
  "fifth test case: message is missing(it's required field should be provided)"(browser) {
    
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .selectFilter("@subjectHeadingDropDownSelector", WebMaster)
      
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      
      .click("@submitButtonSelector")
      
      .assert.visible("@Error_message")
      .assert.containsText('@POP_UP_MSG', 'The message cannot be blank.')
      .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase5.png'));
  },

  /*
  my sixth test case to prove that: only(message,subject header,email) are required fields,
  while(reference order ,file attachement not required)->without them form will be submitted
  */ 
  "sixth test case:(reference order ,file attachement not required)->form will be submitted regarding their non-existance"(browser) {
    page
      .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
      .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
      
      .waitForElementVisible("body")
      .Set_Value("@emailSelector", "test@gmail.com")
      
      
      .Set_Value("@messageSelector", "Test Case_6:(reference order ,file attachement not required fields")
      
      .click("@submitButtonSelector")
      
      .assert.visible("@Success_message").assert.containsText("@Success_message","Your message has been successfully sent to our team.")
      .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase6.png'));
  },

      "My seventh test case to check wether there's format checking on email address entry,it should fail & messag: invalid email entry "(browser) {
        page
          .click("@ContuctUs_Selector")//again t o submit another form,only first one doesn't need this
          .waitForElementVisible("body")
          .selectFilter("@subjectHeadingDropDownSelector", CustomerService)
          
          .Set_Value("@emailSelector", "test")//wrong email format
          
          .Set_Value("@messageSelector", "Test Case_7: wrong email format")
          
          .Set_Value("@OrderReferenceInput",Order_num)
          
          .click("@submitButtonSelector")
          
          .assert.visible("@Error_message")
          .assert.containsText('@POP_UP_MSG', 'Invalid email address.')
          .saveScreenshot(path.resolve('screenshots', 'screenshot', 'testcase7.png'));
      },
      // Close the browser session
  after: function(browser) {
    browser.end();
  }
    
  };
  
