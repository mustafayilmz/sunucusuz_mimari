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
	connection.query("update employee set employee_name=?, employee_salary=?, employee_age=? where id=?", [event.employee_name, event.employee_salary, event.employee_age, event.id], function(error, results, fields){
		if(error) throw error;
		context.callbackWaitsForEmptyEventLoop = false;
		callback(null, results);
	});
};