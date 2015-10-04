(function () {
    var hire = function (resourceID, cb) {
        Executer.post({
            n: "fastHireWorkers",
            p: ["N123199", "S" + resourceID, "SAllProv", "N2", "<xjxobj><e><k>hireAll</k><v>N" + 1 + "</v></e></xjxobj>"],
            f: cb
        });
    };

    Executer.register({
        getTimeout: function() { return 2 * 60 * 1000; },
        exec: function(config) {
            if (config.isAutoHireEnabled) {
                hire(config.autoHireSettings[0], function () {
                    hire(config.autoHireSettings[1], function () {
                        hire(config.autoHireSettings[2])
                    });
                });
            }
        }
    });

}());