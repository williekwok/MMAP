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
		
	});

	var setupView2 = Titanium.UI.createScrollView({
		
	});	
	
	
	var setupHeaderText = Ti.UI.createLabel({
		text: "Thanks for using the Marine Mammal Authorization Program Incident Reporting App. To start please input some information about yourself. This will make reporting much easier and faster for you!",
		top: 50
	});	

	var setupHeaderText2 = Ti.UI.createLabel({
		text: "Please provide some information about your vessel.",
		top: 50
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
		top: 0,
		width: "50%"
	});	
	

	var RegNumField = Ti.UI.createTextField({
		hintText : "Coast Guard DOC. No. or Vessel State Reg. No.",
		top: 50,
		value: accountData.coast_guard_id,
		width: "50%"
	});	
	
	var StateNumField = Ti.UI.createTextField({
		hintText : "State Commerical Vessel No.",
		top: 100,
		value: accountData.state_id,
		width: "50%"
	});	

	var IDField = Ti.UI.createTextField({
		hintText : "Fishery I.D. No.",
		value: accountData.fishery_ID,
		top: 150,
		width: "50%"
	});	
	
	var GearField = Ti.UI.createTextField({
		hintText : "Fishery gear type and target species",
		value: accountData.fish_gear_type,
		top: 200,
		width: "50%"
	});	
	
	//Other settings
			
	var FirstNameField = Ti.UI.createTextField({
		hintText : "First Name",
		value: accountData.first_name,
		top: 0,
		left: 0,
		width: "50%"
	});	

	var LastNameField = Ti.UI.createTextField({
		hintText: "Last Name",
		value: accountData.last_name,
		top: 0,
		right: 0,
		width: "50%"
	});	
	
	var StreetNameField = Ti.UI.createTextField({
		hintText: "Mailing address - Street",
		value: accountData.street_address,
		top: 50,
		width: "100%"
	});	

	var CityNameField = Ti.UI.createTextField({
		hintText : "City",
		value: accountData.city,
		top: 100,
		left: 0,
		width: "33%"
	});	

	var StateNameField = Ti.UI.createTextField({
		hintText: "State",
		value: accountData.state,
		top: 100,
		right: 0,
		width: "33%"
	});	

	var ZipField = Ti.UI.createTextField({
		hintText: "7-Zip Code",
		value: accountData.zip_code,
		top: 150,
		width: "100%"
	});	
	
	var continueButton = Ti.UI.createButton({
		title: "Continue",
		width: "80%",
		backgroundColor: "#1abc9c",
		color: "white",
		height: 50,
		borderRadius: 5,
		bottom: 50
	});

	var completeButton = Ti.UI.createButton({
		title: "Complete",
		width: "80%",
		backgroundColor: "#1abc9c",
		color: "white",
		height: 50,
		borderRadius: 5,
		bottom: 50
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
	setupView1.add(setupFieldView);
	setupView2.add(setupHeaderText2);
	setupView2.add(setupFieldView2);


		
	return setupWindow;
}

module.exports = Setup;
