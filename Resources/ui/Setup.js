function Setup() {
	
	var accountData = {
		first_name: "Willie",
		last_name : "Kwok",
		street_address: "",
		city: "",
		state: "",
		zip_code: "",
		vessel_name: "",
		state_id: "",
		coast_guard_id: "",
		fishery_ID: "",
		fish_gear_type: ""
	};
	
	if (Ti.App.Properties.hasProperty("accountData")){
		var accountData = Ti.App.Properties.getObject("accountData");
	}
	
	Ti.API.info(accountData);
	
	
	
	var setupWindow = Titanium.UI.createWindow({
		title:'Setup',
    	backgroundColor:'#fff'
	});
	
	
	var setupView1 = Titanium.UI.createScrollView({
		height: Ti.UI.SIZE
	});

	var setupView2 = Titanium.UI.createScrollView({
		height: Ti.UI.SIZE
	});	
	

	var setupHeaderText1 = Ti.UI.createLabel({
		text: "Get Started",
		font: {fontSize:22,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		top: 50,
		width: "90%",
		textAlign: "center"
	});	
		
	var setupHeaderText = Ti.UI.createLabel({
		text: "Thanks for using the MMAP Incident Reporting App! Please answer some information about yourself. This will make reporting much easier and faster for you!",
		font: {fontSize:14,fontFamily:'Helvetica Neue', fontWeight: 'light'},
		top: 90,
		width: "90%",
		textAlign: "center"
	});	

	var setupHeaderText2 = Ti.UI.createLabel({
		text: "Vessel information",
		font: {fontSize:22,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		top: 50,
		width: "90%",
		textAlign: "center"
	});	
	
	var setupFieldView = Ti.UI.createView({
		top: 250,
	});

	var setupFieldView2 = Ti.UI.createView({
		top: 100,
	});

	var VesselNameField = Ti.UI.createTextField({
		hintText : "Vessel Name",
		value: accountData.vessel_name,
		borderColor: "#f0f0f0",
		height: 50,
		paddingLeft: 10,
		top: 0,
		width: "90%"
	});	
	

	var RegNumField = Ti.UI.createTextField({
		hintText : "Coast Guard DOC. No. or Vessel State Reg. No.",
		top: 50,
		value: accountData.coast_guard_id,
		borderColor: "#f0f0f0",
		height: 50,
		paddingLeft: 10,
		width: "90%"
	});	
	
	var StateNumField = Ti.UI.createTextField({
		hintText : "State Commerical Vessel No.",
		top: 100,
		value: accountData.state_id,
		width: "90%",
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
	});	

	var IDField = Ti.UI.createTextField({
		hintText : "Fishery I.D. No.",
		value: accountData.fishery_ID,
		top: 150,
		width: "90%",
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
	});	
	
	var GearField = Ti.UI.createTextField({
		hintText : "Fishery gear type and target species",
		value: accountData.fish_gear_type,
		top: 200,
		width: "90%",
		paddingLeft: 10,
		borderColor: "#f0f0f0",
		height: 50,
	});	
	
	//Other settings
			
	var FirstNameField = Ti.UI.createTextField({
		hintText : "First Name",
		value: accountData.first_name,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		top: 0,
		left: "5%",
		height: 50,
		width: "45%"
	});	
	
	FirstNameField.addEventListener('focus', function(){
    	setupView1.scrollTo(0, 200);  
	});
	
	var LastNameField = Ti.UI.createTextField({
		hintText: "Last Name",
		value: accountData.last_name,
		borderColor: "#f0f0f0",
		top: 0,
		paddingLeft: 10,
		height: 50,
		right: "5%",
		width: "45%"
	});	
	
	var StreetNameField = Ti.UI.createTextField({
		hintText: "Mailing address - Street",
		value: accountData.street_address,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		top: 50,
		height: 50,
		width: "90%"
	});	

	var CityNameField = Ti.UI.createTextField({
		hintText : "City",
		value: accountData.city,
		top: 100,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
		left: "5%",
		width: "45%"	});	

	var StateNameField = Ti.UI.createTextField({
		hintText: "State",
		value: accountData.state,
		top: 100,
		borderColor: "#f0f0f0",
		paddingLeft: 10,
		height: 50,
		right: "5%",
		width: "45%"
	});	

	var ZipField = Ti.UI.createTextField({
		hintText: "7-Zip Code",
		value: accountData.zip_code,
		borderColor: "#f0f0f0",
		width: "90%",
		paddingLeft: 10,
		height: 50,
		top: 150
	});	
	
	var continueButton = Ti.UI.createButton({
		title: "Continue",
		borderColor: "#f0f0f0",
		width: "90%",
		backgroundColor: "#1abc9c",
		color: "white",
		height: 50,
		borderRadius: 5,
		font: {fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		bottom: 25
	});

	var completeButton = Ti.UI.createButton({
		title: "Complete",
		width: "90%",
		backgroundColor: "#1abc9c",
		color: "white",
		height: 50,
		borderRadius: 5,
		font: {fontFamily:'Helvetica Neue', fontWeight: 'bold'},
		bottom: 25
	});	

	
	setupFieldView.add(FirstNameField);
	setupFieldView.add(LastNameField);
	setupFieldView.add(StreetNameField);
	setupFieldView.add(CityNameField);
	setupFieldView.add(StateNameField);
	setupFieldView.add(ZipField);

	setupFieldView.add(continueButton);


	setupFieldView2.add(VesselNameField);
	setupFieldView2.add(RegNumField);
	setupFieldView2.add(StateNumField);
	setupFieldView2.add(IDField);
	setupFieldView2.add(GearField);

	setupFieldView2.add(completeButton);
	
		
	completeButton.addEventListener("click", function(e){
		
		accountData.first_name = FirstNameField.value;
		accountData.last_name = LastNameField.value;
		accountData.street_address = StreetNameField.value;
		accountData.city = CityNameField.value;
		accountData.state = StateNameField.value;
		accountData.zip_code = ZipField.value;
		
		accountData.vessel_name = VesselNameField.value;
		accountData.coast_guard_id = RegNumField.value;
		accountData.state_id = StateNumField.value;
		accountData.fishery_ID = IDField.value;
		accountData.fish_gear_type = GearField.value;
		
		Ti.App.Properties.setObject("accountData", accountData);
		Ti.App.fireEvent("updatedAccount");
		setupWindow.close();
	});

	var scrollableView = Ti.UI.createScrollableView({
	  views: [setupView1, setupView2],
	  showPagingControl:true,
	  // scrollingEnabled: false
	});
		

	continueButton.addEventListener("click", function(e){
		scrollableView.moveNext();
	});
		
	setupWindow.add(scrollableView);
	setupView1.add(setupHeaderText);
	setupView1.add(setupHeaderText1);
	setupView1.add(setupFieldView);
	setupView2.add(setupHeaderText2);
	setupView2.add(setupFieldView2);


		
	return setupWindow;
}

module.exports = Setup;
