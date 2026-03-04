const events = require('./05.events_config');
const Pessoa = require('./03.1.Pessoa');
const Emitter = require('events');

const emitter = new Emitter();

emitter.on(events.USER_CREATED,
    ()=>console.log("Foi criado um utilizador"));
emitter.on(events.USER_CHANGED,
    ()=>console.log("Foi alterad um utilizador"));
emitter.on(events.USER_DELETED,
    ()=>console.log("Foi eliminado um utilizador"));

const joão = new Pessoa("joão","gomes");
emitter.emit(events.USER_CREATED);

emitter.emit(events.USER_DELETED);