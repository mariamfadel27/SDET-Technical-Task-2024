// homepage.js
  
  const homepageCommands = {
    searchForDress: function(query) {
      return this.setValue('@searchInput', query)
                 .click('@searchButton');
    },
  
    verifySearchResultsContainDress: function() {
      return this.waitForElementVisible('@searchResult', 5000)
                 .assert.containsText('@searchResult', 'dress');
    }
  };
  
  module.exports = {
    url: 'http://automationpractice.multiformis.com/',
    commands: [homepageCommands],
    elements: {
      searchInput: '#search_query_top',
      searchButton: '#searchbox > button',
     
    }
  };