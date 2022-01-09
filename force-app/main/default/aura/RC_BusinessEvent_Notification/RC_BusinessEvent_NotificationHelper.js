({
	controllerFile: function() {
        return "RC_BusinessEvent_NotificationController";
    },
    
    helperFile: function() {
        return "RC_BusinessEvent_NotificationHelper";
    },
    
    formatDateString: function(date) {       
        var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() 
        	+ " " + date.getHours() + ":" + date.getMinutes();
        //console.log(this.helperFile() + ' > formatDateString - dateString: ' + dateString);
        return dateString;
    },
    
    
})