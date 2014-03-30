
var MOCHA = {
    
    node: {

        options: {
          reporter: 'spec',
          ui: 'bdd'
        },

        src: [
            '*Spec.js',
            'lib/**/*Spec.js'
        ]

    }
}

module.exports = MOCHA;