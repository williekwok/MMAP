function Reporter() {
	
	var reportData = Ti.App.Properties.getObject("userdata");
	
	
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
		//alert("I HAPPENED");
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
		
		newSpeciesTitle = Ti.UI.createLabel({
			text: e.title,
			height: 50,
			top: 0
		});

		newSpeciesCounter = Ti.UI.createLabel({
			text: "number: " + e.count,
			height: 50,
			top: 0
		});
		
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
		

		addedSpeciesList.add(newSpeciesElement);
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
		width: 50,
		text: "Next",
		color: "#fff"
	});	

	var NavBarTitle = Ti.UI.createLabel({
		top: 32.5,
		width: 100,
		text: "Step 1",
		textAlign: "center",
		color: "#fff"
	});	
	
	var NavBarClose = Ti.UI.createLabel({
		top: 32.5,
		left: 10,
		width: 50,
		text: "Close",
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
		

	var bb1 = Titanium.UI.iOS.createTabbedBar({
	    labels:['Incidental', 'Intentional'],
	    backgroundColor:'#336699',
	    top:50,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:50,
	    width:200
	});
	ReporterView1.add(bb1);

	var picker = Ti.UI.createPicker({
	  type:Ti.UI.PICKER_TYPE_DATE,
	  minDate:new Date(2009,0,1),
	  maxDate:new Date(2014,11,31),
	  value:new Date(2014,3,12),
	  bottom: 0,
	  visible: false
	});

	var dateButton = Ti.UI.createLabel({
		text: picker.value,
		top: 100
	}); 
	
	ReporterView1.add(dateButton);
		
	//ReporterView1.add(picker);
	
	var locationArea = Ti.UI.createLabel({
		text: Ti.Geolocation.getCurrentPosition.coords,
		top: 150
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
	
	mapData = {
		"latitude" : latitude,
		"latitude" : longitude
	};

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
    
 	Ti.API.info("Latitude is: "+ latitude);
 	Ti.API.info("Longtitude is: "+ longitude);
 	locationArea.text = "Latitude is: "+ latitude + ", " + "Longtitude is: "+ longitude;
    ReporterView1.add(mapview);
});	
	

	//Species Choice	

	return ReporterWindow;
	
}

module.exports = Reporter;
