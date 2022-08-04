# WIKI (REST API)
A REST API Created to Fetch, Update, Post, Delete the list of posts available.

## ENDPOINTS
```https://<websiteName>.com/articles``` ``` GET```: To retrieve the list of all the articles, available. 

                                                    Returns a JSON objet which contains title and content.

```https://<websiteName>.com/articles ``` ``` POST```: To Add a new post in the Database. 
                                                        
                                                        To send JSON Object which contains title and content.

```https://<websiteName>.com/articles``` ``` DELETE```: To delete all the articles available in the Database. 

                                                        Returns a JSON objet which contains title and content.

```https://<websiteName>.com/articles/<POST NAME>``` ``` GET```: To fetch a specific post in the database.
                                                        
                                                                Returns JSON object with title and content.

```https://<websiteName>.com/articles/<POST NAME>``` ``` PUT```: To update a post completely in the Database. 
                                                        
                                                        To send JSON Object which contains title and content. 

```https://<websiteName>.com/articles/<POST NAME>``` ``` PATCH```: To update a post with certain data in the Database. 
                                                        
                                                        To send string/JSON Object which contains the thing that needs to be updated.

```https://<websiteName>.com/articles/<POST NAME>``` ``` DELETE```: To Delete this specific post from the database. 
                                                        
                                                                    To send post name.


## Title and Content
In order to add anything in the database. You need to send a JSON object which contains title and content.

And while Fetching, The database will return a JSON Object which also contains title and content.

```
const Article = {
    title: "This is Example Title",
    content: "This is example content for explanation of what to do with endpoints and how to use them."
};
```
## Modify to create you own API
This can be modified to create your own Route by tweeking the code little bit.

Make sure to add a ```.env``` file which contains following information

```
PASSWORD=<YOUR DATABSE USER PASSWORD>
ADMIN=mongodb+srv://<YOUR DATABSE USER NAME>:
DB=@<CLUSTER NAME>.etxoobi.mongodb.net/<DATABSE NAME>
```

## SETUP 
Open the Mongoose shell and connect to local Databse.

If you want to check the entries in databse Manually by using CLI, you can do that simply by either opening ```cmd,mongo,terminal```. Moreover, There is another tool to view these things Graphically using MONGO ROBOT 3T. 

Download Mongo Robot 3T, connnect to the local databse. And you will see alist of databases that are created locally.

Choose a Databse create a collection and add/edit/remove the documents.
Below is the screenshot.
![image](https://user-images.githubusercontent.com/72505269/182789211-1e6d4464-c48c-4b13-9460-56894d6bafdb.png)


To Send different requests You can either create multiple forms or you can simply use ```POSTMAN```. A free tool to send different types of requests that are: ```POST, GET, DELETE, PUT, PATCH```. 

Make sure that while you are sending requests, you provide the correct ```endpoint``` and route.

While Using POST route make sure that in Body, ```x-www-form-urlencoded``` is selected and in ```KEY```: You type ```articleTitle``` and ```articleContent```.
![image](https://user-images.githubusercontent.com/72505269/182787696-db9db5da-51c1-4b54-b39f-929bd0df7ae4.png)


And when using ```PATCH ``` Route,  make sure that in Body, ```x-www-form-urlencoded``` is selected and in ```KEY```: You type ```title``` and ```content```.
![image](https://user-images.githubusercontent.com/72505269/182787567-602bc41c-f5b7-4cf5-a20a-971a47fa8f42.png)
