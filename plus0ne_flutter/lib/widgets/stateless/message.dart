import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';

class Message extends StatelessWidget{
    final String text;
    Message({
        this.text
    });

    @override
    Widget build(BuildContext context) {
        return new Container(
            margin: const EdgeInsets.symmetric(vertical: 15.0),
            child: new Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                    Stack(
                        children: <Widget>[
                            Container(
                                child: Text(
                                    text,
                                    style: new TextStyle(
                                        color: new Color(0xFFFFFFFF),
                                        fontSize: 12.0
                                    ),
                                ),
                                decoration: BoxDecoration(
                                    borderRadius: BorderRadius.all(Radius.circular(5.0)),
                                    color: Theme.of(context).dialogTheme.backgroundColor,
                                ),
                                padding: EdgeInsets.fromLTRB(25.0, 10.0, 31.0, 12.0),
                                margin: EdgeInsets.only(left: 42.0,right: 21.0, top: 10.0),
                            ),
                            Container(
                                margin: const EdgeInsets.only(left: 20.0),
                                child:CircleAvatar(
                                    child: new Icon(FeatherIcons.userCheck,color: new Color(0xFFFFFFFF)),
                                    backgroundColor: Theme.of(context).primaryColor,
                                    radius: 22,
                                ),
                            ),
                        ],
                    ),
                ],
            ),
        );
    }
}