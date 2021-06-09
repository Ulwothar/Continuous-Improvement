# Continuous-Improvement
This web application is a continuous improvement solution for a company of medium to large size. It was build to provide employees with proper tools to send suggestions of improvement of different aspects of company environment. There also is a logging in option, designed for management staff to review and process all suggestions, write comments, move them to different stages and plan tasks to be completed for each suggestion.

# Requirements
To install the app on your sever, you wil require to install the following packages first:
-npm
-yarn
-React
-node (this one will be installed by default with npm package).

Run the 'npm install' command for both back-end and front-end. This will create all neccesary files and install all depencies required in this project.

For the front-end part you can either use the 'npm run build' comand to create the production build, or you can use 'yarn run build' instead (preffered method). This will create a new 'build' folder, which will contain the actual working part, which you will use to run your app in production.

Remember to navigate to a proper directory before running theese commands.

# DOTENV
There are DOTENV files in both front and back end. Please paste the proper addresses of your database, API endpoints and secret keys in those files. 

For the front-end env variables, most of the address is already there, just change the '...' parts in each address to your actual domain name where you store your back-end.

# Back-end
Back end part of this app works on port 5000. It is created with node.js and requires a proper server set up.

All cookies have a 'domain' property set to '.yourdomain'. Please change all those fields to your actual domain address.

The back end is set to work on ssl encrypted server, so all cookies and API endpoints in front-end part are set to start with 'https://...'. If you don't plan on using ssl encryption, please change those addresses to 'http://...'.

The app requires MongoDB database. You can set it up on: https://www.mongodb.com/
It can be used either locally or as a cloud service.

# Front-end
Front-end was created using React library. 

Any unauthorised user will only be able to see the suggestion form and authenticate page (if they know the addrress to auth page). Trying to access any other route will end up redirecting to the suggestion form page.
After logging in, user will get access to the full view of the app with all it's features.
