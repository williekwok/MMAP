function Info() {
	var htmlContent = '<p> <em>About MMAP</em>';

	var infoView = Titanium.UI.createWebView({
		url: "ui/about.html",
    	backgroundColor:'#fff'
	});
	
	return infoView;
	
	
}

module.exports = Info;


