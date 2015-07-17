var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
			req.quiz = quiz;
			next();
		}
		else
			next(new Error('No existe quizId=' + quizId));
	}).catch(function(error){
		next(error);
	});
};

exports.index = function(req, res) {
	
	if (req.query.search) {
		var buscar = ('%' + req.query.search + '%').replace(/ /g, '%');
		models.Quiz.findAll({ 
			where: ["pregunta like ?", buscar], order: 'pregunta ASC'
		}).then(function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) { next(error);})
	}
	
	else {
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes: quizes, errors: [] });
		}).catch(function(error){
			next(error);
		})
	}
};

exports.show = function(req, res){
	//se obtiene la pregunta
		res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

//GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta)
		resultado = 'Correcto';
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};

exports.new = function(req, res){
	var quiz = models.Quiz.build({ tema: "Género", pregunta: "Pregunta", respuesta: "Respuesta"} );
	res.render('quizes/new', {quiz:  quiz, errors: []});
};

exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );
	var errors = quiz.validate();
	
	if (errors) {
		var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
		for (var prop in errors) 
			errores[i++]={message: errors[prop]};	
		res.render('quizes/new', {quiz: quiz, errors: errores});
	} else {
		quiz // save: guarda en DB campos pregunta y respuesta de quiz
	.save({fields: ["tema", "pregunta", "respuesta"]})
	.then( function(){ res.redirect('/quizes')}) ;
	}
};

exports.edit = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res){
	req.quiz.tema 		= req.body.quiz.tema;
	req.quiz.pregunta 	= req.body.quiz.pregunta;
	req.quiz.respuesta 	= req.body.quiz.respuesta;
	var errors = req.quiz.validate();
	
	if (errors) {
		var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
		for (var prop in errors) 
			errores[i++]={message: errors[prop]};	
		res.render('quizes/edit', {quiz: req.quiz, errors: errores});
	} else {
		req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
	.save({fields: ["tema", "pregunta", "respuesta"]})
	.then( function(){ res.redirect('/quizes')}) ;
	}
};

exports.destroy = function(req, res) {
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

//GET /quizes/author
exports.author = function(reg, res){
	res.render('quizes/author', {  errors: [] } );
};
