USER_ALIAS="rc-assets"
#USER_ALIAS="sfdx-platform-event-notifications__dev"
PERM_SET="rc_business_events"
echo assigning permission set $PERM_SET to USER_ALIAS = $USER_ALIAS
sfdx force:user:permset:assign -n $PERM_SET -u $USER_ALIAS