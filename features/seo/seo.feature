Feature: Search Engine Optimization

   Enable github.com to be found on the interwebs

   Scenario: User finds GitHub by googling "github" 

      Given the user navigates to Google
      When the user types "github" into the search bar
      And the user clicks "search"
      And the user clicks the first result
      Then the user should be on the GitHub website
      And the page should match the current snapshot for "github-homepage"
