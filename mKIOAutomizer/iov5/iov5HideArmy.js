(function () {

    var startMoveTime = Date.now();
    var maxMoveTimeMs = 5 * 60 * 1000;
    var getMoveTimeMs = function () { return Date.now() - startMoveTime; };

    var startProv = 1;
    var isMoving = false;

    var moveToCurrentProv = function (cb) {
        Executer.post({
            n: "premiumMoveAll",
            p: ["N1"],
            f: cb
        });
    };

    var changeProvince = function (provNumber, cb) {
        Executer.post({
            n: "change_current_province",
            p: ["N666", "N1", "Svillage.php", "N" + provNumber],
            f: cb
        });
    };

    var nextProvince = function (cb) {
        Executer.post({
            n: "changeProvArrow",
            p: ["N1", "N1"],
            f: cb
        });
    };

    var startMoving = function () {

        startMoveTime = Date.now();
        isMoving = true;

        moveToCurrentProv(function () {

            var doc1 = document.implementation.createHTMLDocument();
            doc1.documentElement.innerHTML = this.responseText;
            startProv = doc1.querySelector("#cycle-provinces .cycle-current").innerHTML * 1;

            nextProvince(function () {
                moveToCurrentProv(function () {
                    changeProvince(startProv, function () {

                        // verify if it is moving
                        var doc2 = document.implementation.createHTMLDocument();
                        doc2.documentElement.innerHTML = this.responseText;
                        isMoving = doc2.getElementsByClassName("outgoing province").length !== 0;
                    });
                });
            });
        });
    }

    Executer.register({
        getTimeout: function () { return 1000; },
        exec: function (config) {
            if (config.hideArmy) {
                if (!isMoving) {
                    startMoving();
                }
                else if (getMoveTimeMs() >= maxMoveTimeMs) {
                    isMoving = false;
                }
            }
        }
    });

}());