function Logs() {
	db = require('system/db');
	
	logData = db.show();
	rowData = [];
	
	Ti.API.info(logData);

	for (var i = 0; i < logData.length; i++){
		var row = Ti.UI.createTableViewRow({
			data: logData[i]
		});
		
		var label = Ti.UI.createLabel({
			left: 60,
			text: logData[i].date
		});
		
		row.addEventListener("click", function(e){
			logDetailWindow = Ti.UI.createWindow({
				backgroundColor: "#fff"
				
			});
			logDetailView = Ti.UI.createView({
				layout: "vertical",
				backgroundColor: "#fff"
			});
			
			logDetailSpecies = Ti.UI.createLabel({
				text: e.row.data.species_codes,
				top: 50
			});

			logDetailClose = Ti.UI.createLabel({
				text: "Close",
				top: 10
			});		
			
			logDetailClose.addEventListener("click", function(e){
				logDetailWindow.close();
			});	
			logDetailView.add(logDetailClose);
			logDetailView.add(logDetailSpecies);
	
			logDetailWindow.add(logDetailView);
			logDetailWindow.open({
				modal: true
			});
		});
		
		row.add(label);
		rowData.push(row);
	};

	var logTableView = Titanium.UI.createTableView({
    	backgroundColor:'#fff',
    	data: rowData
	});
	
	var logView = Titanium.UI.createScrollView({
		backgroundColor: "red",
		height: Ti.UI.SIZE
	});
	
	var logTitle = Titanium.UI.createLabel({
		text: logData,
		color: "black"
	});
	
	logView.add(logTitle);
	
	return logTableView;
	
	
}

module.exports = Logs;

