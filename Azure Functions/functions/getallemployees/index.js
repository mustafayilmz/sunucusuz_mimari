var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "",		//RDS bağlantınıza göre doldurun
	user: "",		//RDS bağlantınıza göre doldurun
	password: "",	//RDS bağlantınıza göre doldurun
	database: ""	//RDS bağlantınıza göre doldurun
});

connection.connect(function(err){
	if(err) throw err
});

module.exports = function(context, req) {
    connection.query("select * from employee", function(error, results, fields){
		if(error) throw error;
		context.res = {
			body: results
		};
		context.done();
	});
};