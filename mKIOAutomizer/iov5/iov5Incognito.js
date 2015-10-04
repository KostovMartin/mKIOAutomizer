Executer.register({
    getTimeout: function() { return 30 * 1000; },
    exec: function(config) {
        if (config.isAutoIncognitoEnabled) {
            Executer.post({
                n: "settings",
                p: ["N1", "N0", "S", "Btrue"]
            });
        }
    }
});