const db = require("../repository/dbmaneger");

async function addComment(req, res) {
    console.log("commentController addComment ==> ");
    console.log(req.body);

    try {
        await db.addComment(req.body, commentResult => {
            console.log("commentResult");
            console.log(commentResult);

            db.addComment_Post(commentResult, cb => {
                res.status(201).json({
                    message: "Comment Created Successfully"
                });
            });
        });
    } catch (error) {
        res.status(401).json({
            message: "Failure to add comment"
        });
    }
}

function getComments(req, res) {
    console.log("commentsController getComments, req.body ==>");
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(req.params);
    
    try {
        db.getComments(comments => {
            res.status(201).json(comments ? comments : []);
        });
    } catch (error) {
        console.log("getComments ==> " + error);
        res.status(401).json({
            message: "Failure, try again"
        });
    }
}

// function getFilterPosts(req, res) {
//   try {
//     const filters = JSON.parse(req.params.filters);
//     db.getFilterPosts(filters,posts => {
//       res.status(201).json(posts);
//     });
//   } catch (error) {
//     console.log("getFilterPosts ==>" + error);
//     return res.status(401).json({
//       message: "Failure, try again"
//     });
//   }
// }

// async function updateLikes(req, res) {
//   try {
//     await db.updateLikes(req.body.post, (data) => {
//       res.status(201).json({
//         message: "Post Like updated successfuly"
//       })
//     })
//   } catch (error) {
//     console.log("postController: updateLikes ==> " + error);
//     return res.status(401).json({
//       message: "Fail updating likes postController: updateLikes"
//     })
//   }
// }


module.exports = {
    addComment,
    getComments,
    //   updateLikes,
    //   getFilterPosts
};
