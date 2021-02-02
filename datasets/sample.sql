BEGIN TRANSACTION;
CREATE TABLE "RC_Business_Event__c" (
	id INTEGER NOT NULL, 
	"Action__c" VARCHAR(255), 
	"Event_Name__c" VARCHAR(255), 
	"Flow_API_Name__c" VARCHAR(255), 
	"Flow_Button_Label__c" VARCHAR(255), 
	"Link_Label__c" VARCHAR(255), 
	"Link_Target__c" VARCHAR(255), 
	"Link_URL__c" VARCHAR(255), 
	"Name" VARCHAR(255), 
	"Origin__c" VARCHAR(255), 
	"Record_Field_Label__c" VARCHAR(255), 
	"Record_Field_Value__c" VARCHAR(255), 
	"Record_ID__c" VARCHAR(255), 
	"Type__c" VARCHAR(255), 
	PRIMARY KEY (id)
);
INSERT INTO "RC_Business_Event__c" VALUES(1,'record_link','New Lead Created','','','','','','6743','Partner Portal','Name','Hanna Moore','00Q540000050NcuEAE','warning');
INSERT INTO "RC_Business_Event__c" VALUES(2,'message','New Lead Created','','','','','','6741','Partner Portal','','','','info');
INSERT INTO "RC_Business_Event__c" VALUES(3,'link','New Lead Created','','','Do Something','_blank','https://www.google.com/search?q=do+something','6742','Partner Portal','','','','success');
INSERT INTO "RC_Business_Event__c" VALUES(4,'flow','New Lead Created','BE_View_Lead','View Hanna Moore','','','','6745','Partner Portal','','','00Q540000050NcuEAE','error');
COMMIT;
