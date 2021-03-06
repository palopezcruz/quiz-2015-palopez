var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite	DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user	 	= (url[2]||null);
var pwd		 	= (url[3]||null);
var protocol 	= (url[1]||null);
var dialect 	= (url[1]||null);
var port	 	= (url[5]||null);
var host	 	= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

// Cargamos modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD Sqlite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect:	protocol,
		protocol:	protocol,
		port:		port,
		host:		host,
		storage:	storage,
		omitNull:	true
	}	
);

// Usamos el gestor de BBDD SQLlite
//var sequelize = new Sequelize(null, null, null,
//					{dialect: "sqlite", storage: "quiz.sqlite"}
//				);

// Importamos la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importamos la definición de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //Exportamos la definición de la tabla Quiz
exports.Comment = Comment; //Exportamos la definición de la tabla Comment
exports.sequelize = sequelize; // Exportamos la base de datos para generar las estadisticas

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
		// then(..) ejecuta el manejador una vez creada la tabla
		Quiz.count().then(function(count) {
		if (count === 0) { // la tabla se inicializa sólo si está vacía
			Quiz.create({ pregunta: 'Capital de Italia', 
						  respuesta: 'Roma', 
						  tema: 'Humanidades'
			});
			Quiz.create({ pregunta: 'Capital de Portugal', 
						  respuesta: 'Lisboa',
						  tema: 'Humanidades'
			})
		.then(function(){console.log('La base de datos ha sido inicializada.')});
		};
	});		
});
