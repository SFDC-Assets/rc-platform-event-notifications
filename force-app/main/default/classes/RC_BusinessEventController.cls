public class RC_BusinessEventController {

    @AuraEnabled
    public static void storeBusinessEvent(BusinessEventDetails event) {
        System.debug('RC_BusinessEventController > storeBusinessEvent: ' + event);
        
		// check if this event record exists and only insert if doesn't, otherwise this was a replayed event
        List<RC_Business_Event__c> eList = [SELECT Id FROM RC_Business_Event__c WHERE Name = :event.replayId LIMIT 1];
        if (eList.size() == 0) {        
            // new event, so insert 
            RC_Business_Event__c e = new RC_Business_Event__c(Name = event.replayId);
            e.Action__c = event.action;
            e.Event_Name__c = event.eventName;
            e.Flow_API_Name__c = event.flowApiName;
            e.Flow_Button_Label__c = event.flowButtonLabel;
            e.Link_Label__c = event.linkLabel;
            e.Link_Target__c = event.linkTarget;
            e.Link_URL__c = event.linkURL;        
            e.Origin__c = event.origin;
            e.Record_Field_Label__c = event.recordFieldLabel;
            e.Record_Field_Value__c = event.recordFieldValue;
            e.Record_ID__c = event.recordId;
            e.Type__c = event.eventType;
            
            insert e;
        } 
       
    } // end storeBusinessEvent

    @AuraEnabled
    public static Integer getReplayId(Integer numPastEvents) {
        System.debug('RC_BusinessEventController > getReplayId - numPastEvents: ' + numPastEvents);
        if (numPastEvents == null || numPastEvents == 0) return -1;

        List<RC_Business_Event__c> events = [SELECT Name FROM RC_Business_Event__c ORDER BY Name DESC LIMIT :numPastEvents];
        System.debug('RC_BusinessEventController > getReplayId - events found: (' + events.size() + ') ' + events);
        
        Integer replayId = -1;
        Integer len = events.size();
        if (len > 0) {
            RC_Business_Event__c event = events.get(len-1);
            replayId = Integer.valueof(event.Name);
            replayId = (replayId - 1); // decrement 1 so the last replayId will be included in the replay
        }
        System.debug('RC_BusinessEventController > getReplayId - events found: ' + events);
        return replayId;
        
    } // end getReplayId
    
    // BusinessEventDetails - inner class
    public class BusinessEventDetails {
        
        @AuraEnabled
        public String replayId {get;set;}
        
        @AuraEnabled
        public String action {get;set;}

        @AuraEnabled
        public String eventName {get;set;}

        @AuraEnabled
        public String flowApiName {get;set;}

        @AuraEnabled
        public String flowButtonLabel {get;set;}

        @AuraEnabled
        public String linkLabel {get;set;}
        
        @AuraEnabled
        public String linkTarget {get;set;}

        @AuraEnabled
        public String linkURL {get;set;}

        @AuraEnabled
        public String origin {get;set;}
        
        @AuraEnabled
        public String recordFieldLabel {get;set;}
        
        @AuraEnabled
        public String recordFieldValue {get;set;}
        
        @AuraEnabled
        public String recordId {get;set;}
        
        @AuraEnabled
        public String eventType {get;set;}
    }
    
} // end RC_BusinessEventController