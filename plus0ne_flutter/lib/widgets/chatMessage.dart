import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';

const String _name = "Chat Bot";

class ChatMessage extends StatelessWidget{
    final String text;
    ChatMessage({
        this.text
    });

    @override
    Widget build(BuildContext context) {
    return new Container(
        margin: const EdgeInsets.symmetric(vertical: 10.0),
        child: new Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
                new Container(
                    margin: const EdgeInsets.only(left: 20.0),
                    child: new CircleAvatar(
                        child: new Icon(FeatherIcons.userCheck,color: new Color(0xFFFFFFFF)),
                        backgroundColor: new Color(0xFF55CCFF),
                    ),
                ),
                new Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                        new Text(_name,style: Theme.of(context).textTheme.subhead),
                        new Container(
                            margin: const EdgeInsets.only(top:5.0),
                            child: new Text(text),
                        )
                    ],
                ),
            ],
        ),
    );
  }
}