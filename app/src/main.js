/* globals define */
/* globals define */
define(function(require, exports, module) {
    var Engine     = require("famous/core/Engine");
    var VideoSurface    = require("famous/surfaces/VideoSurface");
    var EventHandler = require('famous/core/EventHandler');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');


    var mainContext = Engine.createContext();


    var videoSurface = new VideoSurface({
        autoplay: false,
        classes: ['controls']
    });

    var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    var video = document.querySelector('video');

    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true, video: true}, function(stream) {
            video.src = window.URL.createObjectURL(stream);
        }, errorCallback);
    } else {
            video.src = 'somevideo.webm'; // fallback.
        }

    var gSurface = new Surface({
        size:[100,50],
        content: 'test',
        classes: ['backfaceVisibility'],
        properties:{
        backgroundColor:'#FA5C00',
        textAlign: 'center',
        fontSize:'15px',
borderRadius:'10px'}
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        transform : function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });


    videoSurface.setContent(video.currentSrc);
    mainContext.add(videoSurface);
    mainContext.add(centerSpinModifier).add(gSurface);
});
