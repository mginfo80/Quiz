//var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(reg, res){
	//se obtiene la pregunta
	//models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {pregunta: 'Capital de Italia'})
	//});
};

//GET /quizes/answer
exports.answer = function(req, res){
	//models.Quiz.findAll().success(function(quiz) {
		if (req.query.respuesta === 'Roma')
		res.render('quizes/answer', {respuesta: 'Correcto'});
	else
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	//})
};
/*
//GET /quizes/author
exports.author = function(reg, res){
	res.render('quizes/author');
};
*/