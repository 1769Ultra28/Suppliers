
var express = require('express'),
http = require('http'),
crypto = require('crypto'),
moment = require('moment');

var app = express()
.use(express.bodyParser())
.use(express.static('public'));

var sql = require('mssql'); 

var config = {
	user: "BestDeveloper",
	password: "BeTheBest159+",
	server: 'cssc.mine.nu\\CSSQL',
	database: 'PRUEBAS'
};

var connection = new sql.Connection(config, function(err) {
	var transaction = connection.transaction();
	transaction.begin(function(err) {
		var reqProcClient = new sql.Request(transaction);
		$prefix = 'FRIO';
		$table = 'saCliente';
		$pKey = "co_cli";

		// These 2 values depends of the table... 
		reqProcClient.input('sTabla', $table);
		reqProcClient.input('sCampo', $pKey);
		//We could set this prefix anywhere in our app and bring it here... 
		reqProcClient.input('sPrefijo', $prefix);
		reqProcClient.execute('[dbo].[pObtenerProximoNumero]', function(err, recordsets, returnValue) {
			if(err){
				console.log('Error req procedure');
				//res.json(err);
			}
			else{
				$nextCode = recordsets[0][0].Codigo.toString().trim();
				$proxNum = parseInt($nextCode.substr($prefix.length))+1;
				console.log($proxNum);
				$nextCode = $nextCode.substring(0,$nextCode.length-$proxNum.toString().length).concat($proxNum.toString());
				console.log($nextCode);
			}
		});
	});
});

