(function() {
    var attackStatusID = 'check-for-attack-status';
    var espionageStatusID = 'check-for-espionage';
    var notLoggedInStatusID = 'check-for-not-logged-in';
    var cutShortStatusID = 'auto-cut-short-status';
    var festivalStatusID = "festival-gradual-effect";
    var autoHireStatusID = 'auto-hire-status';
    var autoIncognitoStatusID = 'auto-incognito';
    var hideArmyID = 'hide-army';

    var goldStatusID = 'gold-status';
    var goldValueID = 'gold-value';
    var woodStatusID = 'auto-buy-wood-status';
    var woodValueID = 'auto-buy-wood-value';
    var ironStatusID = 'auto-buy-iron-status';
    var ironValueID = 'auto-buy-iron-value';
    var stoneStatusID = 'auto-buy-stone-status';
    var stoneValueID = 'auto-buy-stone-value';

    var purchasesHistoryBodyID = 'purchases-history';

    var saveButtonID = 'save-button';
    var saveStatusHolderID = 'save-button-status';

    var byID = function(id) {
        return document.getElementById(id);
    };

    var saveOptions = function() {
        chrome.storage.sync.set({
            isCheckForAttackEnabled: byID(attackStatusID).checked,
            isCheckForEspionageEnabled: byID(espionageStatusID).checked,
            isCheckForNotLoggedInEnabled: byID(notLoggedInStatusID).checked,
            isAutoCutShortEnabled: byID(cutShortStatusID).checked,
            isFestivalEnabled: byID(festivalStatusID).checked,
            isAutoHireEnabled: byID(autoHireStatusID).checked,
            isAutoIncognitoEnabled: byID(autoIncognitoStatusID).checked,
            autoHireSettings: setAutoHireSettings(),
            hideArmy: byID(hideArmyID).checked,

            isGoldRestrictionEnabled: byID(goldStatusID).checked,
            goldRestrictionValue: byID(goldValueID).value,
            isAutoBuyWoodEnabled: byID(woodStatusID).checked,
            autoBuyWoodValue: byID(woodValueID).value,
            isAutoBuyIronEnabled: byID(ironStatusID).checked,
            autoBuyIronValue: byID(ironValueID).value,
            isAutoBuyStoneEnabled: byID(stoneStatusID).checked,
            autoBuyStoneValue: byID(stoneValueID).value
        }, function() {
            var status = byID(saveStatusHolderID);
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    };

    var restoreOptions = function() {
        chrome.storage.sync.get(defaultOptions, function (items) {
            byID(attackStatusID).checked = items.isCheckForAttackEnabled;
            byID(espionageStatusID).checked = items.isCheckForEspionageEnabled;
            byID(notLoggedInStatusID).checked = items.isCheckForNotLoggedInEnabled;
            byID(cutShortStatusID).checked = items.isAutoCutShortEnabled;
            byID(festivalStatusID).checked = items.isFestivalEnabled;
            byID(autoHireStatusID).checked = items.isAutoHireEnabled;
            byID(autoIncognitoStatusID).checked = items.isAutoIncognitoEnabled;
            buildAutoHireSettings(items.autoHireSettings);
            byID(hideArmyID).checked = items.hideArmy;

            byID(goldStatusID).checked = items.isGoldRestrictionEnabled;
            byID(goldValueID).value = items.goldRestrictionValue;
            byID(woodStatusID).checked = items.isAutoBuyWoodEnabled;
            byID(woodValueID).value = items.autoBuyWoodValue;
            byID(ironStatusID).checked = items.isAutoBuyIronEnabled;
            byID(ironValueID).value = items.autoBuyIronValue;
            byID(stoneStatusID).checked = items.isAutoBuyStoneEnabled;
            byID(stoneValueID).value = items.autoBuyStoneValue;
        });
    };
    var setAutoHireSettings = function() {
        var result = [];
        var data = document.querySelectorAll('#province-all .draggableItem');
        for (var j = 0; j < data.length; j++) {
            result.push(data[j].getAttribute('data-resource-type'));
        }
        return result;
    };

    var buildAutoHireSettings = function(autoHireSettings) {
        var html = [];
        html.push('<div id="province-all">');
        html.push('<span class="left header">Order:</span>');
        for (var k in autoHireSettings) {
            var resource = autoHireSettings[k];
            html.push('<span class="draggableItem icon r_' + resource + '" draggable="true" data-resource-type="' + resource + '" data-duration="3"></span>');
        }
        html.push('</div>');
        html = html.join("");
        document.querySelector("#auto-hire-population-provinces-holder").innerHTML = html;

        var items = document.querySelectorAll('.draggableItem');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener('dragstart', handleDragStart, false);
            items[j].addEventListener('drop', handleDrop, false);
            items[j].addEventListener('dragover', handleDragOver, false);
        }
    };

    var oldNumeric = null;

    var handbleNumberKeyDown = function() {
        if (!isNaN(this.value)) {
            oldNumeric = this.value;
        }
    };

    var handbleNumberKeyUp = function () {
        var max = this.getAttribute('data-numeric-max') * 1;
        if (isNaN(this.value)) {
            this.value = oldNumeric;
        } else if (this.value * 1 > max) {
            this.value = max;
        } else if (this.value * 1 < 0) {
            this.value = 0.01;
        }
    };

    var draggedItem = null;

    var handleDragStart = function() {
        draggedItem = this;
    };
    var handleDragOver = function(e) {
        e.preventDefault();
        return false;
    };
    var handleDrop = function(e) {
        e.stopPropagation();

        if (draggedItem != this) {
            var parent = this.parentNode,
                insertionPoint,
                elem = this;

            do {
                elem = elem.nextSibling;
            } while (elem && elem !== draggedItem);

            insertionPoint = elem ? this : this.nextSibling;
            parent.insertBefore(draggedItem, insertionPoint);
            draggedItem = null;
        }

        return false;
    };
    document.addEventListener('DOMContentLoaded', function() {
        restoreOptions();
        var numeric = document.querySelectorAll("input.numeric");
        for (var i = 0; i < numeric.length; i++) {
            numeric[i].addEventListener('keydown', handbleNumberKeyDown);
            numeric[i].addEventListener('keyup', handbleNumberKeyUp);
        }
    });
    byID(saveButtonID).addEventListener('click', saveOptions);
}());