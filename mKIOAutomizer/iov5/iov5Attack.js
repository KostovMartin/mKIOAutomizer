(function () {

    var sound = document.createElement('embed');
    sound.setAttribute('width', '1px');
    sound.setAttribute('height', '1px');
    sound.setAttribute('id', 'sound-elem');
    sound.setAttribute('src', 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');

    var doc1 = document.implementation.createHTMLDocument();

    var isUnderAttackPrev = false;

    var remove = function (obj) {
        if (obj) {
            obj.parentElement.removeChild(obj);
        }
    }

    var extractAttackingUnits = function (obj, maxCount) {
        var attackUnitsCount;
        try {
            attackUnitsCount = obj.querySelector("td:nth-child(4)").innerText.replace(/\s+/g, '') * 1
        } catch (e) {
            try {
                attackUnitsCount = obj.querySelector("td:nth-child(4) span").innerText.replace(/\s+/g, '') * 1
            } catch (e) {
                attackUnitsCount = maxCount + 1;
            }
        }
        return attackUnitsCount;
    }

    Executer.register({
        getTimeout: function () { return 15 * 1000; },
        exec: function (config) {
            if (config.isCheckForAttackEnabled) {
                var attackUnitsNotifyCount = config.attackUnitsCount * 1;

                Executer.post({
                    n: "listBlueFlag",
                    p: ["N1", "N1"],
                    f: function () {
                        doc1.documentElement.innerHTML = this.responseText;
                        remove(document.getElementById("sound-elem"));

                        var isUnderAttack = doc1.getElementsByClassName('incoming province').length !== 0;
                        if (isUnderAttack) {
                            document.body.style.background = 'red';
            
                            var attacks = doc1.querySelectorAll("tr[class='flagHaveMission']");
                            for (var i = 0; i < attacks.length; i++) {
                                var attackUnitsCount = extractAttackingUnits(attacks[i], attackUnitsNotifyCount);
                                if (attackUnitsCount >= attackUnitsNotifyCount) {
                                    document.body.appendChild(sound);
                                    break;
                                }
                            }
                        }

                        if (isUnderAttackPrev && !isUnderAttack) {
                            document.body.style.background = '';
                            remove(document.getElementById("sound-elem"));
                        }

                        isUnderAttackPrev = isUnderAttack;
                    }
                });
            }
        }
    });

}());