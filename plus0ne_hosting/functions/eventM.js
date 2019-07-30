const uuid = require('uuid');
module.exports = class Event{
    constructor(id=uuid.v1(), name="", startDateTime="", endDateTime="", address="", email="", guests=[]){
        this.id = id;
        this.name = name;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.address = address;
        this.email = email;
        this.guests = guests;
        this.created = new Date(Date.now());
        this.customImage = '';
        this.description = '';
    }
}
