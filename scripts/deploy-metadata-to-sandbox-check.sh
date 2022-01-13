USER_ALIAS=hpe-sandbox
META_DATA_DIR=../mdapioutput
echo checking metadata deployment to org w/ USER_ALIAS = $USER_ALIAS
sfdx force:mdapi:deploy -c -d $META_DATA_DIR -w 100 -u $USER_ALIAS