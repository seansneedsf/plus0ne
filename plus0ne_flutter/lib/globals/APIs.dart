import 'package:http/http.dart' as http;
import 'dart:convert';
import 'globals.dart' as globals;
import 'BotMessage.dart';
import 'Event.dart';
Future getBotMessage(int index) async{
    print("-----------------getBotMessage--------------------");
    var requestURL = globals.dialogURLPrefix+index.toString();
    var result = await http.get(requestURL);
    if(result.statusCode == globals.STATUS_OK){
        var response = new BotMessage.fromJson(json.decode(result.body));
        var message = response.message;
        var conversationIndex = response.index;
        print("API Response message: "+message);
        print("API Response index: "+ conversationIndex.toString());
    }
}

Future getEvent(String guid) async{
    print("-----------------getEvent--------------------");
    var requestURL = globals.eventURLPrefix+guid; 
    var result = await http.get(requestURL);
    if(result.statusCode == globals.STATUS_OK){
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

Future updateEvent(String guid, Event event) async{
    print("-----------------updateEvent--------------------");
    var eventGetURL = globals.eventURLPrefix+guid; 
    var eventPutURL = globals.eventURLPrefix;
    var result = await http.get(eventGetURL);
    if(result.statusCode == globals.STATUS_OK){
        var eventServer = json.decode(result.body)['event'];
        Map<String, dynamic> eventLocal = new Map<String, dynamic>();
        eventLocal["id"] = eventServer["id"];
        eventLocal["name"] = event.name;
        eventLocal["date"] = event.date;
        eventLocal["time"] = event.time;
        eventLocal["address"] = event.address;
        //TODO: convert it to await then return event
        http.put(eventPutURL, body: eventLocal);
    }else{
        print("Server error.");
    }
}

Future addGuest(String guid, String email) async{
    print("-----------------addGuest--------------------");
    var guetPutURL = globals.eventGuestURL;
    Map<String, dynamic> guestDetail = new Map<String, dynamic>();
    guestDetail["id"] = guid;
    guestDetail["email"] = email;
    http.put(guetPutURL, body: guestDetail);
}