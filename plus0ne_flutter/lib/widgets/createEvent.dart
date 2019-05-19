import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';

import 'package:plus0ne/widgets/chatBot.dart';

class CreateEvent extends StatefulWidget{
    CreateEvent({Key key, this.title}) : super(key:key);
    final String title;
    @override
    CreateEventState createState() => new CreateEventState();
}

class CreateEventState extends State<CreateEvent> {
    @override
    Widget build(BuildContext context) {
        final String plus0neGraphics = "lib/resources/graphics/";
        final String plus0neIcons = "lib/resources/icons/";
        final int hours = 12;
        //final int hours = DateTime.now().hour;
        if (hours >= 18 || hours <= 6) {
            return new Scaffold(
                appBar: new AppBar(
                    leading: new IconButton(
                        icon: new Image.asset(plus0neIcons + "plus0ne_Logo.png"),
                        tooltip: 'Returns to the home menu',
                        onPressed: null,
                    ),
                    title: new Icon(FeatherIcons.sun, color: new Color(0xFF96C5E8)),
                    backgroundColor: new Color(0xFF000A23).withOpacity(0.0),
                    elevation: 0.0,
                ),
                body: new ListView(
                    children: <Widget>[
                        Container(
                            child: Image.asset(plus0neGraphics + "moonlight.png"),
                            decoration: BoxDecoration(
                                gradient: LinearGradient(
                                    begin: FractionalOffset.topCenter,
                                    end: FractionalOffset.bottomCenter,
                                    colors: [const Color(0xFF000A23), const Color(0xFF181F4D)],
                                ),
                            ),
                        ),
                        Container(
                            child: Image.asset(
                                plus0neGraphics + "moonlightHorizon.png"),
                            color: new Color(0xFF181F4D),
                        )
                    ],
                ),
                backgroundColor: new Color(0xFF000A23)
            );
        }
        else {
            return Scaffold(
                backgroundColor: new Color(0xFF55CCFF),
                body: Stack(
                    children: <Widget>[
                        new ListView(
                            children: <Widget>[
                                Container(
                                    child: Image.asset(plus0neGraphics + "sunlight.png"),
                                    margin: EdgeInsets.fromLTRB(0.0, 44.0, 0.0, 0.0),
                                    decoration: BoxDecoration(
                                        gradient: LinearGradient(
                                            begin: FractionalOffset.topCenter,
                                            end: FractionalOffset.bottomCenter,
                                            colors: [const Color(0xFF55CCFF), const Color(0xFFFFFFFF)],
                                        ),
                                    ),
                                ),
                                Container(
                                    child: Image.asset(
                                        plus0neGraphics + "sunlightHorizon.png"),
                                    color: new Color(0xFFFFFFFF),
                                ),
                                Container(
                                    child: Container(
                                        padding: EdgeInsets.all(10.0),
                                        alignment: Alignment.topCenter,
                                        color: new Color(0xFFC0C0C0),
                                        child: Text("Good Afternoon!",
                                            style: new TextStyle(
                                                fontSize: 36,
                                            ),
                                        ),
                                    ),
                                ),
                                Container(
                                    child: Container(
                                        color: new Color(0xFF66BB66),
                                        margin: EdgeInsets.fromLTRB(42.0,73.0,21.0,0.0),
                                        //decoration: BoxDecoration(
                                        //borderRadius: BorderRadius.all(Radius.circular(5.0)),
                                        //),
                                        //padding: EdgeInsets.fromLTRB(42.0,73.0, 21.0, 0.0),
                                    ),
                                ),
                            ],
                        ),
                        new Positioned(
                            top: 0.0,
                            left: 0.0,
                            right: 0.0,
                            child: AppBar(
                                leading: new IconButton(
                                    icon: new Image.asset(plus0neIcons + "plus0ne_Logo.png"),
                                    tooltip: 'Returns to the home menu',
                                    onPressed: null
                                ),
                                title: new Icon(FeatherIcons.moon, color: new Color(0xFFFFFFFF)),
                                backgroundColor: new Color(0xFF55CCFF).withOpacity(0.0),
                                elevation: 0.0,
                            ),
                        ),
                    ],
                ),
            );
        }
    }
}