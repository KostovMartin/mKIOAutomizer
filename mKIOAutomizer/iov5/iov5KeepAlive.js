Executer.register({
    getTimeout: function () { return 10 * 1000; },
    getInitialTimeout: function () { return 10 * 1000; },
    exec: function (config) {
        if (config.isCheckForNotLoggedInEnabled) {
            Executer.$_$({
                n: "allBuildingsCutShort",
                f: function () {
                    var doc = document.implementation.createHTMLDocument();
                    doc.documentElement.innerHTML = this.responseText;
                    var logoutObj = doc.querySelector('[func="logoutAction"]');
                    if (!!logoutObj) {
                        var sound = document.createElement('embed');
                        sound.setAttribute('width', '5px');
                        sound.setAttribute('height', '5px');
                        sound.setAttribute('src', 'http://www.soundrangers.com/demos/vehicles/boat/submarine_surface_klaxon01.mp3');
                        document.body.appendChild(sound);
                    }
                }
            });
        }
    }
});