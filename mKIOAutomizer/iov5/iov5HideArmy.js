(function() {

    var tf = function (config) {
        var waitTime = 60000;

        if (config.hideArmy) {
            Executer.$_$({
                n: "change_current_province",
                p: ["N666", "N1", "Svillage.php", "N1"],
                f: function () {
                    Executer.$_$({
                        n: "premiumMoveAll",
                        p: ["N1"],
                        f: function () {
                            Executer.$_$({
                                n: "changeProvArrow",
                                p: ["N1", "N1"],
                                f: function () {
                                    Executer.$_$({
                                        n: "premiumMoveAll",
                                        p: ["N1"],
                                        f: function () {
                                            setTimeout(function () {
                                                Executer.$_$({
                                                    n: "flagBackArmy",
                                                    p: ["N2", "SmoveNow", "N1", "N9"],
                                                    f: function () {
                                                        setTimeout(function () {
                                                            tf(config);
                                                        }, 250);
                                                    }
                                                });
                                            }, waitTime);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    };

    Executer.registerExecOnce({
        exec: tf
    });

}());