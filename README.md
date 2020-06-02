# LoginAndSignUp
A Signup and login page authenticated using Nodejs and mongoDB

The website is built using HTML,CSS,Javascript,Nodejs,Express.
It uses the Mongodb for storing the user details provided. Mongoose is an Object Data Modleing library for MongoDB and Nodejs. It manages relationship between data and provides schema validation.
Here, users can signup/login manually and will be directed to home page.
There user details are authenticated and password encryption is done using hashing.

# # Deployment:

* First install MongoDB from its official website.
	       https://www.mongodb.com/download-center/community, also install mongodb from the same website.
* After installing, go to the directory where mongodb is installed. Add path to the environment variables. 
* After that open command prompt/terminal and type 'mongod' to start the database.
* Later open a new terminal/command prompt and locate the project folder.
* Install mongoose by typing 'npm i mongoose' in the command prompt.
* Type 'npm init' in order to initialise a new package or existing npm package.
* Install all the dependencies by typing 'npm install' in cmd.  
* Run the website by using the cmd 'nodemon app.js'. 
* Type 'localhost:3000' on the browser to view the website
