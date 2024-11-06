let express = require('express');
let router = express.Router();
const verify = require('../core/verifyToken');

// let data = require('./controller/model.ctrl');


// Controllers 
let user = require('./controller/user.ctrl.js');
let blog = require('./controller/blog.ctrl.js');
let contact = require('./controller/contact.ctrl.js');
let feedback = require('./controller/feedback.ctrl.js');



// Users
router.post('/login', user.login);
router.post('/register', user.registration);
router.post('/getListUser', verify, user.getListUsers);



//Blogs

router.post('/saveBlog', verify, blog.save);
router.post('/deleteBlog', verify, blog.delete);
router.post('/getListBlogs', blog.getListBlogs);



//

router.post('/saveContact', contact.save);
router.post('/deleteContact', verify, contact.delete);
router.post('/getListContacts', verify, contact.getListContacts);


//

router.post('/saveFeedback', verify, feedback.save)
router.post('/deleteFeedback', verify, feedback.delete)
router.post('/getListFeedback', verify, feedback.getListFeedbacks)



//demo

// router.post('/get', model.get);

























module.exports = router;




