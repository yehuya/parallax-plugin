/**
 * Parallax plugin 
 * Author: yehuya
 */

(function(){

    /**
    * add parallax plugin to Object.prototype of the window
    */
    Object.prototype.parallax = function(){
        var elem = this;
        
        // if JQUERY selector
        if(this.selector){
            elem = document.querySelector(this.selector);
        }

        var newParallax = new parallax(elem);
        return newParallax;
    }

    /**
    * main function
    * @param Object (dom element)
    */
    function parallax(element, options){
        this.element = element;
        this.parallaxMobile = false; // parallax mobile is false

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
        // if devicemotion event exists
        if(window.DeviceOrientationEvent){
            var devicemotion = function(e){
                var z = e.alpha;
                var y = Math.round(e.beta);
                var x = Math.round(e.gamma);
                
                if(x != null || y != null){
                    callback(x,y,z);
                }
            }

            window.addEventListener('deviceorientation', devicemotion);
        }
    }

    /**
     * parallax transition
     * @param Number (ms)
     * @param String (css property (background / opacity etc..))
     */
    parallax.prototype.transition = function(number, param){
        var elem = this.element;
        var number = parseInt(number);

        var t = param + " " + number + "ms ease-out";
        elem.style.cssText += "transition:" + t + ';webkit-transition:' + t + ';-webkit-transform: translateZ(0);transform: translateZ(0);';
    }

    /**
    * background parallax
    * @param Number (movement distance)
    * @param Number (speed - transition)
    */
    parallax.prototype.background = function(distance ,speed){
        var elem = this.element;

        if(speed){
            this.transition(speed, 'background-position');
        }

        var move = function(x, y){
            elem.style.backgroundPosition = (-x/distance) + 'px ' + (-y/distance) + 'px';
        }

        this.mouse(function(x, y){
            move(x, y);
        });

        if(this.parallaxMobile){
            this.motion(function(x,y,z){
                move(x * distance * 2, y * distance * 2);
            });
        }
    }

    /**
     * element parallax
     * @param Number (movement distance)
     * @param Number (speed - transition)
     */
    parallax.prototype.box = function(distance, speed){
        var elem = this.element;

        if(speed){
            this.transition(speed, 'margin');
        }

        var move = function(x, y){
            elem.style.marginTop = -y/distance + 'px';
            elem.style.marginLeft = -x/distance + 'px';
        }

        this.mouse(function(x, y){
            move(x, y);
        });

         if(this.parallaxMobile){
            this.motion(function(x,y,z){
                move(x * distance, y * distance);
            });
        }

    }

    parallax.prototype.mobile = function(distance, speed){
        this.parallaxMobile = true;

        return this;
    }

})();
