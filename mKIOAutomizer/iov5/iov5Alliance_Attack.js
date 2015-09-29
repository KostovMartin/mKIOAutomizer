Executer.register({
    getTimeout: function() { return 15 * 1000; },
    exec: function(config) {
        if (config.isCheckForAlliance_AttackEnabled) {
            var sound = document.createElement('embed');
            sound.setAttribute('width', '5px');
            sound.setAttribute('height', '5px');
            sound.setAttribute('src', 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');
            var currElements = document.getElementsByClassName('incoming castle');
            for (var i = 0; i < currElements.length; i++) {
                if (currElements[i].className == 'incoming castle') {
                    document.body.appendChild(sound);
                }
            };

            try {
                xajax_find_babysit(1, 1);
            } catch (e) {
                xajax.request({ xjxfun: 'find_babysit' }, { parameters: [1, 1] });
            }
        }
    }
});