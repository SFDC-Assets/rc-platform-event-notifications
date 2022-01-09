({
	init : function(component, event, helper) {	
        console.log(helper.controllerFile() + ' > init');
        
        //var notification = component.get('v.notification');
        //console.log(helper.controllerFile() + ' > init - notification: ' + JSON.stringify(notification));        
	},
    
    isSeenChanged: function(component, event, helper) {
        
        var isChecked = component.find("isSeenCheckbox").get("v.checked");        
        console.log(helper.controllerFile() + ' > isSeenChanged - isChecked: ' + isChecked);
        
        var now = new Date();
        var isSeenDate = helper.formatDateString(now);
        
		component.set("v.isSeen", isChecked);
        component.set("v.isSeenDate", isSeenDate);
         
	}, // end isSeenChanged
    
   
})