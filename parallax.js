/**
 * Parallax plugin 
 * Author: yehuya
 */

(function(){

    /**
    * add parallax plugin to Element.prototype of the window
    */
    Element.prototype.parallax = function(option){
        var elem = this;

        var newParallax = new parallax(elem, option);
        return newParallax;
    }

    /**
     * jquery support
     * !!!support only the first element in one call so pleas use only ID!!!
     */
    if(typeof jQuery !== undefined){
        jQuery.fn.parallax = function(option){
            var elem = this;
            
            var newParallax = new parallax(elem[0], option);
            return newParallax;
        }
    }

    /**
    * main function
    * @param Object (dom element)
    */
    function parallax(element, option){
        this.element = element;

        // default options
        var options = {
            distance: 20,
            transition: null,
            orientation: true,
            orientationStyle: {
                transition: 100,
                distance: 10
            }
        }

        this.options = extendOptions(options, option);
        this.move();
        return this;
    }

    /**
    * mouse movemant
    * @param FN (callback)
    * @return fn callback (with page X/Y)
    */
    parallax.prototype.mouse = function(callback){
        var mouseMove = function(e){
            callback(e.pageX, e.pageY);
        }

        window.addEventListener('mousemove', mouseMove);
    }

    /**
     * mobile device motion events
     * @param FN (callback)
     * @return callback (with device x/y/z)
     */
    parallax.prototype.motion = function(callback){
        var self = this;

        // if devicemotion event exists
        if(window.DeviceOrientationEvent){
            var devicemotion = function(e){
                var z = e.alpha;
                var y = Math.round(e.beta);
                var x = Math.round(e.gamma);
                
                if(x != null || y != null){
                    self.transition();
                    callback(x,y,z);
                }
            }

            window.addEventListener('deviceorientation', devicemotion);
        }
    }

    /**
     * parallax transition
     * @param Boolean (orientationStyle - transition)
     */
    parallax.prototype.transition = function(orientation){
        var elem = this.element;
        var regular = parseInt(this.options.transition);
        var orien = parseInt(this.options.orientationStyle.transition) || regular;

        var t = false;

        if(orientation && orien){
            t = "transform " + orien + "ms ease-out";
        }else if(regular){
            t = "transform " + regular + "ms ease-out";
        }

        if(t){
            elem.style.cssText += "transition:" + t + ';webkit-transition:' + t + ';';
        }
    }

    /**
    * the movement of the parallax
    */
    parallax.prototype.move = function(){
        var self = this;
        var elem = this.element;
        var distance = this.options.distance;
        var distanceOri = this.options.orientationStyle.distance || distance;

        var moveDistance = function(x, y){
            var x = (-x/distance) + 'px';
            var y = (-y/distance) + 'px';
            elem.style.cssText += "transform: translate3d(" + x + ", " + y + ", 0px); transform-style: preserve-3d; backface-visibility: hidden;";
        }

        // mouse 
        this.mouse(function(x, y){
            self.transition(false);
            moveDistance(x, y);
        });

        // device orientation
        if(this.options.orientation){
            this.motion(function(x,y,z){
                self.transition(true);
                moveDistance(x * distanceOri * 2, y * distanceOri * 2);
            });
        }
    }

    /**
     * combine two objects
     * @param Object (def - the default object)
     * @param Object (set - the new object)
     * @return Object (def)
     */
    var extendOptions = function(def, set){
        for(var s in set){
            if(def.hasOwnProperty(s)){
                def[s] = set[s];
            }
        }

        return def;
    }

})();
