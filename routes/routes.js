let express = require('express');
let router = express.Router();
const verify = require('../core/verifyToken');


// let data = require('./controller/model.ctrl');



// Controllers 
let course = require('./controller/course.ctrl');
let subject = require('./controller/subject.ctrl');
let auth_staff = require('./controller/auth_staff.ctrl')
let auth_student = require('./controller/auth_student.ctrl')


let model = require('./controller/model.ctrl')
// router.post('/login', data.insert);





// COURSES 
router.post('/saveCourse', verify, course.save)
router.post('/deleteCourse', verify, course.delete)
router.post('/getCourse', verify, course.get)

// SUBJECT
router.post('/saveSubject', verify, subject.save)
router.post('/deleteSubject', verify, subject.delete)
router.post('/getSubject', verify, subject.get)


// STAFF

router.post('/staffRegistration', auth_staff.registration)
router.post('/staffLogin', auth_staff.login)



// STUDENT

router.post('/studentLogin', auth_student.login)
router.post('/studentRegistration', auth_student.registration)



//demo

router.post('/get', model.get);

























module.exports = router;




