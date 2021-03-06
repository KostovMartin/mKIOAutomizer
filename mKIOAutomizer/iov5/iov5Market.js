(function() {
    var execTimeout = 5 * 1000;

    Executer.register({
        getTimeout: function() { return execTimeout; },
        exec: function(config) {
            if (config.isAutoBuyWoodEnabled) {
                pricesRequest("1", config.autoBuyWoodValue * 1,
                    config.isGoldRestrictionEnabled, config.goldRestrictionValue * 1);
            }
        }
    });

    Executer.register({
        getTimeout: function() { return execTimeout; },
        exec: function(config) {
            if (config.isAutoBuyIronEnabled) {
                pricesRequest("2", config.autoBuyIronValue * 1,
                    config.isGoldRestrictionEnabled, config.goldRestrictionValue * 1);
            }
        }
    });

    Executer.register({
        getTimeout: function() { return execTimeout; },
        exec: function(config) {
            if (config.isAutoBuyStoneEnabled) {
                pricesRequest("3", config.autoBuyStoneValue * 1,
                    config.isGoldRestrictionEnabled, config.goldRestrictionValue * 1);
            }
        }
    });

    var pricesRequest = function(resourseType, buyPrice,
        isGoldRestrictionEnabled, goldRestrictionValue) {
        Executer.post({
            n: "tradeTabs",
            p: ["N1", "N2", "N" + resourseType],
            f: function() {
                var market = document.implementation.createHTMLDocument();
                market.documentElement.innerHTML = this.responseText;
                var currentPriceHolder = market.querySelector("#buyForm > table > tbody > tr:nth-child(2) > td:nth-child(2)");
                var amount2BuyHolder = market.querySelector('.data-grid.espy tr td.numeral a');
                if (currentPriceHolder && amount2BuyHolder) {
                    var currentPrice = currentPriceHolder.innerHTML * 1;
                    var amount2Buy = amount2BuyHolder.innerHTML.replace(/&nbsp;/g, '').replace(" ", '') * 1;
                    var gold2Pay = amount2Buy * currentPrice;
                    var currentGold = getCurrentGold(market);

                    var isCorrect = !isNaN(gold2Pay);
                    var isPriceGood = currentPrice <= buyPrice * 1;
                    var isGoldEnough = gold2Pay <= currentGold;
                    var isGoldStatusOK = !isGoldRestrictionEnabled || goldRestrictionValue <= (currentGold - gold2Pay);
                    if (isCorrect && isPriceGood && isGoldEnough && isGoldStatusOK) {
                        buyResourceRequest(resourseType, amount2Buy, Math.round(gold2Pay));
                    }
                }
            }
        });
    };

    var getCurrentGold = function(market) {
        try {
            var item = market.querySelector(".numeral.ressource.gold");
            if (!item) {
                return 0;
            }
            return item
                .innerHTML
                .split("Tip3('")[1]
                .split("<br/>")[0]
                .replace(/&nbsp;/g, '')
                .replace(" ", '') * 1;
        } catch (e) {
            return 0;
        }
    };

    var buyResourceRequest = function(resourceType, amount, gold) {
        var xml = "<xjxobj><e><k>resId</k><v>S</v></e><e><k>resType</k><v>S" + resourceType + "</v></e><e><k>amountToBuy</k><v>N" + amount + "</v></e><e><k>submit</k><v>S</v></e></xjxobj>"
        Executer.post({
            n: "buyResources",
            p: ["N123456", "N1", xml, "N" + gold]
        });
    };

}());