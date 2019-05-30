const uuid = require('uuid');
module.exports = class Event{
    constructor(Id=uuid.v1(), name="", date="", time="", location="", email="", guests=[]){
        this.Id = Id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.location = location;
        this.email = email;
        this.guests = guests;
        this.created = new Date(Date.now());
    }
}
