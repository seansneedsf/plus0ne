import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import "../../globals/globals.dart" as global;

class BotMessage extends StatelessWidget {
  final String text;
  BotMessage(this.text);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8.0),
      width: MediaQuery.of(context).size.width,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Stack(
            children: <Widget>[
              Container(
                // width: MediaQuery.of(context).size.width,
                child: Text(
                  text,
                  style: TextStyle(
                      color: Theme.of(context).textTheme.body2.color,
                      fontSize: Theme.of(context).textTheme.body2.fontSize,
                      backgroundColor:
                          Theme.of(context).textTheme.body2.backgroundColor),
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(5.0)),
                  color: Theme.of(context).dialogTheme.backgroundColor,
                ),
                padding: EdgeInsets.fromLTRB(
                    global.messageBoxPadding['left'],
                    global.messageBoxPadding['top'],
                    global.messageBoxPadding['right'],
                    global.messageBoxPadding['bottom']),
                margin: EdgeInsets.only(left: 21.0, top: 12.0),
              ),
              Positioned(
                left: 0,
                child: Container(
                  // margin: const EdgeInsets.only(left: 20.0),
                  child: CircleAvatar(
                    child:
                        Icon(FeatherIcons.userCheck, color: Color(0xFFFFFFFF)),
                    backgroundColor: Theme.of(context).primaryIconTheme.color,
                    radius: 22,
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
