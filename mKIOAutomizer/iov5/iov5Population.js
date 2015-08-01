Executer.register({
    getTimeout: function() { return 2 * 60 * 1000; },
    exec: function(config) {
        var hire = function(resourceID, timeout) {
            setTimeout(function() {
                xajax.request({ xjxfun: 'fastHireWorkers' }, { parameters: [123199, resourceID, 'AllProv', 2, { 'hireAll': 1 }] });
            }, timeout);
        };
        if (config.isAutoHireEnabled) {
            hire(config.autoHireSettings[0], 0);
            hire(config.autoHireSettings[1], 1000);
            hire(config.autoHireSettings[2], 2000);
        }
    }
});