exports.init = function(){
		var db = Ti.Database.open('app'); // PRIMARY KEY
		//db.execute('DROP TABLE IF EXISTS tracker');
		db.execute('CREATE TABLE IF NOT EXISTS tracker(	id INTEGER PRIMARY KEY, \
														created_at TEXT, \
														data TEXT);');
														
		db.execute('CREATE TABLE IF NOT EXISTS cache(id INTEGER PRIMARY KEY, \
														data TEXT, \
														image TEXT);');

		db.close();
};

exports.save = function(data){
	var img = '';
	var patient_image = null;
	Ti.API.info("SAVE CALLED");

	// for (var j=0; j<(questions.length-1); j++){
		// Ti.API.info('questiontype:' + (j+1) + ":" +questions[j].questionType);
		// if ( questions[j].questionType == 'camera' ) {
			// if (data['q'+(j + 1)] != false) {
				// Ti.API.info(data['q'+(j + 1)]);
				// var img = data["q" + (j + 1)].replace(/['"]/g,'');
				// var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, img);
				// patient_image = patient_image.read();
			// } else {
				// var img = '';
				// var patient_image = null;
			// }
		// } 
	// } 

	data.created_at = Math.round((new Date()).getTime() / 1000);
	// data.procedure_id = Ti.App.Properties.getString('procedure');
	
	 
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){
		Ti.API.info("HAS CONNECTION");
		var db = Ti.Database.open('app');
		db.execute('INSERT INTO tracker (created_at, \
											data) VALUES (?, ?)', 
											Math.round((new Date()).getTime() / 1000).toFixed(0),
											JSON.stringify(data));
		db.close();
		
		var client = Ti.Network.createHTTPClient({
		     onload : function(e) {
		         //if(_callback) {
		          //  _callback(this);
		        //}
		        alert("Your Form was sent succesfully!");
		     },
		     onerror : function(e) {
		     	//Ti.API.info(JSON.stringify(e));
		     	alert("ERROR IN SENDING");
		     		//alert("Could not sync your tracker.");
		            var tmp_data = JSON.stringify(data);
					//var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, data[7].question.replace(/['"]/g,''));
					var db = Ti.Database.open('app');
					
					if(patient_image == null){
						db.execute("INSERT INTO cache(data) VALUES('tracker', '" + tmp_data + "')");
					}else{
						db.execute("INSERT INTO cache(data, image) VALUES('tracker', '" + tmp_data + "', '" + img + "')");
					}
					db.close();
		     },
		     timeout : 10000
		 });
		client.setRequestHeader("Content-Type", "application/json");
		client.open("POST", "https://docs.google.com/forms/d/1QGn0H7dhm5ZComHGiF-f4tAcWftWxL9R77W_pnJbZPQ/formResponse");

				var accountData = Ti.App.Properties.getObject("accountData");
				var params = "entry.704012813="+data.first_name;
				params += ("&"+"entry.1256129758="+data.last_name);
				// params += ("&"+"entry.242675736="+data.middle_name);
				params += ("&"+"entry.439413146="+data.street_address);
				params += ("&"+"entry.698332735="+data.city);
				params += ("&"+"entry.769944760="+data.state);
				params += ("&"+"entry.1202321178="+data.zip_code);
				params += ("&"+"entry.1797685335="+data.vessel_name);
				params += ("&"+"entry.1132934840="+data.coast_guard_id);
				params += ("&"+"entry.2119389093="+data.state_id);
				params += ("&"+"entry.1605714745="+data.fishery_ID);
				params += ("&"+"entry.1528096846="+data.fish_gear_type);
				params += ("&"+"entry.1911269000="+"2015-06-07");
				params += ("&"+"entry.2005118167="+data.time);
				params += ("&"+"entry.1531891437="+data.latitude);
				params += ("&"+"entry.483701292="+data.longitude);
				params += ("&"+"entry.466829699="+data.general_location);
				params += ("&"+"entry.1015028783="+data.incident_type);
				params += ("&"+"entry.1652214620="+data.species_codes);
				
				var html_data ="<p>New MMAP Report submitted:</p>";
			    html_data = "First Name: "+data.first_name + "<br>";
				html_data += ("Last Name"+data.last_name+ "<br>");
				// params += ("&"+"entry.242675736="+data.middle_name);
				html_data += ("Street Address: "+data.street_address+ "<br>");
				html_data += ("City: "+data.city+ "<br>");
				html_data += ("State: "+data.state+ "<br>");
				html_data += ("Zip code: "+data.zip_code+ "<br>");
				html_data += ("Vessel name: "+data.vessel_name+ "<br>");
				html_data += ("Coast guard: "+data.coast_guard_id+ "<br>");
				html_data += ("State ID: "+data.state_id+ "<br>");
				html_data += ("Fishery ID: "+data.fishery_ID+ "<br>");
				html_data += ("Gear Type: "+data.fish_gear_type+ "<br>");
				html_data += ("Date of incident: "+"2015-06-21"+ "<br>");
				html_data += ("Time of incident: "+data.time+ "<br>");
				html_data += ("Latitude: "+data.latitude+ "<br>");
				html_data += ("Longitude: "+data.longitude+ "<br>");
				html_data += ("General Location: "+data.general_location+ "<br>");
				html_data += ("Incident Type: "+data.incident_type+ "<br>");
				html_data += ("Species Code: "+data.species_codes+ "<br>");
// 				
				// //incident problems
				for (var i =0; i<data.injury_codes.length; i++){
					html_data += ("Species Injuries: "+data.injury_codes[i]+ "<br>" );
				}
				html_data += ("Number of species involved: "+data.number+ "<br>");
// 				
				params += ("&"+"entry.2059397053="+data.number);
				
				Ti.API.info(params);	
				client.send(params);	
				
				var key = "Ya9vgwISVO7JWwssDM63xQ";
    			var url = "https://mandrillapp.com/api/1.0/messages/send.json";
	
				var client2 = Ti.Network.createHTTPClient({
					onload : function(e) {
						Ti.API.info(e);
					},
					onerror : function(e) {
						Ti.API.info("FAILED SEND");
						Ti.API.info(e);
						
						Ti.API.debug(e.error);
					},
						 timeout : 100000  // in milliseconds
					});
	
				var species_image = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "ui/assets/sea_otter.png");
				Ti.API.info("species_image");
				Ti.API.info(species_image);
				species_image = species_image.read();
				Ti.API.info(species_image);		 
			 	var imgStr = Ti.Utils.base64encode(species_image).toString();			 		 
				var data = {
				    'key': key,
				    'message': {
				      'from_email': 'williekckwok@gmail.com',
				      'to': [{
				            'email': 'biscuittwo@gmail.com',
				            'name': 'MMAP',
				            'type': 'to'
				          }],
				      'autotext': 'true',
				      'subject': 'MMAP Incident Report',
				      'html': html_data,
				      "images": [
				            {
				                "type": "image/png",
				                "name": "SPECIESIMAGE",
				                "content": imgStr
				            }
				        ]
				    }
				 };
				 
				 if (Ti.App.Properties.hasProperty("currentSavedImage")){
					imagename = Ti.App.Properties.getString("currentSavedImage");
					var user_photo = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imagename);
					user_photo = user_photo.read();
					var user_photo_string = Ti.Utils.base64encode(user_photo).toString();	
					var data = {
				    'key': key,
				    'message': {
				      'from_email': 'williekckwok@gmail.com',
				      'to': [{
				            'email': 'biscuittwo@gmail.com',
				            'name': 'MMAP',
				            'type': 'to'
				          }],
				      'autotext': 'true',
				      'subject': 'MMAP Incident Report',
				      'html': html_data,
				      "images": [
				            {
				                "type": "image/png",
				                "name": "SPECIESIMAGE",
				                "content": imgStr
				            },
				            {
				                "type": "image/jpg",
				                "name": "USERTAKENIMAGE",
				                "content": user_photo_string
				            }
				        ]
				    }
				 };				
						
				}
				// Prepare the connection.
				client2.setRequestHeader("Content-Type", "application/json");
				client2.open("POST", url);
				// Send the request.
				client2.send(JSON.stringify(data));		
				
		 // if(patient_image == null){
		 	// var params = {
				// "token": token,
			 	// "data": JSON.stringify(data)
			 // };
		 // }else{
		 	// var params = {
				// "token": token,
				// "data": JSON.stringify(data),
				// "image": patient_image
			 // };
		 // }
		 
	}else{
		// Cache POST request until internet is detected
		var db = Ti.Database.open('app');
		db.execute('INSERT INTO tracker (created_at, \
											data) VALUES (?, ?)', 
											Math.round((new Date()).getTime() / 1000).toFixed(0),
											JSON.stringify(data));
		db.close();
		var tmp_data = JSON.stringify(data);
		//var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, data[7].question.replace(/['"]/g,''));
		var db = Ti.Database.open('app');
		
		if(patient_image == null){
			db.execute("INSERT INTO cache(data) VALUES('tracker', '" + tmp_data + "')");
		}else{
			db.execute("INSERT INTO cache(data, image) VALUES('tracker', '"  + tmp_data + "', '" + img + "')");
		}
		db.close();
		// if(_callback) {
         //   _callback(true);
        //}
	}
};

exports.show = function(){
	var logData = [];
	var db = Ti.Database.open('app');
	var logs = db.execute('SELECT * FROM tracker');
	while(logs.isValidRow()){
		data = logs.fieldByName('data');
		data = JSON.parse(data);
		logData.push(data);
		logs.next();
	};
	
	db.close();
// 	
	Ti.API.info(logData);
// 	
	return logData;
};

exports.cache = function(_callback){
	Ti.API.info("In the Cache Function");
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){
		var db = Ti.Database.open('app');
		var cache = db.execute('SELECT * FROM cache');
		while(cache.isValidRow())
		{
			if(cache.fieldByName('action') == 'tracker'){
				var client = Ti.Network.createHTTPClient({
				     onload : function(e) {
				         if(_callback) {
				            _callback(this);
				        }
				     },
				     onerror : function(e) {
				     	if(_callback) {
				     		alert("Could not sync your tracker.");
				            _callback(null);
				        }
				     },
				     timeout : 10000
				 });
		client.setRequestHeader("Content-Type", "application/json");
		client.open("POST", "https://docs.google.com/forms/d/1QGn0H7dhm5ZComHGiF-f4tAcWftWxL9R77W_pnJbZPQ/formResponse");
				 if(cache.fieldByName('image') == null){
				 	var params = {
						"token": cache.fieldByName('token'),
						"data": cache.fieldByName('data')
					 };
				 }else{
				 	var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, cache.fieldByName('image'));
				 	var params = {
						"token": cache.fieldByName('token'),
						"data": cache.fieldByName('data'),
						"image": patient_image.read()
					 };
				 }
				 client.send(params);
				 db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
				 
			}else if(cache.fieldByName('action') == 'symptom'){				
				var client = Ti.Network.createHTTPClient({
				     onload : function(e) {
				     	if(_callback) {
				            _callback(this);
				        }
				     },
				     onerror : function(e) {
				     	if(_callback) {
				     		alert("Could not sync your tracker.");
				            _callback(null);
				        }
				     },
				     timeout : 10000
				 });
				 client.setRequestHeader("enctype", "multipart/form-data");
				 client.open("POST", Ti.App.Properties.getString("route")+"/api/v4/symptom");
				 
			 	var params = {
					"token": cache.fieldByName('token'),
				 	"data": cache.fieldByName('data')
				 };
				 client.send(params);
				 db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
			}else if(cache.fieldByName('action') == 'survey'){	
				Ti.API.info("Trying to send cached survey results");			
				var client = Ti.Network.createHTTPClient({
				     onload : function(e) {
				       Ti.API.info("Sending survey from cache success");
						db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
				     	if(_callback) {
				            _callback(this);
				        }
				     },
				     onerror : function(e) {
				     	Ti.API.info("Sending survey from cache HTTP Client error");
				     	Ti.API.info(e);
				     	if(_callback) {
				     		alert("Could not sync your tracker.");
				            _callback(null);
				        }
				     },
				     timeout : 10000
				 });
				 client.setRequestHeader("enctype", "multipart/form-data");
				 client.open("POST", Ti.App.Properties.getString("route")+"/api/v4/survey");
			 	var params = {
					"token": cache.fieldByName('token'),
				 	"data": cache.fieldByName('data')
				 }; 
				 if (cache.fieldByName('token') != ""){
				 	var params = {
						"token": cache.fieldByName('token'),
					 	"data": cache.fieldByName('data'),
					 	"procedure_id": cache.fieldByName('procID')
					 };
				 }
				 Ti.API.info("PARAMS ARE" + params);
				 Ti.API.info(params);
				 client.send(params);
				 //db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
			}else if(cache.fieldByName('action') == 'complete_message'){	
				Ti.API.info("Trying to send cached completed message");			
				var client = Ti.Network.createHTTPClient({
				     onload : function(e) {
				       Ti.API.info("Sending message from cache success");
						db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
				     	if(_callback) {
				            _callback(this);
				        }
				     },
				     onerror : function(e) {
				     	Ti.API.info("Sending message from cache HTTP Client error");
				     	Ti.API.info(e);
				     	if(_callback) {
				     		alert("Could not sync your messages.");
				            _callback(null);
				        }
				     },
				     timeout : 10000
				 });
				 client.setRequestHeader("enctype", "multipart/form-data");
				 client.open("POST", Ti.App.Properties.getString("route")+"/api/v4/patient_read_event");
			 	var params = {
					"token": cache.fieldByName('token'),
				 	"event_id": cache.fieldByName('data')
				 }; 

				 //Ti.API.info(params);
				 client.send(params);
				 //db.execute('DELETE FROM cache WHERE id="' + cache.fieldByName('id') + '"'); // Needs verification
			}
			cache.next();
		}
		db.close();
	}
};