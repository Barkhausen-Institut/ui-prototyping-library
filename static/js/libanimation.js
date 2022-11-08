'use strict';

function shiftXY(obj, xy) {
    var newTransform=`translate(${-xy.x}px, ${-xy.y}px)`;
    obj.style.transform += newTransform;
}

function shiftToZero(obj) {
    let bb = obj.getBBox();
    var xy = { x: bb.x + bb.width/2, y: bb.y + bb.height/2 };
    console.info("bb", bb);
    console.info("xy", xy);
    shiftXY(obj, xy);
}

class Playbook {
    tl = null;
    target = null;
    nextTimeOffset = '+=0';

    constructor() {
        this.tl = anime.timeline({
            autoplay: false,
            easing: 'linear'
        });
    }

    defaultTarget(objId) {
        this.target = objId;
        return this;
    }

    logLine(text) {
        return this;
        this._addAnimation(addLog(text));
        return this;
    }

    logResult(text, klass) {
        return this;
        this._addAnimation(resultLog(text, klass));
        return this;
    }

    clearLog() {
        this._addAnimation({
            begin: () => $("#log").empty(),
            duration: 200
        });
        return this;
    }

    alongPath(pathId, duration=5000, target=null, extra={}) {
        var myPath = anime.path(svgId(pathId));
        var myObj = this._getTarget(target);

        shiftToZero(myObj[0]);

        var data = {...extra,
            targets: myObj,
            translateX: myPath('x'),
            translateY: myPath('y'),
            easing: 'linear',
            duration: duration
        };
        console.info(data);
        this._addAnimation(data);
        return this;
    }

    fadeIn(target=null, duration=1000) {
        this._addAnimation({
            targets: this._getTarget(target),
            opacity: [0, 1],
            duration: duration
        });
        return this;
    }

    fadeOut(target=null, duration=1000) {
        this._addAnimation({
            targets: this._getTarget(target),
            opacity: [1, 0],
            duration: duration
        });
        return this;
    }

    stroke(color, target=null, duration=1000) {
        this._addAnimation({
            targets: this._getTarget(target),
            stroke: color,
            duration: duration
        });
        return this;
    }

    fill(color, target=null, duration=1000) {
        this._addAnimation({
            targets: this._getTarget(target),
            fill: color,
            duration: duration
        });
        return this;
    }

    setText(text, target=null) {
        let tg = this._getTarget(target)[0];
        this._addAnimation({
            begin: function() {
                var tspan = tg.getElementsByTagName("tspan")[0];
                tspan.innerHTML = text;
            },
            duration: 200
        });
        return this;
    }

    callback(fn, duration=1000) {
        this._addAnimation({
            begin: fn,
            duration: duration
        });
        return this;
    }

    delay(duration=1000) {
        this._addAnimation({
            duration: duration
        });

        return this;
    }

    pressButton(target) {
        this.fadeOut(target, 80);
        this.fadeIn(target, 80);

        return this;
    }

    onFinished(callback) {
        this.tl.loopComplete = callback;
        return this;
    }

    onBegin(callback) {
        this.tl.loopBegin = callback;
    }

    atTheSameTime(msBackward=0) {
        if (msBackward == 0)
            this.nextTimeOffset = '-=1000';
        else
            this.nextTimeOffset = `-=${msBackward}`;
        return this;
    }

    play() {
        this.tl.play();
    }

    _addAnimation(data) {
        this.tl.add(data, this.nextTimeOffset);
        this.nextTimeOffset = '+=0'
    }

    _getTargetName(target) {
        if (target == null)
            return this.target;
        else
            return target;
    }

    _getTarget(target) {
        if(typeof target === 'string' || target === null) {
            target = [target];
        }
        //let tg = svgId(this._getTargetName(target));
        let tg = target.map(x => svgId(this._getTargetName(x)));
        console.info(target, tg);
        return tg;
    }
}
