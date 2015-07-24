#To Market#
by Zoe Foss

To Market is a web application that helps users find a farmer’s market near them (or near a place they will be visiting), and visualize where those markets are on a map. Users search by zip code to find any market in the United States that is registered with the USDA. 

On Heroku:  http://farmers-market-finder.herokuapp.com/

###Technologies Used:###
-	Node and Express
-	Mongo and Mongoose
-	jQuery
-	AJAX
-	USDA National Farmers Market Directory API (http://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html) 
-	Mapbox API
-	Google Fonts API

###Steps to Run Locally:### 
1.	Make sure you have Node installed on your computer 
2.	Clone github repo
3.	In your command-line (using a program like Terminal), navigate to the folder where you saved the cloned repo
4.	 Type “npm install” to download all required node modules 
5.	Register an account with Mapbox API to get your own access key. Use in the document where it lists mapbox.AccessToken
6.	Start nodemon server and open http://localhost:3000 in browser
