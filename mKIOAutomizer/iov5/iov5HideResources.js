(function () {

    var startMoveTime = Date.now();
    var maxMoveTimeMs = 1 * 60 * 1000;
    var getMoveTimeMs = function () { return Date.now() - startMoveTime; };

    var startProv = 1;
    var isMoving = false;
    var isMovingBackInProgress = false;

    var moveToCurrentProv = function (cb) {
        Executer.post({
            n: "transport_all",
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
            //debugger
            //var doc1 = document.implementation.createHTMLDocument();
            //doc1.documentElement.innerHTML = this.responseText;
            //startProv = doc1.querySelector("#cycle-provinces .cycle-current").innerHTML * 1;

            //nextProvince(function () {
            //    moveToCurrentProv(function () {
            //        changeProvince(startProv);
            //    });
            //});
        });
    };

    var moveBackSingle = function (id, cb) {
        Executer.post({
            n: "transport_back",
            p: ["N1", "N" + id],
            f: cb
        });
    };

    var moveBackAll = function (ids, cb) {
        if (ids.length === 0) {
            cb();
            return;
        }

        var id = ids.pop();
        moveBackSingle(id, function () {
            moveBackAll(ids, cb);
        });
    };

    var moveBack = function (cb) {
        Executer.post({
            n: "transport_screen",
            p: ["N1", "S", "N2"],
            f: function () {
                var doc2 = document.implementation.createHTMLDocument();
                doc2.documentElement.innerHTML = this.responseText;
                var moves = doc2.querySelectorAll(".tabstrip-content form");
                var moveIDs = [];
                for (var i = 0; i < moves.length; i++) {
                    var moveID = moves[i].id.replace(/\D/g, '') * 1;
                    moveIDs.push(moveID);
                }

                moveBackAll(moveIDs, cb);
            }
        });
    };

    var moveNow = function (cb) {
        Executer.post({
            n: "transport_now",
            p: ["N1", "N2132132"],
            f: cb
        });
    };

    Executer.register({
        getTimeout: function () { return 1000; },
        exec: function (config) {
            if (config.isHideResourcesEnabled) {
                if (!isMoving) {
                    startMoving();
                }
                else if (getMoveTimeMs() >= maxMoveTimeMs && !isMovingBackInProgress) {
                    isMovingBackInProgress = true;
                    moveBack(function () {
                        moveNow(function () {
                            isMoving = false;
                            isMovingBackInProgress = false;
                        });
                    });
                }
            }
        }
    });

}());