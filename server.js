
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

app.get('/',	function(req, res) {

	res.sendFile('.public/index.html');

});

var connection = new sql.Connection(config, function(err) {

	app.get('/Suppliers', function(req, res){

		res.header("Content-Type: application/json");
		console.log("Querying Suppliers!");
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("SELECT p.co_prov, p.prov_des, p.rif, p.co_zon, p.ciudad, p.zip, p.telefonos, p.fax, p.respons, p.email, p.website, p.direc1, p.direc2, z.zon_des FROM saProveedor p JOIN saZona z on (z.co_zon = p.co_zon)", function(err, recordset) {        
    	res.send(recordset);
    });
});

	app.get('/Arts', function respond(req, res){
		res.header("Content-Type: application/json");
		console.log("Querying 200 Arts!");
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("SELECT TOP 200 a.co_art,  a.art_des, a.co_subl, a.co_lin, a.co_cat, c.cat_des, s.subl_des, l.lin_des FROM saArticulo a JOIN saLineaArticulo l  on (l.co_lin = a.co_lin) JOIN saSubLinea s       on (s.co_subl = a.co_subl) JOIN saCatArticulo c    on (c.co_cat = a.co_cat )", function(err, recordset) {        
    	res.send(recordset);
    });
});

	app.get('/Zones', function respond(req, res){
		res.header("Content-Type: application/json");
		console.log("Querying Zones!");
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("SELECT co_zon, zon_des FROM saZona", function(err, recordset) {        
    	res.send(recordset);
    });
});

	app.get('/Sellers', function respond(req, res){
		res.header("Content-Type: application/json");
		console.log("Querying Sellers");
		var request = new sql.Request(connection);
		request.query("SELECT co_ven, ven_des FROM saVendedor", function(err, recordset){
			res.send(recordset);
		});
	});

	app.get('/Clients', function respond(req, res){
		res.header("Content-Type: application/json");
		console.log("Querying Clients!");
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("SELECT c.co_cli, c.cli_des, c.rif, c.co_zon, c.ciudad, c.zip, c.co_ven, c.telefonos, c.fax, c.respons, c.email, c.website, c.direc1, c.direc2, c.co_seg, z.zon_des, v.ven_des, s.seg_des FROM saCliente c JOIN saZona z on (z.co_zon = c.co_zon) JOIN saVendedor v on (c.co_ven = v.co_ven) JOIN saSegmento s on (s.co_seg = c.co_seg)", function(err, recordset) {        
    	res.send(recordset);
    });
});

	app.get('/ArtImagen', function respond(req, res){
		res.header("Content-Type: application/json");
		console.log("Querying Images!");
    var request = new sql.Request(connection); // or: var request = connection.request();
    request.query("SELECT TOP 1 co_art, picture FROM saArtImagen", function(err, recordset) {        
    	res.send(recordset);
    });
});
});

app.post('/setClient', function(request, response){
  //console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back

  var client = request.body;
  $maxValues = 6;
  $nowFormated = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

  console.log(client.zoneSelected.co_zon);
  console.log(client.sellerSelected.co_ven);

  var connection = new sql.Connection(config, function(err) {
  	var transaction = connection.transaction();
  	transaction.begin(function(err) {
			//Execute first procedure
			var reqProcClient = new sql.Request(transaction);
			/*reqProcClient.input('sTabla', 'saProveedor');
			reqProcClient.input('sCampo', 'co_prov');
			reqProcClient.input('sPrefijo', 'FRIO');*/
			reqProcClient.output('sResult', sql.int);
			reqProcClient.execute('[dbo].[aAa_pObtenerProximoCLIENTEroy]', function(err, recordsets, returnValue) {

				if(err){
					console.log('Error req procedure');
					res.json(err);
				}
				else{
					console.log('El Siguiente Cliente sera: '+returnValue);
					$co_prov = returnValue;

			    	//Ajustando el codigo... 
			    	$values = String($co_prov).length;
			    	$codRest = $maxValues - $values;
			    	$cod = "";
			    	for (var i = 0; i < $codRest; i++) {
			    		$cod = $cod + "0";
			    	}
			    	$co_prov = "FRIO"+$cod+$co_prov;
			    	$consultSql = "INSERT [dbo].[saCliente] ([co_cli], [tip_cli], [cli_des], [direc1], [dir_ent2], [direc2], [telefonos], [fax], [inactivo], [comentario], [respons], [fecha_reg], [puntaje], [mont_cre], [co_mone], [cond_pag], [plaz_pag], [desc_ppago], [co_zon], [co_seg], [co_ven], [desc_glob], [horar_caja], [frecu_vist], [lunes], [martes], [miercoles], [jueves], [viernes], [sabado], [domingo], [rif], [nit], [contrib], [numcom], [feccom], [dis_cen], [email], [co_cta_ingr_egr], [juridico], [tipo_adi], [matriz], [co_tab], [tipo_per], [valido], [ciudad], [zip], [login], [password], [website], [sincredito], [contribu_e], [rete_regis_doc], [porc_esp], [co_pais], [serialp], [Id], [salestax], [estado], [campo1], [campo2], [campo3], [campo4], [campo5], [campo6], [campo7], [campo8], [co_us_in], [fe_us_in], [co_sucu_in], [co_us_mo], [fe_us_mo], [co_sucu_mo], [revisado], [trasnfe]) VALUES ('"+ $co_prov+"', N'MA    ','"+client.cli_des+"' , '"+client.direc1+"', NULL, NULL, '"+client.telefonos+"', '"+client.fax+"', 0, NULL, '"+client.respons+"', CAST('"+$nowFormated+"' AS SmallDateTime), 0, CAST(0.00 AS Decimal(18, 2)), N'BSF   ', N'01    ', 0, CAST(0.00 AS Decimal(18, 2)), N'TAC   ', N'04    ', N'08    ', CAST(0.00 AS Decimal(18, 2)), NULL, NULL, 0, 0, 0, 0, 0, 0, 0, '"+client.rif+"', NULL, 1, NULL, NULL, NULL, '"+client.email+"', N'00                  ', 0, 1, NULL, NULL, NULL, 0, '"+client.ciudad+"', NULL, NULL, NULL, '"+client.website+"', 0, 0, 0, CAST(0.00 AS Decimal(18, 2)), N'VE    ', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'ROY   ', CAST('"+$nowFormated+"' AS DateTime), N'01    ', N'ROY   ', CAST('"+$nowFormated+"' AS DateTime), N'01    ', NULL, NULL)";
			    	// console.log('Pase por Insertando Cliente...');

			    	var request = new sql.Request(transaction);
			    	console.log("El codigo de tales sera: "+$co_prov);

					//Create first insert
					request.query($consultSql, function(err, recordset) {
						if(err){
							console.log('Error Insert');
							response.json(err);
							transaction.rollback(function(err) {
								console.log('Error in insert... rollback!!!!');
							});	
						}
						else{

							transaction.commit(function(err, recordset) {
								if(err){
									console.log('Error2');
									response.json(err);
								}
								else{
									console.log('Registro guardado con éxito');
									response.json(200, {status: 'Client inserted successfully :D'});
								}   	

							});
						}

					});

				}

			});

});
});

});





//Chuchu
app.get('/loadData', function(req, res){

	$consultSql = "SELECT TOP 10 prov_des, rif, co_zon, ciudad, zip, telefonos, fax, respons, email, website, direc1, direc2 FROM saProveedor order by co_prov DESC";

	var transaction = new sql.Transaction();

	var connection = new sql.Connection(config, function(err) {

		var request = new sql.Request(connection);

		request.query(	$consultSql,	function(err, recordset) {

			console.dir(recordset);

			res.json(recordset);

		});

	});

});



app.post('/saveUser', function(req, res){

	$dateRegister = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

	$username = req.body.username;
	$password = req.body.password;
	$email = req.body.email;

	$salt = '84]{>9#Dcdv(@FH@7UXu&a';

	//Encrypt password

	cipher = crypto.createCipher('aes-256-cbc', $salt);

	cipher.update($password, 'utf8', 'base64');

	$encryptedPassword = cipher.final('base64');

	//Create consult sql

	$consultSql = "INSERT [dbo].[UltraLogin] ([userName], [passWord], [email], [salt]) VALUES ('"+ $username +"', '"+ $encryptedPassword +"' , '"+ $email +"', '"+ $salt +"')";
	
	var connection = new sql.Connection(config, function(err) {

		var transaction = connection.transaction();

		transaction.begin(function(err) {

			var request = new sql.Request(transaction);

			request.query($consultSql, function(err, recordset) {

				if(err){

					res.json(err);

					transaction.rollback(function(err) {

						console.log('Error in insert, rollback');

					});	
				}
				else{

					transaction.commit(function(err, recordset) {

						if(err){

							console.log('Error2');

							res.json(err);
						}
						else{

							console.log('Registro de usuario guardado con éxito');

							res.json(200, {status: 'User inserted successfully'});
						}   	

					});
				}

			});
		});
	});
});

http.createServer(app).listen(15001, function () {

	console.log("Servidor listo escuchando: http://localhost:15001");

});