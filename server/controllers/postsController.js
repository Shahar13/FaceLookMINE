const db = require("../repository/dbmaneger");

async function addPost(req, res) {
  req.body.user = req.user;
  req.body.img = req.image;

  try {
    await db.addPost(req.body, postResult => {
      db.addTag(postResult, tagResult => {
        db.addPost_Tag(tagResult, result => {
          res.status(201).json({
            message: "post Created Successfully"
          });
        });
      });
    });
  } catch (error) {
    res.status(401).json({
      message: "Failure to create post"
    });
  }
}

function getAllPosts(req, res) {
  try {
    db.getAllPosts(posts => {
      res.status(201).json(posts? posts : []);
    });
  } catch (error) {
    console.log("getAllPosts ==> " + error);
    res.status(401).json({
      message: "Failure, try again"
    });
  }
}

function getFilterPosts(req, res) {
  try {
    const filters = JSON.parse(req.params.filters);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA FILTERS ==>");
    console.log(filters);
    
    db.getFilterPosts(filters, posts => {
      res.status(201).json(posts);
    });
  } catch (error) {
    console.log("getFilterPosts ==>" + error);
    return res.status(401).json({
      message: "Failure, try again"
    });
  }
}

async function updateLikes(req, res) {
  try {
    await db.updateLikes(req.body.post, (data) => {
      res.status(201).json({
        message: "Post Like updated successfuly"
      })
    })
  } catch (error) {
    console.log("postController: updateLikes ==> " + error);
    return res.status(401).json({
      message: "Fail updating likes postController: updateLikes"
    })
  }
}


module.exports = {
  addPost,
  getAllPosts,
  updateLikes,
  getFilterPosts
};
