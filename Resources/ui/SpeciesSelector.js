function SpeciesSelector() {
	
	closeButton = Ti.UI.createView({
		width: 50,
		height: 25,
	});
	
	closeButtonText = Ti.UI.createLabel({
		text: "Back",
	});
	
	closeButton.add(closeButtonText);


	speciesSelection = Ti.UI.createWindow({
			backgroundColor: 'fff',
			title:'Select a species',
			leftNavButton : closeButton
		});
	
	
	var win1 = Titanium.UI.iOS.createNavigationWindow({
	   window: speciesSelection,
	   leftNavButton : closeButton
	});	


	var tableData = [ 
	{title: 'Seals Section',
	image: 'pinnipeds.png',
	content: 'tfljsdflksadfjlsad Lorem Ipsum',
	type: 'section'}, 
	{title: 'Seals',
	image: 'pinnipeds.png',
	content: 'tfljsdflksadfjlsad Lorem Ipsum'}, 
	{title: 'Dolphins'}, 
	{title: 'Porpoises'}, 
	{title: 'Walrus',
	image: 'walrus.png'},
	{title: 'Otters'},
	{title: 'Other',
	image: 'pinnipeds.png',
	content: 'tfljsdflksadfjlsad Lorem Ipsum'}
	];
	
	var tableData = [
			{
    title: "Species identifier",
    image: "unidentified_small_cetacean.png"
},
		{
    title: "Species close to your GPS location",
    image: "harbor_seal.png",
    type: 'section'
},
	{
    title: "100-Steller (northern) sea lion",
    image: "stellar_sea_lion.png"
}, 	{
    title: "115- Harbor seal",
    image: "harbor_seal.png"
},{
    title: "135- Sea otter",
    image: "sea_otter.png"
},{
    title: "205- Unidentified pinniped",
    image: "unidentified_pinniped.png"
},{
    title: "053- Common dolphin",
    image: "common_dolphin.png"
},	{
    title: "Other Species",
    image: "harbor_seal.png",
    type: 'section'
},
	{
    title: "115- Harbor seal",
    image: "harbor_seal.png"
},{
    title: "205- Unidentified pinniped",
    image: "unidentified_pinniped.png"
}, {
    title: "053- Common dolphin",
    image: "common_dolphin.png"
}, {
    title: "068- Harbor porpoise",
    image: "harbor_porpoise.png"
}, {
    title: "235- Unidentified small cetacean (porpoise or dolphin)",
    image: "unidentified_small_cetacean.png"
}, {
    title: "011- Humpback whale",
    image: "humpback_whale.png"
}, {
    title: "002- North Atlantic right whale",
    image: "right_whale.png"
}, {
    title: "210- Unidentified baleen whale",
    image: "unidentified_baleen_whale.png"
}, {
    title: "114- Walrus",
    image: "walrus.png"
}, {
    title: "135- Sea otter",
    image: "sea_otter.png"
}, {
    title: "139- Manatee",
    image: "manatee.png"
}
];

var injuryCodes = [
{
	title: "01 - Visible blood flow",
	code: "01 - Visible blood flow"
},
{
	title: "02 - Loss of/damage to appendage/jaw",
	code: "02 - Loss of/damage to appendage/jaw"
},
{
	title: "03 - Inability to use appendage(s)",
	code: "03 - Inability to use appendage(s)"
},
{
	title: "04 - Asymmetry in shape of body or body position",
	code: "04 - Asymmetry in shape of body or body position"
},
{
	title: "05 - Any noticeable swelling or hemorrhage (bruising)",
	code: "05 - Any noticeable swelling or hemorrhage (bruising)"
},
{
	title: "06 - Laceration (deep cut)",
	code: "06 - Laceration (deep cut)"
},
{
	title: "07 - Rupture or puncture of eyeball",
	code: "07 - Rupture or puncture of eyeball"
},
{
	title: "08 - Listlessness or inability to defend",
	code: "08 - Listlessness or inability to defend"
},
{
	title: "09 - Inability to swim or dive",
	code: "09 - Inability to swim or dive"
},
{
	title: "10 - Equilibrium imbalance",
	code: "10 - Equilibrium imbalance"
},
{
	title: "11 - Ingestion of gear",
	code: "11 - Ingestion of gear"
},
{
	title: "12 - Released trailing gear/gear perforating body",
	code: "12 - Released trailing gear/gear perforating body"
},
{
	title: "13 - Other wound or injury",
	code: "13 - Other wound or injury"
},
{
	title: "14 - Killed",
	code: "114 - Killed"
}
];

var tbl_data = [];
for (var i = 0; i < tableData.length; i++) {
	if (tableData[i].type == "section"){
		var headerLabel2 = Ti.UI.createLabel({
			    font:{fontFamily:'Helvetica Neue',fontSize:12,fontWeight:'bold'},
			    text: "  "+tableData[i].title,
			    color:'#2c3e50',
			    backgroundColor: '#ecf0f1',
			    textAlign:'left',
			    top:0,
			    left:40,
			    height:50
		});
		rowSection = Titanium.UI.createTableViewSection({
			headerView: headerLabel2,
		});
		
		tbl_data.push(rowSection);
	} else {
	
	var row = Ti.UI.createTableViewRow({
		data: tableData[i]
	});
	var label = Ti.UI.createLabel({
		left: 60,
		text: tableData[i].title
	});
	
		var image = Ti.UI.createImageView({
			image: "ui/assets/"+tableData[i].image,
			width: 50,
			height: 50,
			left: 0
		});
		
	var button = Ti.UI.createButton({
		right: 10,
		height: 30,
		width: 80,
		title: 'press me'
	});
	
	var speciesIdentifierForm = function(){
		var speciesWindow1 = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: "Step 1",
				//backgroundColor: "#1abc9c"
		});

		var rowYes1 = Ti.UI.createTableViewRow({
			title: "Yes",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			hasChild: true,
			separatorColor: 'transparent',
			hasCheck: false
		});

		var rowNo1 = Ti.UI.createTableViewRow({
			title: "No",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			hasChild: true,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent',
			hasCheck: false
		});		
		
		var formData = [];
		formData.push(rowYes1);
		formData.push(rowNo1);

		var form1 = Ti.UI.createTableView({
			top: 300,
			data: formData,
			height: Ti.UI.SIZE
		});	

		var formIcon1 = Ti.UI.createImageView({
				image: "ui/assets/"+"fur.png",
				width: 200,
				height: 200,
				borderRadius: 50,
				top: 25
		});		
		

		var speciesView1 = Ti.UI.createLabel({
			top: 250,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			text: "Does it have fur?"
		});
		
		speciesWindow1.add(speciesView1);
		speciesWindow1.add(form1);
		speciesWindow1.add(formIcon1);
		
		var speciesWindow2 = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: "Step 2"
		});

		var SpeciesView2 = Ti.UI.createLabel({
			top: 250,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			text: "Does it have flippers?"
		});
		
		
		var rowYes2 = Ti.UI.createTableViewRow({
			title: "Flippers",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			hasChild: true,
			separatorColor: 'transparent',
			hasCheck: false
		});

		var rowNo2 = Ti.UI.createTableViewRow({
			title: "Paws",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			hasChild: true,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent',
			hasCheck: false
		});		
		
		var formData = [];
		formData.push(rowYes2);
		formData.push(rowNo2);

		var form2 = Ti.UI.createTableView({
			top: 300,
			data: formData,
			height: Ti.UI.SIZE
		});	
		
		var formIcon2 = Ti.UI.createImageView({
				image: "ui/assets/flippers.png",
				width: 200,
				height: 200,
				//borderRadius: 50,
				top: 25
		});		
		
		speciesWindow2.add(SpeciesView2);
		speciesWindow2.add(form2);
		speciesWindow2.add(formIcon2);
		
		var speciesWindow3 = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: "Step 3"
		});

		var SpeciesView3 = Ti.UI.createLabel({
			top:250,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				text: "Does it have tusks?"
		});
			
		var rowYes3 = Ti.UI.createTableViewRow({
			title: "Yes",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			hasChild: true,
			separatorColor: 'transparent',
			hasCheck: false
		});

		var rowNo3 = Ti.UI.createTableViewRow({
			title: "No",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			hasChild: true,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent',
			hasCheck: false
		});		
		
		var formData = [];
		formData.push(rowYes3);
		formData.push(rowNo3);

		var form3 = Ti.UI.createTableView({
			top: 300,
			data: formData,
			height: Ti.UI.SIZE
		});	

		var formIcon3 = Ti.UI.createImageView({
				image: "ui/assets/tusks.png",
				width: 200,
				height: 200,
				//borderRadius: 50,
				top: 25
		});	
		
		speciesWindow3.add(SpeciesView3);
		speciesWindow3.add(form3);
		speciesWindow3.add(formIcon3);
		
		var speciesWindow4 = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: "Step 4"
		});

		var SpeciesView4 = Ti.UI.createLabel({
			top: 250,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				text: "How big are the front flippers?"
		});
		
			
		var rowYes4 = Ti.UI.createTableViewRow({
			title: "short, furry",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			hasChild: true,
			separatorColor: 'transparent',
			hasCheck: false
		});

		var rowNo4 = Ti.UI.createTableViewRow({
			title: "elongated, skin-covered",
			height: 50,
			textAlign: "center",
			borderColor: "white",
			hasChild: true,
			font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
			separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
			separatorColor: 'transparent',
			hasCheck: false
		});		
		
		var formData = [];
		formData.push(rowYes4);
		formData.push(rowNo4);

		var form4 = Ti.UI.createTableView({
			top: 300,
			data: formData,
			height: Ti.UI.SIZE
		});	
		
		var formIcon4 = Ti.UI.createImageView({
				image: "ui/assets/front_flippers.png",
				width: 200,
				height: 200,
				borderRadius: 50,
				top: 25
		});	
		
		speciesWindow4.add(SpeciesView4);
		speciesWindow4.add(form4);
		speciesWindow4.add(formIcon4);
	
		form1.addEventListener("click", function(e){
			win1.openWindow(speciesWindow2, {animated:true});
		});
		form2.addEventListener("click", function(e){
			win1.openWindow(speciesWindow3, {animated:true});
		});
		form3.addEventListener("click", function(e){
			win1.openWindow(speciesWindow4, {animated:true});
		});

		var speciesWindow = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: "100-Steller (northern) Sea Lion"
		});

		form4.addEventListener("click", function(e){
			win1.openWindow(speciesWindow, {animated:true});
			  var dialog = Ti.UI.createAlertDialog({
			    message: 'Your species should be: 100-Steller (northern) Sea Lion!',
			    ok: 'Continue',
			    title: 'Species Identified!'
			  });
			  dialog.show();
			  
			var speciesData ={
				title: "100-Steller (northern) Sea Lion"
			};
			var speciesName = "100-Steller (northern) Sea Lion";
			var speciesImageAsset ="stellar_sea_lion.png";
			var speciesCount = 0;
			var speciesInjuryCode = [];
			
			var speciesView = Ti.UI.createScrollView({
				backgroundColor: "#fff",
				layout: "vertical"
			});
			speciesWindow.add(speciesView);
			

			var speciesImageComp1 = Ti.UI.createImageView({
				image: "ui/assets/"+ speciesImageAsset,
				width: "100%",
				top: 0
			});
			
			var speciesImageComp2 = Ti.UI.createImageView({
				image: "ui/assets/seal_illustration.png",
				width: "100%",
				top: 0
			});
			
			var speciesImageComp3 = Ti.UI.createImageView({
				image: "ui/assets/seal_illustration.png",
				width: "100%",
				top: 0
			});
			
			var speciesImage = Ti.UI.createScrollableView({
			  views:[speciesImageComp1,speciesImageComp2,speciesImageComp3],
			  height: Ti.UI.SIZE,
			  showPagingControl:true
			});

			var speciesNumber = Ti.UI.createView({
				top: 10,
				height: Ti.UI.SIZE
			});			
			
			var speciesNumberText = Ti.UI.createLabel({
				top: 0,
				height: 20,
				font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign: "center",
				text: "Number of animals involved"
			});
			
			speciesNumber.add(speciesNumberText);

			var speciesCountLabel = Ti.UI.createLabel({
				top: 25,
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				color: "#3498db",
				backgroundColor: "#ecf0f1",
				text: speciesCount,
				borderColor: "#f0f0f0",
				textAlign: "center",
				width: 100,
				height: 60,
			});
			
			
			speciesNumber.add(speciesCountLabel);

			var speciesCountAdd = Ti.UI.createLabel({
				text: "+",
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				top: 25,
				height: 60,
				width: 100,
				right: 0,
				textAlign: "center",
				backgroundColor: "#f0f0f0"
			});				
			
			speciesCountAdd.addEventListener("touchend", function(e){
				speciesCount += 1;
				speciesCountLabel.text = speciesCount;
			});	

			var speciesCountMinus = Ti.UI.createLabel({
				text: "-",
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				top: 25,
				height: 60,
				width: 100,
				left: 0,
				textAlign: "center",
				backgroundColor: "#f0f0f0"
			});			

			speciesCountMinus.addEventListener("touchend", function(e){
				if (speciesCount >= 1){
					speciesCount -= 1;
				}
				speciesCountLabel.text = speciesCount;
			});	
						
			speciesNumber.add(speciesCountAdd);
			speciesNumber.add(speciesCountMinus);

			var speciesInjuryText = Ti.UI.createLabel({
				top: 10,
				font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign: "center",
				text: "Enter type of mortality/injury"
			});			
			
			var injury_data = [];
			for(var i=0; i<injuryCodes.length; i++){
				
				var row = Ti.UI.createTableViewRow({
					title: injuryCodes[i].title,
					height: 50,
					hasCheck: false
				});
				
				 function remove(arr, item) {
				      for(var i = arr.length; i--;) {
				          if(arr[i] === item) {
				              arr.splice(i, 1);
				          }
				      }
				  }
				
				row.addEventListener("click", function(e){
					Ti.API.info(e);
					e.row.hasCheck = !e.row.hasCheck;
					if (e.row.hasCheck){
						speciesInjuryCode.push(e.row.title);
					} else {
						remove(speciesInjuryCode, e.row.title);
					}
					Ti.API.info(speciesInjuryCode);
				});
				
				injury_data.push(row);
			}
								
			var speciesChecklist = Ti.UI.createTableView({
				top: 0,
				data: injury_data,
			});			
	
			var speciesPhoto = Ti.UI.createImageView({
				image: "ui/assets/camera-icon.png",
				top: 10,
				width: "100%",
				backgroundColor: "#95a5a6"
			});			
			
			speciesPhoto.addEventListener("click", function(e){
		      Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
		      Ti.Media.showCamera({
		      //Titanium.Media.openPhotoGallery({
	            success:function(event)
	            {
	              speciesPhoto.image = event.media;
                                    
                  var image = event.media.imageAsResized(event.media.width / 4, event.media.height / 4);
              
              		//Get the current time as a string for the name of image to save
              		var currentDate = new Date();
                    var imagename = currentDate.getTime()+".jpg";
                    
              		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imagename);
              		Ti.App.Properties.setString("currentSavedImage",imagename);
              
              		f.write(image);
                    
		            },
		            cancel:function()
		            {
		            },
		            error:function(error)
		            {
		              alert("Sorry, your device could not take a picture, please try again.");
		            }
        		});
			});
				
			speciesNumber.add();
	
			var speciesSave = Ti.UI.createButton({
				title: "Save Animal Info",
				backgroundColor: "#1abc9c",
				color: "#fff",
				height: 50,
				width: "80%",
				top: 10
			});		
			
			speciesSave.addEventListener("touchend", function(e){
				Ti.App.fireEvent("newSpeciesAdded", {title: speciesName, count: speciesCount, injuries: speciesInjuryCode, image: speciesImageAsset});
				win1.close();
			});				
			speciesView.add(speciesImage);	
			speciesView.add(speciesNumber);
			speciesView.add(speciesInjuryText);
			speciesView.add(speciesChecklist);
			speciesView.add(speciesPhoto);
			speciesView.add(speciesSave);				
			
		});			
		
		
		
		win1.openWindow(speciesWindow1, {animated:true});
	};
	
	row.addEventListener("click", function(e){
		
		if (e.row.data.title != "Species identifier"){
			Ti.API.info("Test");
			Ti.API.info(e);
			Ti.API.info(e.row);
			Ti.API.info(e.row.data);
			Ti.API.info(e.rowData);
			Ti.API.info(e.rowData.data);
			
			var speciesData ={
				title: e.row.data.title
			};
			var speciesName = e.row.data.title;
			var speciesImageAsset = e.row.data.image;
			var speciesCount = 0;
			var speciesInjuryCode = [];
			
			var speciesWindow = Ti.UI.createWindow({
				backgroundColor: "#fff",
				title: e.row.data.title
			});

			var speciesView = Ti.UI.createScrollView({
				backgroundColor: "#fff",
				layout: "vertical"
			});
			speciesWindow.add(speciesView);
			

			var speciesImageComp1 = Ti.UI.createImageView({
				image: "ui/assets/"+ e.row.data.image,
				width: "100%",
				top: 0
			});
			
			var speciesImageComp2 = Ti.UI.createImageView({
				image: "ui/assets/seal_illustration.png",
				width: "100%",
				top: 0
			});
			
			var speciesImageComp3 = Ti.UI.createImageView({
				image: "ui/assets/seal_illustration.png",
				width: "100%",
				top: 0
			});
			
			var speciesImage = Ti.UI.createScrollableView({
			  views:[speciesImageComp1,speciesImageComp2,speciesImageComp3],
			  height: Ti.UI.SIZE,
			  showPagingControl:true
			});

			var speciesNumber = Ti.UI.createView({
				top: 10,
				height: Ti.UI.SIZE
			});			
			
			var speciesNumberText = Ti.UI.createLabel({
				top: 0,
				height: 20,
				font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign: "center",
				text: "Number of animals involved"
			});
			
			speciesNumber.add(speciesNumberText);

			var speciesCountLabel = Ti.UI.createLabel({
				top: 25,
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				color: "#3498db",
				backgroundColor: "#ecf0f1",
				text: speciesCount,
				borderColor: "#f0f0f0",
				textAlign: "center",
				width: 100,
				height: 60,
			});
			
			
			
			speciesNumber.add(speciesCountLabel);

			var speciesCountAdd = Ti.UI.createLabel({
				text: "+",
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				top: 25,
				height: 60,
				width: 100,
				right: 0,
				textAlign: "center",
				backgroundColor: "#f0f0f0"
			});				
			
			speciesCountAdd.addEventListener("touchend", function(e){
				speciesCount += 1;
				speciesCountLabel.text = speciesCount;
			});	

			var speciesCountMinus = Ti.UI.createLabel({
				text: "-",
				font: {fontSize:32,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				top: 25,
				height: 60,
				width: 100,
				left: 0,
				textAlign: "center",
				backgroundColor: "#f0f0f0"
			});			

			speciesCountMinus.addEventListener("touchend", function(e){
				if (speciesCount >= 1){
					speciesCount -= 1;
				}
				speciesCountLabel.text = speciesCount;
			});	
						
			speciesNumber.add(speciesCountAdd);
			speciesNumber.add(speciesCountMinus);

			var speciesInjuryText = Ti.UI.createLabel({
				top: 10,
				font: {fontSize:16,fontFamily:'Helvetica Neue', fontWeight: 'bold'},
				textAlign: "center",
				text: "Enter type of mortality/injury"
			});			
			
			var injury_data = [];
			for(var i=0; i<injuryCodes.length; i++){
				
				var row = Ti.UI.createTableViewRow({
					title: injuryCodes[i].title,
					height: 50,
					hasCheck: false
				});
				
				 function remove(arr, item) {
				      for(var i = arr.length; i--;) {
				          if(arr[i] === item) {
				              arr.splice(i, 1);
				          }
				      }
				  }
				
				row.addEventListener("click", function(e){
					Ti.API.info(e);
					e.row.hasCheck = !e.row.hasCheck;
					if (e.row.hasCheck){
						speciesInjuryCode.push(e.row.title);
					} else {
						remove(speciesInjuryCode, e.row.title);
					}
					Ti.API.info(speciesInjuryCode);
				});
				
				injury_data.push(row);
			}
								
			var speciesChecklist = Ti.UI.createTableView({
				top: 0,
				data: injury_data,
			});			
	
			var speciesPhoto = Ti.UI.createImageView({
				image: "ui/assets/camera-icon.png",
				top: 10,
				width: "100%",
				backgroundColor: "#95a5a6"
			});			
			
			speciesPhoto.addEventListener("click", function(e){
		      Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
		      Ti.Media.showCamera({
		      //Titanium.Media.openPhotoGallery({
	            success:function(event)
	            {
	              speciesPhoto.image = event.media;
                                    
                  var image = event.media.imageAsResized(event.media.width / 4, event.media.height / 4);
              
              		//Get the current time as a string for the name of image to save
              		var currentDate = new Date();
                    var imagename = currentDate.getTime()+".jpg";
                    
              		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, imagename);
              
              		f.write(image);
                    
		            },
		            cancel:function()
		            {
		            },
		            error:function(error)
		            {
		              alert("Sorry, your device could not take a picture, please try again.");
		            }
        		});
			});
				
			speciesNumber.add();
	
			var speciesSave = Ti.UI.createButton({
				title: "Save Animal",
				backgroundColor: "#1abc9c",
				color: "#fff",
				height: 50,
				width: "80%",
				top: 10
			});		
			
			speciesSave.addEventListener("touchend", function(e){
				Ti.App.fireEvent("newSpeciesAdded", {title: speciesName, count: speciesCount, injuries: speciesInjuryCode, image: speciesImageAsset});
				win1.close();
			});				
			speciesView.add(speciesImage);	
			speciesView.add(speciesNumber);
			speciesView.add(speciesInjuryText);
			speciesView.add(speciesChecklist);
			speciesView.add(speciesPhoto);
			speciesView.add(speciesSave);				
			
			win1.openWindow(speciesWindow, {animated:true});
			} else {
				speciesIdentifierForm();
			}
	});
	
	row.add(label);
	row.add(image);
	//row.add(button);
	tbl_data.push(row);
	}
}

	var search = Titanium.UI.createSearchBar({
	    height:50,
	    top:0,
	});

	var table = Ti.UI.createTableView({
	  data: tbl_data,
	  search:search,
	  top: 0
	});
	

	
	closeButton.addEventListener("click", function(e){
		win1.close();
	});	
	
	
	

				
		speciesSelection.add(table);
		// NavBarClose.addEventListener("click", function(e){
			// //speciesSelection.close();
				// var win2 = Titanium.UI.createWindow({
// 					
				// });
				// win1.openWindow(win2, {animated:true});
// 				
		// });
// 		
		return win1;
}

module.exports = SpeciesSelector;

