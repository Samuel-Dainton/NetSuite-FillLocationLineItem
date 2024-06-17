/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/log'], function(currentRecord, log) {

    // Function that is called when a field is changed
    function fieldChanged(context) {
        // Get the current record object from the context
        var rec = context.currentRecord;
        // Get the sublist ID that triggered the event
        var sublistName = context.sublistId;
        // Get the field ID that was changed
        var sublistFieldName = context.fieldId;

        // Check if the sublist is 'inventory' and the field is 'item'
        if (sublistName === 'inventory' && sublistFieldName === 'item') {
            // Get the value of the 'adjlocation' field from the record
            var location = rec.getValue({ fieldId: 'adjlocation' });
            // Log the location value to the script execution log
            log.debug('location', location);

            // Set the 'location' field on the 'inventory' sublist to the 'adjlocation' value
            rec.setCurrentSublistValue({
                sublistId: 'inventory', 
                fieldId: 'location', 
                value: location
            });

            // Set the 'adjustqtyby' field on the 'inventory' sublist to 1 (parsed as a float)
            rec.setCurrentSublistValue({
                sublistId: 'inventory', 
                fieldId: 'adjustqtyby', 
                value: parseFloat(1)
            });
        }
    }

    // Return the functions that should be exposed to SuiteScript
    return {
        fieldChanged: fieldChanged
    };

});
