USER_ALIAS=hpe-sandbox
META_DATA_DIR=../mdapioutput
echo deploying metadata to org w/ USER_ALIAS = $USER_ALIAS
sfdx force:mdapi:deploy -d $META_DATA_DIR -w 100 -u $USER_ALIAS