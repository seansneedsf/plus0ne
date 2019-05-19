import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';

class DialogueBox extends StatelessWidget{
    final String text;
    DialogueBox({
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
                            new Container(
                                child: new Container(
                                    margin: const EdgeInsets.only(top:10.0,left: 42.0),
                                    decoration: BoxDecoration(

                                    ),
                                    child: new Text(
                                        text,
                                        style: new TextStyle(
                                            color: new Color(0xFFFFFFFF),
                                        ),
                                    ),
                                ),
                                decoration: BoxDecoration(
                                    color: new Color(0xFF66BB66),
                                ),
                            )
                        ],
                    ),
                ],
            ),
        );
    }
}