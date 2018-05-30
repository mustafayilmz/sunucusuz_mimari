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
    connection.query("select * from employee", function(error, results, fields){
		if(error) throw error;
		
		//the issue seems to be that as long as there is an open connection, 
		//because of the non empty event loop, calling the callback doesn't terminate the function.
		context.callbackWaitsForEmptyEventLoop = false;	//solution
		
		callback(null, results);
	});
};