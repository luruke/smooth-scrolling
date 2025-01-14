import Smooth from '../../index'
import css from 'dom-css'

class Parallax extends Smooth {
    
    constructor(opt) {
        
        super(opt)

        this.createExtraBound()
        
        this.cache = null
        this.dom.divs = Array.prototype.slice.call(opt.divs, 0)
    }
    
    createExtraBound() {

        ['getCache', 'inViewport']
        .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    init() {

        super.init();
    }
    
    resize() {
        
        this.getCache()
        super.resize()
    }

    getCache() {

        this.cache = []

        this.dom.divs.forEach((el, index) => {
            
            const bounding = el.getBoundingClientRect()
            const bounds = {
                el: el,
                state: true,
                top: bounding.top,
                left: bounding.left,
                bottom: bounding.bottom,
                speed: el.getAttribute('data-speed') || '-1'
            }

            this.vars.bounding = bounding.bottom > this.vars.bounding ? bounding.bottom - window.innerHeight : this.vars.bounding;
            this.cache.push(bounds)
        })
    }
    
    run() {
        
        this.dom.divs.forEach(this.inViewport)
        
        super.run()
    }
    
    inViewport(el, index) {

        if(!this.cache) return;
        
        const cache = this.cache[index]
        const current = this.vars.current
        const transform = current * cache.speed
        const top = Math.round(cache.top + transform)
        const bottom = Math.round(cache.bottom + transform)
        const inview = bottom > -100 && top < this.vars.height + 100
        
        if(inview) {
            
            !cache.state && (document.body.appendChild(cache.el), cache.state = true);
            
            el.style.display = 'block'
            el.style[this.prefix] = this.getTransform(transform)
            
        } else {
            
            // el.style.display = 'none'
            // el.style[this.prefix] = 'none'
            cache.state && cache.el.parentNode && (cache.el.parentNode.removeChild(cache.el), cache.state = false);
        }
    }
}

export default Parallax