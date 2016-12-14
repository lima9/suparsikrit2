var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');
    morgan = require('morgan');

var jwt;
jwt = require('jsonwebtoken');
var config = require('./config/config');

mongoose.Promise = global.Promise;
/**Connection to local MongoDB**/
mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log('Connected to Database');
});
app.set('superSecret', config.secret);

/**Middlewares**/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

/**Morgan to log requests to the console**/
app.use(morgan('dev'));

/** Import Models and controllers**/
var studentMdl = require('./models/studentModel')(app, mongoose);
var subjectMdl = require('./models/subjectModel')(app, mongoose);
var ctrl = require('./controllers/controller.js');

/**Temporally disables (md5?)**/
/*var userMdl    = require('./models/userModel')(app,mongoose);
var usr  = require('./controllers/userController');*/

app.use(express.static(__dirname + '/www'));

/**CORS**/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

/**------------**/
/** API routes **/
/**------------**/
var apiRoutes = express.Router();

/*apiRoutes.route('/auth')
    .post(usr.login);*/

apiRoutes.route('/students')
    .get(ctrl.findAllStudents)
    .post(ctrl.addStudent);

apiRoutes.route('/students/:id')
    .get(ctrl.findStudentById);

apiRoutes.route('/subjects')
    .get(ctrl.findAllSubjects)
    .post(ctrl.addSubject);

/*
apiRoutes.route('/subjects/count/:id')
    .get(ctrl.countStudents);
*/

apiRoutes.route('/subjects/:name')
    .get(ctrl.findAllSubjectsByname);

apiRoutes.route('/subjects/date/:when')
    .get(ctrl.findAllSubjectsBywhen);

apiRoutes.route('/subjects/by/id/:id')
    .get(ctrl.findSubjectById);

apiRoutes.route('/subjects/:id/addstudent')
    .post(ctrl.addStudentToSubject);
/**------------**/
/**------------**/

/**This checks if there is a valid token in use    **/
/**Every route after this needs a valid token      **/
/**Temporally below(disables) to simplify requests **/
/*apiRoutes.use(function (req, res, next) {
    /!**Check for Token**!/
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                /!** If all successful save for other routes**!/
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /!**Error if token not found**!/
        return res.status(201).send({
            success: false,
            message: 'No token provided.'
        });
    }
});*/
/**End Token verification**/

app.use('/api', apiRoutes);

/**Start server**/
app.listen(config.port, function () {
    console.log("Node server running on http://localhost:3000");
});
