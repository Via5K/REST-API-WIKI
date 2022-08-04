const express = require("express");
const parser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const dotEnv = require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(parser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
// const url = process.env.ADMIN + process.env.PASSWORD + process.env.DB;
const url = "mongodb://localhost:27017/WikiDB";
//connect to mongoose
mongoose.connect(url, {
    useNewUrlParser: true
});
//articleSchema for WIKI DB

const articleSchema = {
    title: String,
    content: String
};
//model
const Article = mongoose.model("Article", articleSchema);

//SETTING UP ROUTES I.E GET/POST/DELETE..... AT /articles

app.route("/articles")
    .get(function(req, res) {
        Article.find({}, function(err, allArticles) {
            if (!err) {
                res.send(allArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post(function(req, res) {
        console.log(req.body.articleTitle);
        console.log(req.body.articleContent);
        const newArticle = new Article({
            title: req.body.articleTitle,
            content: req.body.articleContent
        });
        newArticle.save(newArticle, function(err, result) {
            if (!err) {
                console.log("Successfully Added!!");
                res.send("Successfully Added!!");
            } else {
                console.log("Error Adding to Database");
                res.send("Error Adding to Database");
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err, result) {
            if (!err) {
                // console.log("Successfully Deleted");
                res.send("Successfully Deleted");
            } else {
                // console.log("Unable To Delete");
                res.send(err);
            }
        });
    });
//route for /articles ended here....

//request that target particular target...
app.route("/articles/:articleName")
    .get(function(req, res) {
        const articleName = req.params.articleName;
        Article.findOne({
            title: articleName
        }, function(err, foundArticle) {
            if (!err) {
                if (foundArticle) {
                    console.log("Found The Article");
                    res.send(foundArticle);
                } else {
                    console.log("No DATA ABOUT THE ARTICLE IS FOUND");
                    res.send("No DATA ABOUT THE ARTICLE IS FOUND");
                }
            } else {
                console.log(err);
                res.send(err);
            }
        });
        // console.log(articleName);
    })
    //put is used to update the whole article....
    .put(function(req, res) {
        Article.replaceOne({
            title: req.params.articleName
        }, {
            title: req.body.articleTitle,
            content: req.body.articleContent
        }, {
            overwrite: true
        }, function(err) {

            if (!err) {
                console.log("Successfully Updated the article");
                res.send("Successfully Updated the article");
            } else {
                console.log("Something Went Wrong! Wasn't able to Update the Article");
                console.log(err);
                res.send("Something Went Wrong! Wasn't able to Update the Article" + err);
                // res.send(err);
            }
        });
    })
    //patch is used for Updating a particular thing.
    .patch(function(req, res) {
        // for this patch as we are updating the content and the name of the form should be title, content and not articleTitle, articleContent
        // console.log(req.body);
        Article.updateOne({
                title: req.params.articleName
            }, {
                $set: req.body
            },
            function(err, result) {
                if (!err) {
                    console.log("Successfully Updated the article with the given field");
                    res.send("Successfully Updated the article with the given field");
                } else {
                    console.log("Unable to Update the article");
                    res.send(err);
                }
            });
    })
    .delete(function(req, res) {
        const toDelete = req.params.articleName;
        Article.deleteOne({
            title: toDelete
        }, function(err, result) {
            if (!err) {
                console.log("Successfully Deleted the article with the given name");
                res.send("Successfully Updated the article with the given name");
            } else {
                console.log("Unable to delete the article");
                res.send(err);
            }
        });
    });
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started...");
});