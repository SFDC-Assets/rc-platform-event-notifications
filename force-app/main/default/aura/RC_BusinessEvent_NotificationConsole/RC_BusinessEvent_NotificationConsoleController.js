({

    // Subscribes to the channel and displays a toast message.
    // Specifies an error handler function for empApi
    init: function (component, event, helper) {
        console.log('RC_BusinessEvent_NotificationConsoleController > init');
                      
        component.set('v.subscription', null);
        component.set('v.notifications', []);

        // Get empApi component.
        const empApi = component.find('empApi');

        // Define an error handler function that prints the error to the console.
        const errorHandler = function (message) {
          console.error('RC_BusinessEvent_NotificationConsoleController > error ', JSON.stringify(message));
        };

        // Register empApi error listener and pass in the error handler function.
        empApi.onError($A.getCallback(errorHandler));
        helper.subscribe(component, event, helper);
        helper.displayToast(component, 'success', 'Ready to receive notifications.');
    },

    // Clear notifications in console app.
    onClear: function (component, event, helper) {
        component.set('v.notifications', []);
    },

    // Mute toast messages and unsubscribe/resubscribe to channel.
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

    navigateToRecord : function(component, event, helper) {

        var recordID = event.getSource().get("v.value");
        console.log('RC_BusinessEvent_NotificationConsoleController > navigateToRecord - recordID: ' + recordID);
                    
        helper.navigateToRecord(recordID);
        
   	}, // end navigateToRecord 
    
    navigateToRecordFromLink : function(component, event, helper) {
        
        console.log('RC_BusinessEvent_NotificationConsoleController > navigateToRecordFromLink - event: ' + event);
		var recordID = event.srcElement.id;
        console.log('RC_BusinessEvent_NotificationConsoleController > navigateToRecordFromLink - recordID: ' + recordID);
        
        helper.navigateToRecord(recordID);
        
   	}, // end navigateToRecordFromLink 
    
})