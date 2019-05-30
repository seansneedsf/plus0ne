import 'package:flutter/material.dart';
import 'package:plus0ne/widgets/stateful/createEvent.dart';
import 'package:plus0ne/assets/themeData/themes.dart';

void main() {
    runApp(MaterialApp(
        theme: Themes.getThemeFromKey(ThemeKeys.NIGHT),
        home: CreateEvent(),
    ));
}