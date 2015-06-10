var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);	// Autoload :quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.get('/quizes?search:texto_a_buscar', quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.post('/quizes/create', quizController.create);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

/* GET /author */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Página de créditos de QUIZ 2015' });
});

module.exports = router;
