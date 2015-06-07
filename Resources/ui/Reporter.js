function Reporter() {
	var reportData = Ti.App.Properties.getObject("accountData");
	Ti.API.info(reportData);

	var incidentData = {
		latitude : "latitude",
		longitude : "latitude",
		date : "",
		time : "",
		general_location : "",
		incident_type : ""
	};	
	
	var animalData = [];
	
	var ReporterWindow = Ti.UI.createWindow({
		title:'Reporter',
    	backgroundColor:'#fff',
	});
	
	var ReporterView1 = Ti.UI.createView({
		top: 0,
		height: "100%"
	});

	var ReporterView2 = Ti.UI.createScrollView({
		top: 0,
		height: Ti.UI.SIZE,
		layout: "vertical"
	});	


	var SpeciesInstructions = Ti.UI.createLabel({
		top: 25,
		text: "Please select a mammal, up to 3:",
	});	
	
	var addSpecies = Ti.UI.createButton({
		top: 20,
		title: "+ Add a species",
		height: 50,
		backgroundColor: "#1abc9c",
		color: "#fff",
		width: "80%"
	});	
	
	addedSpeciesList = Ti.UI.createView({
		layout: "vertical",
		top: 10
	});
	
	Ti.App.addEventListener("newSpeciesAdded", function(e){
		Ti.API.info(e);
		Ti.API.info(e.injuries);
		
		speciesInjuryCode = e.injuries;
		Ti.API.info(speciesInjuryCode[0]);
		Ti.API.info(speciesInjuryCode.length);
		
		newSpeciesElement = Ti.UI.createView({
			height: Ti.UI.SIZE,
			width: "100%",
			backgroundColor: "#f0f0f0",
			layout: "vertical"
		});
		
		var newSpeciesImage = Ti.UI.createImageView({
				image: "ui/assets/"+ e.image,
				width: 70,
				height: 70,
				borderRadius: 35,
				top: 10
		});
		
		newSpeciesTitle = Ti.UI.createLabel({
			text: e.title,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			height: 50,
			top: 0
		});

		newSpeciesCounter = Ti.UI.createLabel({
			text: "Number involved: " + e.count,
			top: 0
		});
		
		newSpeciesElement.add(newSpeciesImage);
		newSpeciesElement.add(newSpeciesTitle);
		newSpeciesElement.add(newSpeciesCounter);
		var codeText = "";
		for (var i=0; i < speciesInjuryCode.length; i++){	
			
			newSpeciesInjuries = Ti.UI.createLabel({
				text: speciesInjuryCode[i],
				height: 20,
				top: 0
			});		
			newSpeciesElement.add(newSpeciesInjuries);
		}
		
		newSpeciesDivider1 = Ti.UI.createView({
			height: 10,
			backgroundColor: "#f0f0f0",
			width: "100%"
		});

		newSpeciesDivider2 = Ti.UI.createView({
			height: 5,
			backgroundColor: "#fff",
			width: "100%"
		});
		newSpeciesElement.add(newSpeciesDivider1);
		newSpeciesElement.add(newSpeciesDivider2);

		addedSpeciesList.add(newSpeciesElement);
		
		speciesData = {
			species_codes: e.title,
			injury_codes:  e.injuries,
			number: e.count
		};
		
		animalData.push(speciesData);
	});
	
	ReporterView2.add(SpeciesInstructions);
	ReporterView2.add(addSpecies);
	ReporterView2.add(addedSpeciesList);
	
	addSpecies.addEventListener("click", function(e){
		SpeciesSelector = require("ui/SpeciesSelector");
		SpeciesSelector = new SpeciesSelector();
		SpeciesSelector.open({
			modal: true
		});
		
	});
	
	
	
	var scrollableView = Ti.UI.createScrollableView({
	  views: [ReporterView1, ReporterView2],
	  top: 75,
	  scrollingEnabled: false
	});

	ReporterWindow.add(scrollableView);
		
	var ReporterNavBar = Ti.UI.createView({
		top: 0,
		backgroundColor: "#2ecc71",
		height: 75
	});
	
	ReporterWindow.add(ReporterNavBar);

	var NavBarLabel = Ti.UI.createLabel({
		top: 32.5,
		right: 10,
		width: 70,
		font: {fontSize:20,fontFamily:'Helvetica Neue', fontWeight: 'bold'}, 
		text: "Next",
		textAlign: "right",
		color: "#fff"
	});	

	var NavBarTitle = Ti.UI.createLabel({
		top: 32.5,
		width: 100,
		text: "Step 1",
		font: {fontSize:18,fontFamily:'Helvetica Neue', fontWeight: 'bold'}, 
		textAlign: "center",
		color: "#fff"
	});	
	
	var NavBarClose = Ti.UI.createLabel({
		top: 32.5,
		left: 10,
		width: 70,
		font: {fontSize:18,fontFamily:'Helvetica Neue'}, 
		text: "Close",
		textAlign: "left",
		color: "#fff"
	});		
	ReporterWindow.add(ReporterNavBar);
	ReporterNavBar.add(NavBarLabel);
	ReporterNavBar.add(NavBarTitle);
	ReporterNavBar.add(NavBarClose);
	

	NavBarLabel.addEventListener("click", function(e){
		Ti.API.info(e);
		if (e.source.text == "Next"){
			e.source.text = "Send";
			NavBarTitle.text = "Step 2";
			NavBarClose.text = "Back";
			scrollableView.moveNext();
		
		} else if (e.source.text == "Send"){
			submitData();
		}
	});
	
	NavBarClose.addEventListener("click", function(e){
		if (e.source.text == "Close"){
			ReporterWindow.close();

		} else {
			scrollableView.movePrevious();
			NavBarTitle.text = "Step 1";
			NavBarLabel.text = "Next";
			e.source.text = "Close";
		}
	});	
		
		
	var incidentLabel = Ti.UI.createLabel({
		text: "Pick Incident Type",
		font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		
		top: 15
	});
	
	ReporterView1.add(incidentLabel);
	
	var dateLabel = Ti.UI.createLabel({
		text: "Date, time, location",
		font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		top: 110
	});
	
	ReporterView1.add(incidentLabel);
	ReporterView1.add(dateLabel);

	var bb1 = Titanium.UI.iOS.createTabbedBar({
	    labels:['Incidental', 'Intentional'],
	    backgroundColor:'#336699',
	    top:50,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:50,
	    width:200
	});
	ReporterView1.add(bb1);
	
	bb1.addEventListener("click", function(e){
		Ti.API.info(e.source.getIndex());
		var index = e.source.getIndex();
		if (index  == 0){
			incidentData.incident_type = "Incidental";
		}else if (index  == 1){
			incidentData.incident_type = "Intentional";
		}
	});

	var picker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  minDate:new Date(2009,0,1),
	  maxDate:new Date(2014,11,31),
	  value:new Date(),
	  bottom: 0,
	  visible: false
	});
	
	incidentData.date = picker.value;
	incidentData.time = picker.value;

	var dateButton = Ti.UI.createLabel({
		text: picker.value,
		top: 140
	}); 
	
	ReporterView1.add(dateButton);
		
	//ReporterView1.add(picker);
	
	var locationArea = Ti.UI.createLabel({
		text: Ti.Geolocation.getCurrentPosition.coords,
		top: 165,
		textAlign: "center"
	});
	Ti.API.info(Ti.Geolocation.getCurrentPosition.coords);
	ReporterView1.add(locationArea);
	
	//Date and time of incident
	//Location - Longtitude/Latitude
	//Incidental/Intentional

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
 
	//
	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	//
	Titanium.Geolocation.distanceFilter = 10;
	 
	//
// GET CURRENT POSITION - THIS FIRES ONCE
//
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (e.error)
    {
        alert('HFL cannot get your current location');
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
 
    //
    //CREATE MAP VIEW
    //
    var Map = require('ti.map');
    
     var currentLocation = Map.createAnnotation({
    latitude: latitude,
    longitude: longitude,
    title:"You are here",
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});
	
	
	incidentData.latitude = latitude;
	incidentData.longitude = longitude;
	
	var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        annotations:[currentLocation],
        bottom: 0,
        height: "50%"
    });
    
 	Ti.API.info("Latitude: "+ latitude);
 	Ti.API.info("Longtitude: "+ longitude);
 	locationArea.text = "Latitude: "+ latitude + "  " + "Longtitude: "+ longitude;
    ReporterView1.add(mapview);
});	
	
	submitData = function(e){
		
		if (animalData.length > 0){
			db = require('system/db');
			//alert("data submitting");
			var dateRaw = incidentData.date;
			dateString = (dateRaw.getFullYear() + "-" + (dateRaw.getMonth() + 1) + "-" + dateRaw.getDate());
			timeString = dateRaw.getHours() + ":" + dateRaw.getMinutes() ;
			
			Ti.API.info("Time String");
			Ti.API.info(dateString);
			Ti.API.info(timeString);
			
			incidentData.date = dateString;
			incidentData.time = timeString;
			
			specificAnimal = animalData[0];
			//put together data
			var combinedData={};
			for(var _obj in reportData) combinedData[_obj ]=reportData[_obj];
			for(var _obj in incidentData) combinedData[_obj ]=incidentData[_obj];
			for(var _obj in specificAnimal) combinedData[_obj ]=specificAnimal[_obj];
			
			Ti.API.info(combinedData);
			
			db.save(combinedData);
			//validate Data first
			ReporterWindow.close();
		} else {
			alert("No animal reported yet!");
		}
	};

	//Species Choice	

	return ReporterWindow;
	
}

module.exports = Reporter;
