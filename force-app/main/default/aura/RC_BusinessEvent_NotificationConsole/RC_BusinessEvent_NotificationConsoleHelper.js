({
    // Client-side function that invokes the subscribe method on the empApi component.
    subscribe: function (component, event, helper) {

        // Get the empApi component.
        const empApi = component.find('empApi');

        // Get the channel from the attribute.
        const channel = component.get('v.channel');

        // Subscription option to get only new events.
        const replayId = -1;

        // Callback function to be passed in the subscribe call.
        // After an event is received, this callback prints the event
        // payload to the console. A helper method displays the message
        // in the console app.
        const callback = function (message) {
          	console.log('RC_BusinessEventConsoleHelper > event received: ' + JSON.stringify(message));
          	helper.onReceiveNotification(component, message);
        };

        // Subscribe to the channel and save the returned subscription object.
        console.log('RC_BusinessEventConsoleHelper > subscribing to channel: ' + channel);
        empApi.subscribe(channel, replayId, $A.getCallback(callback)).then($A.getCallback(function (newSubscription) {
            console.log('RC_BusinessEventConsoleHelper > subscribed to channel: ' + channel);
          	component.set('v.subscription', newSubscription);
        }));
    },

    // Client-side function that invokes the unsubscribe method on the empApi component.
    unsubscribe: function (component, event, helper) {

        // Get the empApi component.
        const empApi = component.find('empApi');

        // Get the channel from the component attribute.
        const channel = component.get('v.subscription').channel;

        // Callback function to be passed in the unsubscribe call.
        const callback = function (message) {
            console.log('RC_BusinessEventConsoleHelper > unsubscribed from channel: ' + message.channel);
        };

        // Unsubscribe from the channel using the subscription object.
        empApi.unsubscribe(component.get('v.subscription'), $A.getCallback(callback));
    },

    // Client-side function that displays the platform event message in the console app and displays a toast if not muted.
    onReceiveNotification: function (component, message) {

        // Extract notification from platform event
        var payload = message.data.payload;
        console.log('RC_BusinessEventConsoleHelper > onReceiveNotification - payload: ' + JSON.stringify(payload));
        var notification = {};
        notification.time = $A.localizationService.formatDateTime(message.data.payload.CreatedDate, 'HH:mm');
        notification.type = payload.Type__c;
        notification.name = payload.Event_Name__c;
        notification.origin = payload.Origin__c;
        notification.action = payload.Action__c;
        notification.recordId = payload.Record_ID__c;
        notification.recordFieldLabel = payload.Record_Field_Label__c;
        notification.recordFieldValue = payload.Record_Field_Value__c;
        notification.flowApiName = payload.Flow_API_Name__c;
        notification.flowButtonLabel = payload.Flow_Button_Label__c;
        notification.toastMessage = notification.name;        
        console.log('RC_BusinessEventConsoleHelper > notification: ' + JSON.stringify(notification));
    
        // Save notification in history
        const notifications = component.get('v.notifications');
        notifications.push(notification);
        component.set('v.notifications', notifications);
        
        // Display notification in a toast
        var toastMessage = notification.toastMessage;
        this.displayToast(component, notification.type, toastMessage);                                            
        
    },

    // Displays the given toast message.
    displayToast: function (component, type, message) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
          type: type,
          message: message
        });
        toastEvent.fire();
    },
    
    navigateToRecord : function(recordID) {

        console.log('RC_BusinessEventConsoleHelper > navigateToRecord - recordID: ' + recordID);
     
        var nav = $A.get("e.force:navigateToSObject");
        if (nav) {
            nav.setParams({
                "recordId": recordID,
                "slideDevName": "detail"
            });
            nav.fire(); 
        }
        
   	}, // end navigateToRecord 

    
    
})