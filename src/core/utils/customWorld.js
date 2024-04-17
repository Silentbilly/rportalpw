const { setWorldConstructor, World, When } = require('@cucumber/cucumber')


class CustomWorld extends World {
    count = 0
    
    constructor(options) {
      super(options)
    }
    
    eat(count) {
      this.count += count
    }
}

setWorldConstructor(CustomWorld)