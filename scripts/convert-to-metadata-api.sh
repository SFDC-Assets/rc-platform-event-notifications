META_DATA_DIR=../mdapioutput
echo converting Salesforce DX project to meta-data api format
rm -rf $META_DATA_DIR
sfdx force:source:convert -r ../force-app/main/default -d $META_DATA_DIR