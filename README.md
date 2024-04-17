SDET 2024 - Technical Task


#Description:
This project consists of automated tests for two parts:

Testing the My Store website using NightwatchJS.
Testing the API routes provided by the mock-user-auth module using Supertest and mocha.
Features
Automated testing of the My Store website contact us page, including:
Testing optional and required fields for form submission.
Validating various combinations of form submissions.
Testing file upload functionality.
Automated testing of the My Store website homepage search functionality.
Automated testing of the mock-user-auth API routes with various scenarios:
Valid and invalid request bodies.
Valid and invalid authorization.
Reports
You can find the report for My store testing in folder reports -You can find the report for API testing in mochaawesome-report folder
Installation
Clone the repository: git clone <repository_url>

Install dependencies: npm install

Usage
Running NightwatchJS Tests
Navigate to the NightwatchJS test directory: cd nightwatch-tests
Run the tests: npx nightwatch
Running Supertest Tests
Navigate to the Supertest test directory:
Run the tests: npm test
CI/CD Integration
This project is integrated with CircleCI for Continuous Integration and Continuous Deployment (CI/CD).

Dependencies
NightwatchJS
Supertest
Mock-user-auth
Mocha
