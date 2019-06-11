import 'package:flutter/material.dart';
import '../../globals/conversation.dart';
import './message.dart';
import '../../globals/globals.dart' as global;
import '../../globals/Model.dart';

class Conversations extends StatelessWidget {
  AppModel _model;
  Conversations(this._model);
  ScrollController _scrollController = new ScrollController();

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Container(
      margin:
          EdgeInsets.only(left: global.pageMargin, right: global.pageMargin),
      child: ListView(
          controller: ScrollController(keepScrollOffset: true),
          children: this
              ._model
              .conversations
              .map((conversation) =>
                  Message(conversation.isBot, conversation.message))
              .toList()),
    ));
  }
}
