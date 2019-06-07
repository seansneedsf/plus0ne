class Event{
    final String id;
    final String name;
    final String date;
    final String time;
    final String address;
    final String email;

    Event(this.id, this.name, this.date, this.time, this.address, this.email);
    Event._({this.id, this.name, this.date, this.time, this.address, this.email});
    factory Event.fromJson(Map<String, dynamic> event){
        return new Event._(
            id: event["id"], 
            name: event["name"], 
            date: event["date"], 
            time: event["time"], 
            address: event["address"],
            email: event["email"]
        );
    }
}