Executer.register({
    getTimeout: function() { return 15 * 1000; },
    exec: function (config) {
        if (config.isCheckForEspionageEnabled) {
            Executer.post({
                n: "spiesSubTabs",
                p: ["N999", "N2"],
                f: function () {
                    var doc = document.implementation.createHTMLDocument();
                    doc.documentElement.innerHTML = this.responseText;
                    var isSpyIn = doc.querySelector(".spy-image") != null;
                    if (isSpyIn)
                    {
                        var sound = document.createElement('embed');
                        sound.setAttribute('width', '5px');
                        sound.setAttribute('height', '5px');
                        sound.setAttribute('src', 'http://www.soundrangers.com/demos/sirens/megaphone_siren_c_02.mp3');
                        sound.className = "sound-element";
                        document.body.appendChild(sound);
                        document.body.style.background = 'orange';
                    }
                    else
                    {
                        var elems = document.getElementsByClassName("sound-element");
                        for (var i = 0, len = elems.length; i < len; i++) {
                            if (elems[i] && elems[i].parentElement) {
                                elems[i].parentElement.removeChild(elems[i]);
                            }
                        }
                        document.body.style.background = '';
                    }
                }
            });
        }
    }
});