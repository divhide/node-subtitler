
var MOCHA = {
    
    node: {

        options: {
          reporter: 'spec',
          ui: 'bdd'
        },

        src: [
            'lib/**/*Spec.js'
        ]

    }
}

module.exports = MOCHA;