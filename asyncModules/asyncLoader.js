var emitter = require('../node_modules/events');

var dbModule = require('../database/Models');



class Signal extends emitter.EventEmitter{
    constructor(){ super() }             
}

module.exports={
    Signal:Signal,
    dbModules :dbModule
};