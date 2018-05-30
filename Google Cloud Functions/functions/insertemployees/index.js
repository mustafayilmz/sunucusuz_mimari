var mysql = require("mysql");
var cors = require('cors')({origin: '*'});

var connection = mysql.createConnection({
	host: "",		//RDS bağlantınıza göre doldurun
	user: "",		//RDS bağlantınıza göre doldurun
	password: "",	//RDS bağlantınıza göre doldurun
	database: ""	//RDS bağlantınıza göre doldurun
});

connection.connect(function(err){
	if(err) throw err
});

exports.handler = (req, res) => {
	cors(req, res, () => {
		if(req.method == "POST"){
			connection.query("insert into employee set ?", req.body, function(error, results, fields){
				if(error) throw error;
				res.send(results);
			});
		}
		else{
			res.send("Wrong request");
		}
	});
};