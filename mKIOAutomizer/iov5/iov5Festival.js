﻿Executer.register({
    getTimeout: function() { return 2 * 60 * 1000; },
    exec: function(config) {
        if (config.isFestivalEnabled) {
            Executer.post({
                n: "setEfectType",
                p: ["N11", "N2"],
                f: function() {
                    Executer.post({ n: "setFestival", p: ["N992", "N1", "Sall"] });
                }
            });
        }
    }
});