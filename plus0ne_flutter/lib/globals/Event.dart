class Event {
  String id;
  String name;
  String date;
  String time;
  String address;
  String email;

  Event(this.id, this.name, this.date, this.time, this.address, this.email);
  Event._({this.id, this.name, this.date, this.time, this.address, this.email});
  factory Event.fromJson(Map<String, dynamic> event) {
    return new Event._(
        id: event["id"],
        name: event["name"],
        date: event["date"],
        time: event["time"],
        address: event["address"],
        email: event["email"]);
  }
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is Event &&
          id == other.id &&
          name == other.name &&
          time == other.time &&
          date == other.date &&
          address == other.address &&
          email == other.email);
}
