import 'package:scoped_model/scoped_model.dart';
import "conversation.dart";
import 'Event.dart';
import 'package:flutter/material.dart';

class AppModel extends Model {
  bool _isLightTheme = true;
  bool get isLightTheme => _isLightTheme;
  void switchTheme() {
    _isLightTheme = !_isLightTheme;
    notifyListeners();
  }

  ScrollController _scrollController = new ScrollController();
  ScrollController get scrollableController => _scrollController;

  List<Conversation> _conversations = new List<Conversation>();
  List<Conversation> get conversations => _conversations;
  int _conversationIndex = 0;
  int get conversationIndex => _conversationIndex;
  void pushConversation(
      Conversation conversation, ScrollController scrollController) {
    _conversations.add(conversation);
    Future.delayed(Duration(milliseconds: 100)).then((onValue) {
      scrollController.animateTo(scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
    });
    notifyListeners();
  }

  void setConversationIndex(index) {
    this._conversationIndex = index;
    notifyListeners();
  }

  Event _event = new Event('', '', '', '', '', '');
  Event _eventRef = new Event('', '', '', '', '', '');
  bool _showSaveCancel = false;
  Event get event => _event;
  set event(Event event) => _event = event;
  Event get eventRef => _eventRef;
  String get date => _event.date;
  String get time => _event.time;
  String get address => _event.address;
  String get name => _event.name;
  bool get showSaveCancel => _showSaveCancel;

  void _setShowSaveCancel() {
    if (_event == _eventRef) {
      _showSaveCancel = false;
    } else {
      _showSaveCancel = true;
    }
  }

  void setEvent(Event event) {
    print("Call set event##############");
    print("event date" + _event.date);
    print("event ref date" + _eventRef.date);
    _event = event;
    this._setShowSaveCancel();
    notifyListeners();
  }

  void setEventRef(Event eventRef) {
    print("Call set event REF@@@@@@@@");
    _eventRef = eventRef;
    this._setShowSaveCancel();
    notifyListeners();
  }

  void setEventAddress(String address) {
    _event.address = address;
    this._setShowSaveCancel();
    notifyListeners();
  }

  void setEventName(String name) {
    _event.name = name;
    this._setShowSaveCancel();
    notifyListeners();
  }
}
