import 'package:flutter/material.dart';
import 'package:plus0ne/assets/themeData/themes.dart';
import './widgets/home.dart';
import './widgets/stateful/preview.dart';
import './widgets/stateful/detail.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import 'package:scoped_model/scoped_model.dart';
import './globals/Model.dart';

void main() {
  runApp(App());
}

class App extends StatefulWidget {
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return ScopedModel<AppModel>(
        model: AppModel(),
        child: ScopedModelDescendant<AppModel>(
          builder: (context, child, model) => MaterialApp(
              theme: Themes.getThemeFromKey(
                  model.isLightTheme ? ThemeKeys.DAY : ThemeKeys.NIGHT),
              home: Scaffold(
                appBar: AppBar(
                    title: Center(
                      child: Container(
                        padding: EdgeInsets.only(right: 40),
                        child: IconButton(
                          tooltip: 'Plus0ne Event',
                          icon: (model.isLightTheme
                              ? Icon(FeatherIcons.sun, color: Color(0xFFFFFFFF))
                              : Icon(FeatherIcons.moon,
                                  color: Color(0xFFFFFFFF))),
                          onPressed: () {},
                        ),
                      ),
                    ),
                    leading: IconButton(
                        tooltip: 'Plus0ne Event',
                        icon: new Image.asset("lib/assets/icons/logo.png"),
                        onPressed: () {
                          model.switchTheme();
                        })),
                body: Builder(
                  builder: (context) => Home(model, context),
                ),
              )),
        ));
  }
}
