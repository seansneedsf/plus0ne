import 'package:http/http.dart' as http;
import 'dart:convert';
import 'globals.dart' as globals;
import 'BotMessage.dart';
import 'Event.dart';

Future getBotMessage(int index) async {
  print("-----------------getBotMessage--------------------");
  print('getBotMessage index ---> $index');
  var requestURL = globals.dialogURLPrefix + index.toString();
  var result = await http.get(requestURL);
  if (result.statusCode == globals.STATUS_OK) {
    var response = new BotMessage.fromJson(json.decode(result.body));
    var message = response.message;
    var conversationIndex = response.index;
    print("API Response message: " + message);
    print("API Response index: " + conversationIndex.toString());
    return response;
  }
  return <String, dynamic>{"index": 0, "message": ""};
}

Future getEvent(String guid) async {
  print("-----------------getEvent--------------------");
  var requestURL = globals.eventURLPrefix + guid;
  var result = await http.get(requestURL);
  if (result.statusCode == globals.STATUS_OK) {
    var eventLocal = new Event.fromJson(json.decode(result.body)['event']);
    print("API Response id: " + eventLocal.id);
    print("API Response name: " + eventLocal.name);
    print("API Response date: " + eventLocal.date);
    print("API Response time: " + eventLocal.time);
    print("API Response address: " + eventLocal.address);
    return eventLocal;
  }
  return null;
}

Future updateEvent(Event event) async {
  print("-----------------updateEvent--------------------");
  var eventGetURL = globals.eventURLPrefix + event.id;
  var eventPutURL = globals.eventURLPrefix;
  var result = await http.get(eventGetURL);
  if (result.statusCode == globals.STATUS_OK) {
    var eventServer = json.decode(result.body)['event'];
    Map<String, dynamic> eventLocal = new Map<String, dynamic>();
    eventLocal["id"] = eventServer["id"];
    eventLocal["name"] = event.name;
    eventLocal["date"] = event.date;
    eventLocal["time"] = event.time;
    eventLocal["address"] = event.address;
    //TODO: convert it to await then return event
    http.put(eventPutURL, body: eventLocal);
    return true;
  } else {
    print("Server error.");
  }
  return false;
}

Future createEvent(Event event) {
  print("Create event!!!!!");
  print(event.id);
  print(event.name);
  print(event.date);
  print(event.time);
  print(event.address);
  print(event.email);
  Map<String, dynamic> eventLocal = new Map<String, dynamic>();
  eventLocal["id"] = event.id;
  eventLocal["name"] = event.name;
  eventLocal["date"] = event.date;
  eventLocal["time"] = event.time;
  eventLocal["address"] = event.address;
  eventLocal["email"] = event.email;
  http.post(globals.eventURLPrefix, body: eventLocal);
}

Future addGuest(String guid, String email) async {
  print("-----------------addGuest--------------------");
  var guetPutURL = globals.eventGuestURL;
  Map<String, dynamic> guestDetail = new Map<String, dynamic>();
  guestDetail["id"] = guid;
  guestDetail["email"] = email;
  http.put(guetPutURL, body: guestDetail);
}
