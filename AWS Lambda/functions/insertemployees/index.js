var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "",		//RDS bağlantınıza göre doldurun
	user: "",		//RDS bağlantınıza göre doldurun
	password: "",	//RDS bağlantınıza göre doldurun
	database: ""	//RDS bağlantınıza göre doldurun
});

connection.connect(function(err){
	if(err) throw err
	console.log("You are now connected...");
});

exports.handler = function(event, context, callback) {
	connection.query("insert into employee set ?", event, function(error, results, fields){
		if(error) throw error;
		context.callbackWaitsForEmptyEventLoop = false;
		callback(null, results);
	});
};