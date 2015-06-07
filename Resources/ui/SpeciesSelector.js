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
    title: "115- Harbor seal",
    image: "harbor_seal.png"
},{
    title: "100-Steller (northern) sea lion",
    image: "stellar_sea_lion.png"
}, {
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
		rowSection = Titanium.UI.createTableViewSection({
			headerTitle: tableData[i].title,
			height: 100
			
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
	
	row.addEventListener("click", function(e){
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
			
			var speciesImage = Ti.UI.createImageView({
				image: "ui/assets/"+ e.row.data.image,
				width: "100%",
				top: 0
			});

			var speciesNumber = Ti.UI.createView({
				top: 10,
				height: Ti.UI.SIZE
			});			
			
			var speciesNumberText = Ti.UI.createLabel({
				top: 0,
				text: "Number of animals involved"
			});
			
			speciesNumber.add(speciesNumberText);

			var speciesCountLabel = Ti.UI.createLabel({
				top: 20,
				text: speciesCount,
				width: 50,
				height: 25,
			});
			
			
			
			speciesNumber.add(speciesCountLabel);

			var speciesCountAdd = Ti.UI.createLabel({
				text: "+",
				top: 20,
				height: 25,
				width: 50,
				right: 0,
				backgroundColor: "#f0f0f0"
			});				
			
			speciesCountAdd.addEventListener("touchend", function(e){
				speciesCount += 1;
				speciesCountLabel.text = speciesCount;
			});	

			var speciesCountMinus = Ti.UI.createLabel({
				text: "-",
				top: 20,
				height: 25,
				width: 50,
				left: 0,
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
				text: "Enter type of mortality/injury code (up to 3) "
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
	
			var speciesPhoto = Ti.UI.createView({
				top: 10,
				height: 50,
				backgroundColor: "yellow"
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
			
			speciesSave.addEventListener("click", function(e){
				Ti.App.fireEvent("newSpeciesAdded", {title: speciesName, count: speciesCount, injuries: speciesInjuryCode});
				win1.close();
			});				
			speciesView.add(speciesImage);	
			speciesView.add(speciesNumber);
			speciesView.add(speciesInjuryText);
			speciesView.add(speciesChecklist);
			speciesView.add(speciesPhoto);
			speciesView.add(speciesSave);				
			
			win1.openWindow(speciesWindow, {animated:true});
	});
	
	row.add(label);
	row.add(image);
	row.add(button);
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

