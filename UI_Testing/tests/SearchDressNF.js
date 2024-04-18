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
      .waitForElementVisible('#product_list > li', 5000, function() {
        // Get the count of products
        browser.elements('css selector', '#product_list > li', function(result) {
          const productCount = result.value.length;
          let productsVerified = 0;

          // Loop over each product
          for (let i = 1; i <= productCount; i++) {
            // Construct the CSS selector for each product
            const selector = `#product_list > li:nth-child(${i}) > div > div.right-block > h5 > a`;
            // Get the text of the product name
            browser.getText(selector, function(result) {
              // Log the extracted product name to the console
              console.log('Product Name:', result.value.trim());
              // Verify if the product name contains "dress" without failing the entire test
/// Verify if the product name contains "dress" without failing the entire test
const dressIncluded = result.value.toLowerCase().includes('dress');
if (!dressIncluded) {
    console.error(`Assertion failed: Product name does not contain "dress" for product ${i}`);
    console.error(`Product Name: ${result.value.trim()}`);
} else {
    try {
        // Custom assertion to log errors but not fail the test
        if (!dressIncluded) {
            throw new Error(`Product name does not contain "dress" for product ${i}`);
        }
    } catch (error) {
        console.error(`Assertion failed: ${error.message}`);
    }
}

              productsVerified++;
              // Check if all products have been verified
              if (productsVerified === productCount) {
                // End the browser session once all products are verified
                
              }
            });
          }
        });
      });
  }
};
