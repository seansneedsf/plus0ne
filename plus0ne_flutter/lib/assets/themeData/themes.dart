import 'package:flutter/material.dart';

enum ThemeKeys {DAY,NIGHT}

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}
//TODO: Replace all color to hex color

class Themes{
    static final ThemeData dayTheme = ThemeData(
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        primaryColor: HexColor("#55CCFF"),
        backgroundColor: HexColor("#EEEEEE"),
        primaryIconTheme: IconThemeData(
            color: HexColor("#55CCFF"),
            size: 12.0,
        ),
        accentIconTheme: IconThemeData(
            color: new Color(0xFFFFAA22),
            size: 12.0,
        ),
        textTheme: TextTheme(
            title: TextStyle(
                fontSize: 36.0,
                fontWeight: FontWeight.w600,
                color: new Color(0xFF000000),
                backgroundColor: HexColor("#55CCFF")
            ),
            subhead: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.w600,
                color: HexColor("#FFFFFF"),
                backgroundColor: HexColor("#555555")
            ),
            subtitle: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.w600,
                color: HexColor("#FFFFFF"),
                backgroundColor: HexColor("#EE4444")
            ),
            body1: TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.normal,
                color: new Color(0xFF000000),
            ),
            body2: TextStyle(
                fontSize: 10.0,
                fontWeight: FontWeight.normal,
                color: new Color(0xFF000000),
            ),
        ),
        dialogTheme: DialogTheme(
            backgroundColor: new Color(0xFF66BB66),
        ),
        brightness: Brightness.light,
    );

    static final ThemeData nightTheme = ThemeData(
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        primaryColor: HexColor("#000A23"),
        backgroundColor: HexColor("#000A23"),
        primaryIconTheme: IconThemeData(
            color: HexColor("#181F4E"),
            size: 12.0,
        ),
        accentIconTheme: IconThemeData(
            color: new Color(0xFFFFAA22),
            size: 12.0,
        ),
        textTheme: TextTheme(
            title: TextStyle(
                fontSize: 36.0,
                fontWeight: FontWeight.w600,
                color: new Color(0xFFFFFFFF),
                backgroundColor: HexColor("#000A23")
            ),
            subhead: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.w600,
                color: HexColor("#FFFFFF"),
                backgroundColor: HexColor("#555555")
            ),
            subtitle: TextStyle(
                fontSize: 24.0,
                fontWeight: FontWeight.w600,
                color: HexColor("#FFFFFF"),
                backgroundColor: HexColor("#EE4444")
            ),
            body1: TextStyle(
                fontSize: 12.0,
                fontWeight: FontWeight.normal,
                color: new Color(0xFFFFFFFF),
            ),
            body2: TextStyle(
                fontSize: 10.0,
                fontWeight: FontWeight.normal,
                color: new Color(0xFFFFFFFF),
            ),
        ),
        dialogTheme: DialogTheme(
            backgroundColor: new Color(0xFF0A6AA5),
        ),
        brightness: Brightness.light,
    );

    static ThemeData getThemeFromKey(ThemeKeys themeKey){
        switch(themeKey){
            case ThemeKeys.DAY:
                return dayTheme;
            case ThemeKeys.NIGHT:
                return nightTheme;
            default:
                return dayTheme;
        }
    }
}