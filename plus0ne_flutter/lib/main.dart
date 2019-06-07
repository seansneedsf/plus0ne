import 'package:flutter/material.dart';
import 'package:plus0ne/assets/themeData/themes.dart';
import './widgets/home.dart';

void main() {
    runApp(App());
}

class App extends StatefulWidget {
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
    bool isLightTheme = false;

    _swapTheme(){
        setState((){
            isLightTheme = !isLightTheme;
        });
    }
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            theme: Themes.getThemeFromKey(isLightTheme?ThemeKeys.DAY:ThemeKeys.NIGHT),
            home: Scaffold(
                appBar: AppBar(
                    title: IconButton( 
                        tooltip: 'Plus0ne Event',
                        icon: (isLightTheme ? new Image.asset("lib/assets/icons/day.png") : new Image.asset("lib/assets/icons/night.png")),
                        onPressed: (){},
                    ),
                    leading: IconButton(
                        tooltip: 'Plus0ne Event',
                        icon: new Image.asset("lib/assets/icons/logo.png"),
                        onPressed: (){_swapTheme();}
                    )
                ),
                body: Builder(
                    builder: (context)=>Home(isLightTheme, context),
                ),
            )
        );
    }
}