/**
 * Parallax plugin 
 * Author: yehuda yadid
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
    function parallax(element){
        this.element = element;

        return this;
    }

    /**
    * mouse movemant
    * @return fn callback (with page X/Y)
    */
    parallax.prototype.mouse = function(callback){
        var mouseMove = function(e){
            callback(e.pageX, e.pageY);
        }

        window.addEventListener('mousemove', mouseMove);
    }

    /**
     * parallax transition
     * @param Number (ms)
     * @param String (css property (background / opacity etc..))
     */
    parallax.prototype.transition = function(number, param){
        var elem = this.element;
        var number = parseInt(number);

        var t = param + " " + number + "ms linear";
        elem.style.cssText += "transition:" + t + ';webkit-transition:' + t + ';';
    }

    /**
    * background parallax
    * @param Number (movemant distance)
    * @param Number (speed - transition)
    */
    parallax.prototype.background = function(distance ,speed){
        var elem = this.element;

        if(speed){
            this.transition(speed, 'background-position');
        }

        // elem.style.cssText += "background-size:" + (100 + distance) + "%;";

        var move = function(x, y){
            elem.style.backgroundPositionX = -x/distance + 'px';
            elem.style.backgroundPositionY = -y/distance + 'px';
        }

        this.mouse(function(x, y){
            move(x, y);
        });
    }

})();