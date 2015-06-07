exports.init = function(){
		var db = Ti.Database.open('app'); // PRIMARY KEY
		//db.execute('DROP TABLE IF EXISTS tracker');
		db.execute('CREATE TABLE IF NOT EXISTS tracker(	id INTEGER PRIMARY KEY, \
														created_at TEXT, \
														data TEXT);');
														
		db.execute('CREATE TABLE IF NOT EXISTS cache(id INTEGER PRIMARY KEY, \
														data TEXT, \
														procID TEXT,\
														image TEXT);');

		db.close();
};

exports.save = function(_callback, data, questions){
	var img = '';
	var patient_image = null;

	for (var j=0; j<(questions.length-1); j++){
		Ti.API.info('questiontype:' + (j+1) + ":" +questions[j].questionType);
		if ( questions[j].questionType == 'camera' ) {
			if (data['q'+(j + 1)] != false) {
				Ti.API.info(data['q'+(j + 1)]);
				var img = data["q" + (j + 1)].replace(/['"]/g,'');
				var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, img);
				patient_image = patient_image.read();
			} else {
				var img = '';
				var patient_image = null;
			}
		} 
	} 

	data.created_at = Math.round((new Date()).getTime() / 1000);
	// data.procedure_id = Ti.App.Properties.getString('procedure');
	
	 
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE){
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
		     },
		     onerror : function(e) {
		     	//Ti.API.info(JSON.stringify(e));
		     	if(_callback) {
		     		//alert("Could not sync your tracker.");
		            var tmp_data = JSON.stringify(data);
					//var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, data[7].question.replace(/['"]/g,''));
					var db = Ti.Database.open('app');
					
					if(patient_image == null){
						db.execute("INSERT INTO cache(action, token, data) VALUES('tracker', '" + token + "', '" + tmp_data + "')");
					}else{
						db.execute("INSERT INTO cache(action, token, data, image) VALUES('tracker', '" + token + "', '" + tmp_data + "', '" + img + "')");
					}
					db.close();
					 //if(_callback) {
			          //  _callback(true);
			        //}
		        }
		     },
		     timeout : 10000
		 });
		 client.setRequestHeader("enctype", "multipart/form-data");
		 client.open("POST", Ti.App.Properties.getString("route")+"/api/v4/tracker");
		 		 
		 if(patient_image == null){
		 	var params = {
				"token": token,
			 	"data": JSON.stringify(data)
			 };
		 }else{
		 	var params = {
				"token": token,
				"data": JSON.stringify(data),
				"image": patient_image
			 };
		 }
		 client.send(params);
	}else{
		// Cache POST request until internet is detected
		var db = Ti.Database.open('app');
		db.execute('INSERT INTO tracker (created_at, \
											data) VALUES (?, ?)', 
											Math.round((new Date()).getTime() / 1000).toFixed(0),
											JSON.stringify(data));
		db.close();
		//var token = Ti.App.Properties.getString('token');
		//var tmp_data = '{"created_at":' + Math.round((new Date()).getTime() / 1000) + ', "q1":' + data.q1 + ', "q2":' + data.q2 + ', "q3":' + data.q3 + ', "q4":' + data.q4 + ', "q5":' + data.q5 + ', "q6":' + data.q6 + ', "q7":' + data.q7 + ', "q9":' + data.q9 + ', "q10":' + data.q10 + ', "q11":' + data.q11 + '}';
		var tmp_data = JSON.stringify(data);
		//var patient_image = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, data[7].question.replace(/['"]/g,''));
		var db = Ti.Database.open('app');
		
		if(patient_image == null){
			db.execute("INSERT INTO cache(action, token, data) VALUES('tracker', '" + token + "', '" + tmp_data + "')");
		}else{
			db.execute("INSERT INTO cache(action, token, data, image) VALUES('tracker', '" + token + "', '" + tmp_data + "', '" + img + "')");
		}
		db.close();
		// if(_callback) {
         //   _callback(true);
        //}
	}
	if(_callback) {
        _callback(true);
    }
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
				 client.setRequestHeader("enctype", "multipart/form-data");
				 client.open("POST", Ti.App.Properties.getString("route")+"/api/v4/tracker");
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