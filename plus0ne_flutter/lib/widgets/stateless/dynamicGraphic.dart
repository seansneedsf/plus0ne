import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import 'package:plus0ne/assets/themeData/themes.dart';

class DynamicGraphic extends StatelessWidget{
    final Key key;
    final double offset;
    DynamicGraphic({
        this.key,
        this.offset,
    });
    @override
    Widget build(BuildContext context) {
        if(Theme.of(context) == Themes.dayTheme)
            return new Container(
                child: Stack(
                    children: <Widget>[
                        Container(
                            margin: new EdgeInsets.only(top: offset),
                            height: 0.2*MediaQuery.of(context).size.height,
                            decoration: BoxDecoration(
                                gradient: LinearGradient(
                                    begin: FractionalOffset.topCenter,
                                    end: FractionalOffset.bottomCenter,
                                    colors: [Theme.of(context).backgroundColor,Theme.of(context).primaryColor],
                                ),
                            ),
                        ),
                        Positioned(
                            top: 0 + offset,
                            left: 28,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: 3.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            )
                        ),
                        Positioned(
                            top: 43.0 + offset,
                            left: 64.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: 2.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 67.0 + offset,
                            left: 97.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 19.0 + offset,
                            left: 126.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: 4.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 55.0 + offset,
                            right: 156.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 15.0 + offset,
                            right: 125.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: 2.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 19.0 + offset,
                            right: 44.0,
                            child: Icon(
                                FeatherIcons.cloud,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 73.0 + offset,
                            right: 44.0,
                            child: Icon(
                                FeatherIcons.sun,
                                size: 4.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).accentIconTheme.color,
                            ),
                        ),
                    ],
                ),
            );
        else{
            return new Container(
                child: Stack(
                    children: <Widget>[
                        Container(
                            margin: new EdgeInsets.only(top: offset),
                            height: 0.2*MediaQuery.of(context).size.height,
                            decoration: BoxDecoration(
                                gradient: LinearGradient(
                                    begin: FractionalOffset.topCenter,
                                    end: FractionalOffset.bottomCenter,
                                    colors: [Theme.of(context).backgroundColor,Theme.of(context).primaryColor],
                                ),
                            ),
                        ),
                        Positioned(
                            top: 0 + offset,
                            left: 28,
                            child: Icon(
                                FeatherIcons.star,
                                size: 3.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            )
                        ),
                        Positioned(
                            top: 43.0 + offset,
                            left: 64.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: 2.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 67.0 + offset,
                            left: 97.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 19.0 + offset,
                            left: 126.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: 4.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 55.0 + offset,
                            right: 156.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 15.0 + offset,
                            right: 125.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: 2.0*Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 19.0 + offset,
                            right: 44.0,
                            child: Icon(
                                FeatherIcons.star,
                                size: Theme.of(context).primaryIconTheme.size,
                                color: Theme.of(context).primaryIconTheme.color,
                            ),
                        ),
                        Positioned(
                            top: 73.0 + offset,
                            right: 44.0,
                            child: Icon(
                                FeatherIcons.moon,
                                size: 4.0*Theme.of(context).primaryIconTheme.size,
                                color: new Color(0xFFFFFFFF),
                            ),
                        ),
                    ],
                ),
            );
        }
    }
}