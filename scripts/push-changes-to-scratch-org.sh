USER_ALIAS="${USER_ALIAS:-sfdx-platform-event-notifications__dev}"
echo pushing project code to scratch org w/ USER_ALIAS = $USER_ALIAS
sfdx force:source:push -f -u $USER_ALIAS