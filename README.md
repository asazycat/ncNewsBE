
use 

type this command 'npm i' to install all dependencies within the folder. 

When you have cloned the repository, you will have to make the environment variables for you to access the databases. 

Please make two files called .env.development and .env.test, 

Hosted Link on Render: https://nc-news-render.onrender.com/api

You can use any of the rest api to 


Summary:

This backend project has several RESTFull endpoints coded with appropriate tests associated witht them. Test-Driven Development was done using Jest and hosting was done with 


Instructions for Setup:

1. Git clone the link into VScode

2. Run "npm i" to install dependencies

3. Create files .env.test and .env.production. put down the key "PGDATABASE" for both, following values names nc_news and nc_news_test respectively for each file. 

4. Run "npm setup-dbs", this will create the databases and tables needed.

5. Run "npm run seed" to populate  local databases with data 

The link here allows api calls to be made. The link show the options available.

To run tests from TTD, run command "npm run test"

Hosted Link on Render: https://nc-news-render.onrender.com/api

Alternativly you can put this on your own database instance and hosting site. Make a .env.production environment file with the value of the connection string of the database instance of your choice. 

run "npn run seed-prod"

For rendering, add the environment variables to the hosting providor with the env.production value and value "production". 
