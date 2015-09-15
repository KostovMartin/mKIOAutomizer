Executer.register({
    getTimeout: function() { return 15 * 1000; },
    exec: function(config) {
        if (config.isCheckForAttackEnabled) {
            var sound = document.createElement('embed');
            sound.setAttribute('width', '5px');
            sound.setAttribute('height', '5px');
            sound.setAttribute('src', 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');
            var currElements = document.getElementsByClassName('incoming province');
            for (var i = 0; i < currElements.length; i++) {
                if (currElements[i].className == 'incoming province') {
                    document.body.appendChild(sound);
                    document.body.style.background = 'red';
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