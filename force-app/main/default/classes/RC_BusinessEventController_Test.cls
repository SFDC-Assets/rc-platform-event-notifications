@isTest
public class RC_BusinessEventController_Test {

    @isTest static void test_businessEvents() {
        
        System.debug('RC_BusinessEventController_Test >> test_businessEvents > start');
        
        Test.startTest();
        
        Integer numEvents = 3;
        for (Integer i = 0; i < numEvents; ++i) {
                                     
            RC_BusinessEventController.BusinessEventDetails e = new RC_BusinessEventController.BusinessEventDetails();
            e.replayId = String.valueOf(i);
            e.eventType = 'info';
            e.eventName = 'New Lead Created';
            e.origin = 'Partner';
            e.action = 'message';
            
            RC_BusinessEventController.storeBusinessEvent(e);
        }
        
        List<RC_Business_Event__c> events = [SELECT Id FROM RC_Business_Event__c];
        System.assertEquals(numEvents, events.size());
        
        Integer numPastEvents = 2;
        Integer replayId = RC_BusinessEventController.getReplayId(numPastEvents);
        System.assertEquals(numPastEvents - 2, replayId);
        
        RC_BusinessEventController_Test.sampleEvents();
        
        Test.stopTest();
        
        System.debug('RC_BusinessEventController_Test >> test_businessEvents > complete');
    }
    
    
    
    static public void sampleEvents() {
        
        // publish platform events
        List<Business_Event__e> events = new List<Business_Event__e>();
        
        Business_Event__e e = new Business_Event__e();
        e.Type__c = 'info';
        e.Event_Name__c = 'New Lead Created';
        e.Origin__c = 'Partner';
        e.Action__c = 'message';
        events.add(e);
        
        Business_Event__e e2 = new Business_Event__e();
        e2.Type__c = 'info';
        e2.Event_Name__c = 'New Lead Created';
        e2.Origin__c = 'Partner';
        e2.Action__c = 'record_link';
        e2.Record_ID__c = '00Q21000007iiL2EAI';
        e2.Record_Field_Label__c = 'Lead';
        e2.Record_Field_Value__c = 'Ryan Cox';
        events.add(e2);
        
        Business_Event__e e3 = new Business_Event__e();
        e3.Type__c = 'error';
        e3.Event_Name__c = 'Something\'s not good';
        e3.Origin__c = 'Partner';
        e3.Action__c = 'message';
        events.add(e3);
        
        Business_Event__e e4 = new Business_Event__e();
        e4.Type__c = 'info';
        e4.Event_Name__c = 'New Lead Created';
        e4.Origin__c = 'Partner';
        e4.Action__c = 'flow';
        e4.Record_ID__c = '00Q21000007iiL2EAI';
        e4.Record_Field_Label__c = 'Lead';
        e4.Record_Field_Value__c = 'Ryan Cox';
        e4.Flow_API_Name__c = 'BE_View_Lead';
        e4.Flow_Button_Label__c = 'Assign Lead: Ryan Cox';
        events.add(e4);
        
        List<Database.SaveResult> results = EventBus.publish(events);
        System.debug('publish event results: ' + results);
    }    
}