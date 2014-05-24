
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

app.post('/saveData', function(req, res){

	$maxValues = 6;

	$nowFormated = req.body.nowFormated;
	
	var connection = new sql.Connection(config, function(err) {

		var transaction = connection.transaction();

		transaction.begin(function(err) {

			//Execute first procedure

			var request3 = new sql.Request(transaction);

			/*request3.input('sTabla', 'saProveedor');
			request3.input('sCampo', 'co_prov');
			request3.input('sPrefijo', 'FRIO');*/

			request3.output('sResult', sql.int);
			request3.execute('[dbo].[aAa_pObtenerProximoNumeroRooooY]', function(err, recordsets, returnValue) {
			    
			    if(err){

			    	console.log('Error in procedure');

					res.json(err);

			    }
			    else{

			    	console.dir(returnValue);

			    	$co_prov = returnValue;
			    	$co_prov2 = returnValue + 1;

			    	//Create co_prov 1

			    	$values = String($co_prov).length;

			    	$codRest = $maxValues - $values;

			    	$cod = "";

			    	for (var i = 0; i < $codRest; i++) {
			    		
			    		$cod = $cod + "0";

			    	}

			    	$co_prov = "FRIO"+$cod+$co_prov;

			    	//Create co_prov 2

			    	$values = String($co_prov2).length;

			    	$codRest = $maxValues - $values;

			    	$cod = "";

			    	for (var i = 0; i < $codRest; i++) {
			    		
			    		$cod = $cod + "0";

			    	}

			    	$co_prov2 = "FRIO"+$cod+$co_prov2;

			    	//Create inserts

			    	$consultSql = "INSERT [dbo].[saProveedor] ([co_prov], [prov_des], [co_seg], [co_zon], [tip_pro], [inactivo], [direc1], [direc2], [telefonos], [fax], [respons], [fecha_reg], [mont_cre], [co_mone], [cond_pag], [plaz_pag], [desc_ppago], [desc_glob], [rif], [nacional], [numcom], [feccom], [dis_cen], [nit], [email], [co_cta_ingr_egr], [comentario], [tipo_adi], [matriz], [co_tab], [tipo_per], [co_pais], [ciudad], [zip], [website], [formtype], [taxid], [contribu_e], [rete_regis_doc], [porc_esp], [campo1], [campo2], [campo3], [campo4], [campo5], [campo6], [campo7], [campo8], [co_us_in], [co_sucu_in], [fe_us_in], [co_us_mo], [co_sucu_mo], [fe_us_mo], [revisado], [trasnfe]) VALUES ('"+ $co_prov +"', N'ROY EDGAR CALDERON RONDON', N'04    ', N'CAR   ', N'01    ', 0, N'CTRA AUTOPISTA LA VARIANTE BARBULA LOCAL GALPON N- 20 URB INDUSTRIAL LOS NARANJILLOS YAGUA LOS GUAYOS GUACARA EDO CARABOBO', NULL, N'(0245) 9953942  (0414) 721.41.16 Móvil.', N'CASILLERO ZOOM VLN-6347', N'JESUS ROA (PRIMO) 0416-6746665', CAST('"+$nowFormated+"' AS SmallDateTime), CAST(0.00 AS Decimal(18, 2)), N'BSF   ', N'07    ', 30, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), N'J293770041', 1, NULL, NULL, NULL, NULL, N'refrigeramosamerica@gmail.com', N'01                  ', N'DIRECCION EN VALENCIA. CENTRO COMERCIAL E INDUSTRIAL LOS NARANJILLOS. ENTRANDO A LA VARIANTE VIA PUERTO CABELLO. GALPON Nº 20. FAVOR LLAMAR ANTES SR. JESUS ROA. 0416-6746665.PARA PEDIDOS DE KACOSA-EXPO-AIRE-FIBENGLASS-MAVI-DIVENENCA-ETC. QUE POR FAVOR ENTREGAR ALLI LOS PEDIDOS. EXTERIOR 01150106171001268040', 1, NULL, NULL, N'3', N'VE    ', N'VALENCIA', NULL, NULL, NULL, NULL, 1, 0, CAST(75.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'001   ', N'ZZZW  ', CAST('"+$nowFormated+"' AS DateTime), N'ROY', N'01    ', CAST('"+$nowFormated+"' AS DateTime), N'C', NULL)";

					$consultSql2 = "INSERT [dbo].[saProveedor] ([co_prov], [prov_des], [co_seg], [co_zon], [tip_pro], [inactivo], [direc1], [direc2], [telefonos], [fax], [respons], [fecha_reg], [mont_cre], [co_mone], [cond_pag], [plaz_pag], [desc_ppago], [desc_glob], [rif], [nacional], [numcom], [feccom], [dis_cen], [nit], [email], [co_cta_ingr_egr], [comentario], [tipo_adi], [matriz], [co_tab], [tipo_per], [co_pais], [ciudad], [zip], [website], [formtype], [taxid], [contribu_e], [rete_regis_doc], [porc_esp], [campo1], [campo2], [campo3], [campo4], [campo5], [campo6], [campo7], [campo8], [co_us_in], [co_sucu_in], [fe_us_in], [co_us_mo], [co_sucu_mo], [fe_us_mo], [revisado], [trasnfe]) VALUES ('"+ $co_prov2 +"', N'ROY EDGAR CALDERON RONDON', N'04    ', N'CAR   ', N'01    ', 0, N'CTRA AUTOPISTA LA VARIANTE BARBULA LOCAL GALPON N- 20 URB INDUSTRIAL LOS NARANJILLOS YAGUA LOS GUAYOS GUACARA EDO CARABOBO', NULL, N'(0245) 9953942  (0414) 721.41.16 Móvil.', N'CASILLERO ZOOM VLN-6347', N'JESUS ROA (PRIMO) 0416-6746665', CAST('"+$nowFormated+"' AS SmallDateTime), CAST(0.00 AS Decimal(18, 2)), N'BSF   ', N'07    ', 30, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), N'J293770041', 1, NULL, NULL, NULL, NULL, N'refrigeramosamerica@gmail.com', N'01                  ', N'DIRECCION EN VALENCIA. CENTRO COMERCIAL E INDUSTRIAL LOS NARANJILLOS. ENTRANDO A LA VARIANTE VIA PUERTO CABELLO. GALPON Nº 20. FAVOR LLAMAR ANTES SR. JESUS ROA. 0416-6746665.PARA PEDIDOS DE KACOSA-EXPO-AIRE-FIBENGLASS-MAVI-DIVENENCA-ETC. QUE POR FAVOR ENTREGAR ALLI LOS PEDIDOS. EXTERIOR 01150106171001268040', 1, NULL, NULL, N'3', N'VE    ', N'VALENCIA', NULL, NULL, NULL, NULL, 1, 0, CAST(75.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'001   ', N'ZZZW  ', CAST('"+$nowFormated+"' AS DateTime), N'ROY', N'01    ', CAST('"+$nowFormated+"' AS DateTime), N'C', NULL)";

					var request = new sql.Request(transaction);

					console.log("Cod1: "+$co_prov+" Cod2: "+$co_prov2);

					//Create first insert

					request.query($consultSql, function(err, recordset) {

						if(err){

							console.log('Error1');

							res.json(err);

							transaction.rollback(function(err) {

								console.log('Error in insert, rollback 1');
					       			
					    	});	
						}
						else{

							var request2 = new sql.Request(transaction);

							request2.query($consultSql2, function(err, recordset) {

								if(err){

									es.json(err);

									transaction.rollback(function(err) {

										console.log('Error in insert, rollback 2');
						       			
						    		});	
								}
								else{

									transaction.commit(function(err, recordset) {

										if(err){

											console.log('Error2');

											res.json(err);
										}
										else{

											console.log('Registro guardado con éxito');

											res.json(200, {status: 'Register inserted successfully'});
										}   	
								
						    		});
								}

							});
						}

				    });

			    }
			    
			});
		});

	});

});

app.post('/saveUser', function(req, res){

	$dateRegister = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

	$username = req.body.username;
	$password = req.body.password;
	$email = req.body.email;

	$salt = 'salt';

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

http.createServer(app).listen(3000, function () {

  console.log("Servidor listo escuchando: http://localhost:3000");

});