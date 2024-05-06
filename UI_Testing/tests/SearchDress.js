const homepage = require('../page-objects/homepage');

module.exports = {
  '@tags': ['homepage'],

  before: function(browser) {
    browser.url(homepage.url);
  },
  'Verify product names contain "dress"': function(browser) {
    // Search for "dress"
    browser.page.homepage()
      .searchForDress('dress')
      .pause(500)
      .assert.urlContains('search_query=' + 'dress')

      .waitForElementVisible('#product_list > li', 5000, function() {
        // Get the count of products
        browser.elements('css selector', '#product_list > li', function(result) {
          const productCount = result.value.length;
          console.log('Product counts:',productCount);
          // Loop over each product
          for (let i = 1; i <= productCount; i++) {
            // Construct the CSS selector for each product
            const selector = `#product_list > li:nth-child(${i}) > div > div.right-block > h5 > a`; /*here the tracing to reach the product name in h5>a each product has a class named li*/
            // Get the text of the product name
            browser.getText(selector, function(result) {
              // Log the extracted product name to the console
              console.log('Product Name:', result.value.trim());
              
              //if the product isn't a dress print a message
              if (!result.value.toLowerCase().includes('dress')) {
                console.error(`Error: Product name does not contain "dress" for product ${i}. Product Name: ${result.value.trim()}`);
              }
              // Verify if the product name contains "dress"
              browser.verify.ok(result.value.toLowerCase().includes('dress'), `Product name contains "dress" for product ${i}`);
              if (i === productCount) {
                browser.end();
              }
            });
            
          }
        });
      })
      // End the browser session
      .end();
  }
};
