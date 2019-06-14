import 'package:flutter/material.dart';
import '../stateless/message.dart';
import '../../globals/globals.dart' as global;
import '../../globals/Model.dart';

class Conversations extends StatefulWidget {
  AppModel _model;
  Conversations(this._model);
  State createState() => _ConversationsState();
}

class _ConversationsState extends State<Conversations> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Container(
      margin:
          EdgeInsets.only(left: global.pageMargin, right: global.pageMargin),
      child: ListView(
          controller: widget._model.scrollableController,
          children: widget._model.conversations
              .map((conversation) =>
                  Message(conversation.isBot, conversation.message))
              .toList()),
    ));
  }
}
