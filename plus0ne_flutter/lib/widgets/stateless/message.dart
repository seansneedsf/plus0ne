import 'package:flutter/material.dart';
import './botMessage.dart';
import './hostMessage.dart';
import '../../globals/conversation.dart';

class Message extends StatelessWidget {
  bool _isBot;
  String _message;
  Message(this._isBot, this._message);
  @override
  Widget build(BuildContext context) {
    return Container(
        child: _isBot ? BotMessage(this._message) : HostMessage(this._message));
  }
}
