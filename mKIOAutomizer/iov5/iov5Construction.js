Executer.register({
    getTimeout: function() { return 2 * 60 * 1000; },
    exec: function(config) {
        if (config.isAutoCutShortEnabled) {
            Executer.$_$({ n: "allBuildingsCutShort" });
        }
    }
});