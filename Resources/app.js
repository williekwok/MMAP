// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
	db = require('system/db');
	db.init();

var needSetup = function(e){
	var setup = Ti.App.Properties.hasProperty("setup");

	if (!setup) {
		//Setup an account if info not setup yet
		var Setup = require("ui/Setup");
		Setup = new Setup();
		Setup.open({
			modal : true
		});
	}
};

needSetup();

// Ti.App.addEventListener("resumed", function(e){
	// needSetup();
// });
// 

// create tab group



var tabGroup = Titanium.UI.createTabGroup({
	backgroundColor: '#fff',
	backgroundGradient: null,
	navTintColor: 'white',
	tabsBackgroundColor :'#fff',
	viewShadowOffset: null
});


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Incident Report',
    backgroundColor:'#fff',
});


var logo = Ti.UI.createImageView({
	image: "ui/assets/mmaplogo.jpg",
    width: 75,
    height: 75,
    top: 40
});

win1.add(logo);


var headerText = Ti.UI.createLabel({
	text: "The MMAP requires commerical fisherman to report every incidental mortality and injury of marine mammals that occurs as a result of commercial fishing operations.",
    width: "80%",
	font: {fontSize:14,fontFamily:'Helvetica Neue', fontWeight: 'light'}, 
	color: "#2c3e50",   
    textAlign: "center",
    top: 150
});

win1.add(headerText);


var tab1 = Titanium.UI.createTab({  
    icon:'ui/assets/report.png',
    title:'Reporter',
    backgroundColor:'blue',
    color: 'black',
    window:win1
});

var reportButton = Titanium.UI.createButton({
	color:'white',
	title:'File a report',
	backgroundColor: '#1abc9c',
	height: 50,
	top: 300,
	font: {fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
	textAlign:'center',
	borderRadius: 5,
	width:'80%'
});

var logsButton = Titanium.UI.createButton({
	color:'#34495e',
	borderColor: '#34495e',
	title:'See your reports',
	backgroundColor: '#fff',
	height: 50,
	top: 360,
	font: {fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	borderRadius: 5,
	width:'80%'
});

win1.add(logsButton);



// reportButton.addEventListener("click", function(e){
	// poster();
// });

var poster = function(e){
	var client = Ti.Network.createHTTPClient({
				     onload : function(e) {
				     	Ti.API.info(e);
						alert("Sent");
				     },
				     onerror : function(e) {
				     	if(_callback) {
				     		alert("Could not sync your tracker.");
				            _callback(null);
				        }
				     },
				     timeout : 10000
				 });
				// client.setRequestHeader("enctype", "application/x-www-form-urlencoded");
				client.setRequestHeader("Content-Type", "application/json");
				 client.open("POST", "https://docs.google.com/forms/d/1QGn0H7dhm5ZComHGiF-f4tAcWftWxL9R77W_pnJbZPQ/formResponse");
				
				var accountData = Ti.App.Properties.getObject("accountData");
				var data = "entry.704012813="+accountData.first_name;
				data += ("&"+"entry.1256129758="+accountData.last_name);
				
				Ti.API.info(data);
				
				//data = JSON.stringify(data);
				
				client.send(data);

};

reportButton.addEventListener("click", function(e){
		var Reporter = require("ui/Reporter");
		Reporter = new Reporter();
		Reporter.open({
			modal : true
		});	
});


win1.add(reportButton);

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'History',
    backgroundColor:'#fff'
});

logsButton.addEventListener("click", function(e){
	tabGroup.setActiveTab(1);
});



var tab2 = Titanium.UI.createTab({  
    icon:'ui/assets/log.png',
    title:'History',
    window:win2
});

//db = require('system/db');
	
Logs = require("ui/Logs");
Logs = new Logs();

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text: "db.show()",
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(Logs);

var win3 = Titanium.UI.createWindow({  
    title:'Account',
    backgroundColor:'#fff'
});




var tab3 = Titanium.UI.createTab({  
    icon:'ui/assets/settings.png',
    title:'Account',
    window:win3
});

var accountHeader = Titanium.UI.createView({
	color:'#f0f0f0',
	font: {fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	top: 0,
	layout: "vertical"
});

var accountHeaderTitle = Titanium.UI.createLabel({
	font: {fontSize:20, fontFamily:'Helvetica Neue'},
	text: "Demo User",
	textAlign:'center',
	top: 10
});

accountHeader.add(accountHeaderTitle);

win3.add(accountHeader);


var label3 = Titanium.UI.createLabel({
	color:'#999',
	//text:'I am Window 3',
	font: {fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var editAccountButton = Titanium.UI.createButton({
	color:'white',
	title:'Edit Account',
	backgroundColor: '#1abc9c',
	height: 50,
	top: 10,
	font: {fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
	textAlign:'center',
	borderRadius: 5,
	width:'80%'
});



accountHeader.add(editAccountButton);

	var detailsSection = Ti.UI.createLabel({
		text: "Contact Information",
		font: {fontSize:12,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		color: "#95a5a6",
		top: 20,
		height: 25,
		left: "5%",
		width: "90%"
	});	
	
	var FirstNameField = Ti.UI.createTextField({
		hintText : "First Name",
		value: "",
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		top: 5,
		height: 50,
		left: "5%",
		width: "90%"
	});	
	var LastNameField = Ti.UI.createTextField({
		hintText: "Last Name",
		value: "",
		borderColor: "#f0f0f0",
		top: 0,
		paddingLeft: 10,
		height: 50,
		width: "90%"
	});	
	
			
	var StreetNameField = Ti.UI.createTextField({
		hintText: "Mailing address - Street",
		value: "",
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		top: 0,
		height: 50,
		width: "90%"
	});	

	var CityNameField = Ti.UI.createTextField({
		hintText : "City",
		value: "",
		top: 0,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
		width: "90%"	});	

	var StateNameField = Ti.UI.createTextField({
		hintText: "State",
		value: "",
		top: 0,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
		width: "90%"
	});	

	var ZipField = Ti.UI.createTextField({
		hintText: "7-Zip Code",
		value: "",
		borderColor: "#f0f0f0",
		width: "90%",
		paddingLeft: 10,
		height: 0,
		top: 0
	});	
	accountHeader.add(detailsSection);
	accountHeader.add(FirstNameField);
	accountHeader.add(LastNameField);
	accountHeader.add(StreetNameField);
	accountHeader.add(CityNameField);
	accountHeader.add(StateNameField);
	accountHeader.add(ZipField);

Ti.App.addEventListener("updatedAccount", function(e){
	if (Ti.App.Properties.hasProperty("accountData")){
		var accountData = JSON.stringify(Ti.App.Properties.getObject("accountData"));
		var accountData = Ti.App.Properties.getObject("accountData");
		//label3.text = accountData;
		accountHeaderTitle.text = accountData.first_name + " " + accountData.last_name;
		Ti.API.info("Refresh user");
		Ti.API.info(Ti.App.Properties.getObject("accountData"));

		FirstNameField.value = "First Name: " +accountData.first_name;
		LastNameField.value = "Last Name: " +accountData.last_name;
		StreetNameField.value = "Address: " + accountData.street_address;
		CityNameField.value = "City: "+accountData.city;
		StateNameField.value = "State: "+accountData.state;
		ZipField.value = "7-Zip Code: "+accountData.zip_code;

	
	}
});

//win3.add(label3);

editAccountButton.addEventListener("click", function(e){
	var Setup = require("ui/Setup");
	Setup = new Setup();
	Setup.open({
		modal: true
	});
});


var win4 = Titanium.UI.createWindow({  
    title:'About',
    backgroundColor:'#fff'
});
var tab4 = Titanium.UI.createTab({  
    icon: "ui/assets/about.png",
    title:'About',
    window:win4
});

Info = require("ui/Info");
Info = new Info();

win4.add(Info);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  


// open tab group
tabGroup.open();
