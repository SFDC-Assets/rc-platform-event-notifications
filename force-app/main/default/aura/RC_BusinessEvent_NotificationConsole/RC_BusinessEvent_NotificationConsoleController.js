({

    // subscribes to the channel and displays a toast message.
    // specifies an error handler function for empApi
    init: function (component, event, helper) {
        console.log(helper.controllerFile() + ' > init');
                      
        component.set('v.subscription', null);
        component.set('v.notifications', []);

        // get empApi component.
        const empApi = component.find('empApi');

        // define an error handler function that prints the error to the console.
        const errorHandler = function (message) {
          console.error(helper.controllerFile() + ' > error ', JSON.stringify(message));
        };

        // register empApi error listener and pass in the error handler function.
        empApi.onError($A.getCallback(errorHandler));
        helper.subscribe(component, event, helper);
        
        // show toast
        var title = component.get('v.title');
        helper.displayToast(component, 'success', title + ' ready to receive notifications');
    },

    // clear notifications
    onClear: function (component, event, helper) {
        component.set('v.notifications', []);
    },

    // mute toast messages and unsubscribe/resubscribe to channel.
    onToggleMute: function (component, event, helper) {
        const isMuted = !(component.get('v.isMuted'));
        component.set('v.isMuted', isMuted);
        if (isMuted) {
          helper.unsubscribe(component, event, helper);
        } else {
          helper.subscribe(component, event, helper);
        }
        helper.displayToast(component, 'success', 'Notifications ' + ((isMuted) ? 'Muted' : 'Unmuted') + '.');
    },
    
    // replay previous events - unsubscribe and resubscribe to replay previous events
    onReplay: function (component, event, helper) {        
        // show spinner
        component.set("v.isLoading", true);

        // clear notifications
        component.set('v.notifications', []);
        
        // unsubscribe
        console.log(helper.controllerFile() + ' > onReplay - unsubscribe');
        helper.unsubscribe(component, event, helper);
        
        // get replayId
        helper.getReplayId(component)
            .then(() => {
                // promise resolved
                
                // subscribe w/ replayId
                var replayId = component.get("v.replayId");
                console.log(helper.controllerFile() + ' > onReplay - subscribe with replayId: ' + replayId);
                helper.subscribe_replay(component, event, helper);
            })
            .catch(err => {
                // promise rejected
                console.error(helper.controllerFile() + ' > onReplay - error: ' + err.message);
                
                // show error message
                //component.set("v.errorMessage", err.message);
            })        
    },

    navigateToRecord : function(component, event, helper) {

        var recordID = event.getSource().get("v.value");
        console.log(helper.controllerFile() + ' > navigateToRecord - recordID: ' + recordID);
                    
        helper.navigateToRecord(recordID);
        
   	}, // end navigateToRecord 
    
    navigateToRecordFromLink : function(component, event, helper) {
        
        console.log(helper.controllerFile() + ' > navigateToRecordFromLink - event: ' + event);
		var recordID = event.srcElement.id;
        console.log(helper.controllerFile() + ' > navigateToRecordFromLink - recordID: ' + recordID);
        
        helper.navigateToRecord(recordID);
        
   	}, // end navigateToRecordFromLink 
    
})