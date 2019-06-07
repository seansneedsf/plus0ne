import 'package:flutter/material.dart';

class CreateEventInput extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Container(
            color: Theme.of(context).backgroundColor,
            height: 68,
            alignment: Alignment(0, 0),
            child: Column(
                children: <Widget>[
                    Divider(height: 1, color: Colors.grey),
                    Padding(padding: EdgeInsets.only(top: 8),
                        child: Row(
                            children: <Widget>[
                                Expanded(
                                    child: TextField(
                                        decoration: InputDecoration(
                                            hintText: "Type or tell me what you want your event to be called.",
                                            hintStyle: new TextStyle(
                                                color: Theme.of(context).textTheme.body1.color,
                                                fontSize: Theme.of(context).textTheme.body1.fontSize,
                                                fontWeight: FontWeight.normal,
                                            ),
                                        ),
                                        style: TextStyle(
                                            color: Theme.of(context).textTheme.body1.color
                                        )
                                    ),
                                ),
                                ClipOval(
                                    child: Container(
                                        color: Theme.of(context).primaryIconTheme.color,
                                        child: IconButton(
                                            iconSize: Theme.of(context).primaryIconTheme.size,
                                            icon: new Image.asset("lib/assets/icons/microphone.png"),
                                            onPressed: (){
                                                //TODO: add user response to dialogs array
                                                print("Icon button clicked");
                                            },
                                        ),
                                    ),
                                )
                            ],
                        ),
                    )
                ],
            )
        );
    }
}