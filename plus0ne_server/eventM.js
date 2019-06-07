const uuid = require('uuid');
module.exports = class Event{
    constructor(id=uuid.v1(), name="", date="", time="", address="", email="", guests=[]){
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.address = address;
        this.email = email;
        this.guests = guests;
        this.created = new Date(Date.now());
    }
}
