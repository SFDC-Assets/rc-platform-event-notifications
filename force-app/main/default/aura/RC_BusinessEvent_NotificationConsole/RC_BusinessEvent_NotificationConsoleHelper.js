({
    controllerFile: function() {
        return "RC_BusinessEvent_NotificationConsoleController";
    },

    helperFile: function() {
        return "RC_BusinessEvent_NotificationConsoleHelper";
    },
    
    // subscribe to the platform event channel
    subscribe: function (component, event, helper) {

        // get the empApi component.
        const empApi = component.find('empApi');

        // get the platform event channel
        const channel = component.get('v.channel');

        // subscription option to get only new events.
        const replayId = -1;

        // callback function to be passed in the subscribe call.
        // when an event is received, this callback prints the event event message to the component.
        const callback = function (message) {
          	console.log(helper.helperFile() + ' > event received: ' + JSON.stringify(message));
          	helper.onReceiveNotification(component, message);
        };

        // Subscribe to the channel and save the returned subscription object.
        console.log(helper.helperFile() + ' > subscribing to channel: ' + channel);
        empApi.subscribe(channel, replayId, $A.getCallback(callback)).then($A.getCallback(function (newSubscription) {
            console.log(helper.helperFile() + ' > subscribed to channel: ' + channel);
          	component.set('v.subscription', newSubscription);
        }));
    },
    
    // subscribe to the platform event channel from a replayId
    subscribe_replay: function (component, event, helper) {

        // get the empApi component.
        const empApi = component.find('empApi');

        // get the platform event channel
        const channel = component.get('v.channel');

        // subscription option to get only new events.
        const replayId = -1;

        // callback function to be passed in the subscribe call.
        // when an event is received, this callback prints the event event message to the component.
        const callback = function (message) {
          	console.log(helper.helperFile() + ' > event received: ' + JSON.stringify(message));
          	helper.onReceiveNotification(component, message);
        };

        // Subscribe to the channel and save the returned subscription object.
        console.log(helper.helperFile() + ' > subscribing to channel: ' + channel);
        empApi.subscribe(channel, replayId, $A.getCallback(callback)).then($A.getCallback(function (newSubscription) {
            console.log(helper.helperFile() + ' > subscribed to channel: ' + channel);
          	component.set('v.subscription', newSubscription);
        }));
    },

    // unsubscribe from the platform event channel
    unsubscribe: function (component, event, helper) {

        // get the empApi component.
        const empApi = component.find('empApi');

        // get the platform event channel
        const channel = component.get('v.subscription').channel;

        // callback function to be passed in the unsubscribe call.
        const callback = function (message) {
            console.log(helper.helperFile() + ' > unsubscribed from channel: ' + message.channel);
        };

        // unsubscribe from the channel using the subscription object.
        empApi.unsubscribe(component.get('v.subscription'), $A.getCallback(callback));
    },

    // displays the platform event message in the component and displays a toast if not muted.
    onReceiveNotification: function (component, message) {

        // extract notification from platform event
        //console.log(this.helperFile() + ' > onReceiveNotification - event: ' + JSON.stringify(message.data));
        var payload = message.data.payload;
        console.log(this.helperFile() + ' > onReceiveNotification - payload: ' + JSON.stringify(payload));
        var notification = {};
        notification.time = $A.localizationService.formatDateTime(payload.CreatedDate, 'HH:mm');
        notification.replayId = message.data.event.replayId;
        notification.type = payload.Type__c;
        notification.name = payload.Event_Name__c;
        notification.origin = payload.Origin__c;
        notification.action = payload.Action__c;
        notification.linkLabel = payload.Link_Label__c;
        notification.linkURL = payload.Link_URL__c;
        notification.linkTarget = payload.Link_Target__c;
        notification.recordId = payload.Record_ID__c;
        notification.recordFieldLabel = payload.Record_Field_Label__c;
        notification.recordFieldValue = payload.Record_Field_Value__c;
        notification.flowApiName = payload.Flow_API_Name__c;
        notification.flowButtonLabel = payload.Flow_Button_Label__c;
        notification.toastMessage = notification.name;        
        console.log(this.helperFile() + ' > notification: ' + JSON.stringify(notification));
    
        // save notification in history
        const notifications = component.get('v.notifications');
        notifications.push(notification);
        component.set('v.notifications', notifications);
        
        // display notification in a toast
        var toastMessage = notification.toastMessage;
        this.displayToast(component, notification.type, toastMessage);                                                    
    },

    // displays a toast message.
    displayToast: function (component, type, message) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
          type: type,
          message: message
        });
        toastEvent.fire();
    },
    
    // navigates to a record detail page
    navigateToRecord : function(recordID) {

        console.log(this.helperFile() + ' > navigateToRecord - recordID: ' + recordID);
     
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