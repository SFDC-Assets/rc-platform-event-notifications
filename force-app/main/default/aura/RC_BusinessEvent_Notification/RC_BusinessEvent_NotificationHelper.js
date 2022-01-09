({
	controllerFile: function() {
        return "RC_BusinessEvent_NotificationController";
    },
    
    helperFile: function() {
        return "RC_BusinessEvent_NotificationHelper";
    },
    
    formatDateString: function(date) {    
        var m = date.getMinutes();
        var mins = '';
        if (mins < 10) { mins  = '0' + m; }
        var dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() 
        	+ " " + date.getHours() + ":" + mins;  
        
        //console.log(this.helperFile() + ' > formatDateString - dateString: ' + dateString);
        return dateString;
    },

    storeBusinessEventSeenBy: function(component, replayId, seenDate, seenDateString) {

        return new Promise((resolve, reject) => {

            console.log(this.helperFile() + ' > storeBusinessEventSeenBy - replayId: ' + replayId + ', seenDate: ' + seenDate + ', seenDateString: ' + seenDateString);

            var eventSeenBy = {};
            eventSeenBy.replayId = replayId;
            eventSeenBy.seenDate = seenDate;
            eventSeenBy.seenDateString = seenDateString;
            
            // Create the action
            var doAction = true;
            var action = component.get("c.storeBusinessEventSeenBy"); // method on the RC_BusinessEventController
			if (eventSeenBy != null) {
                action.setParams({
                    "eventSeenBy": eventSeenBy
                });
            } else {
                // no input parameters
                doAction = false;
            }
 
            if (doAction) {
                console.log(this.helperFile() + ' > storeBusinessEventSeenBy - params: ' + JSON.stringify(action.getParams()));

                // Add callback behavior for when response is received
                action.setCallback(this, function(response) {
                    console.log(this.helperFile() + ' > storeBusinessEventSeenBy - response: ' + response.getState())
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        // no op                      
                    }
                    else {
                        console.log(this.helperFile() + ' > storeBusinessEventSeenBy - failed with state: ' + state);
                        var error = new Error('storeBusinessEventSeenBy - failed with state: ' + state);
                        reject(error);
                    }

                    // promise resolved
                    resolve();
                });

                // Send action off to be executed
                $A.enqueueAction(action);

            } // end doAction

        }) // end promise

    }, // end storeBusinessEventSeenBy         
    
})