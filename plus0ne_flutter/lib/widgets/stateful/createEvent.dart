import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import 'package:plus0ne/widgets/stateless/message.dart';
import 'package:plus0ne/widgets/stateful/chat.dart';
import 'package:plus0ne/widgets/stateless/drawingPage.dart';

class CreateEvent extends StatefulWidget{
    CreateEvent({Key key, this.title}) : super(key:key);
    final String title;
    @override
    CreateEventState createState() => new CreateEventState();
}

class CreateEventState extends State<CreateEvent> {
    @override
    Widget build(BuildContext context) {
        final String plus0neGraphics = "lib/assets/graphics/";
        final String plus0neIcons = "lib/assets/icons/";
        return Scaffold(
            backgroundColor: Theme.of(context).backgroundColor,
            body: Stack(
                children: <Widget>[
                    new ListView(
                        children: <Widget>[
                            Container(
                                margin: EdgeInsets.only(top: 48),
                                child: Image.asset(plus0neGraphics +"moonlight.png"),
                                decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                        colors: [new Color(0xFF000A23),new Color(0xFF181F4D)],
                                        begin: FractionalOffset.topCenter,
                                        end: FractionalOffset.bottomCenter,
                                    ),
                                ),
                            ),
                            Container(
                                color: Theme.of(context).primaryColor,
                                child: DrawingPage(
                                    height: 65,
                                ),
                            ),
                            Container(
                                child: Container(
                                    padding: EdgeInsets.all(10.0),
                                    alignment: Alignment.topCenter,
                                    color: Theme.of(context).backgroundColor,
                                    child: Text("Good Day!",
                                        style: Theme.of(context).textTheme.title,
                                    ),
                                ),
                            ),
                            Container(
                                child: Message(
                                    text:"Type hello to wake up the bot"
                                ),
                            ),
                        ],
                    ),
                    new Chat(),
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
                            title: new Icon(
                                FeatherIcons.moon,
                                size: 2.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color
                            ),
                            backgroundColor: new Color(0xFF55CCFF).withOpacity(0.0),
                            elevation: 0.0,
                        ),
                    ),
                ],
            ),
        );
    }
}