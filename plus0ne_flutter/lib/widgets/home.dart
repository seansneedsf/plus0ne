import 'package:flutter/material.dart';
import "./stateless/dayNightImage.dart";
import "./stateless/titleRow.dart";
class Home extends StatelessWidget {
  bool isLightTheme;
  BuildContext _context;
  Home(this.isLightTheme, this._context);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
          DayNightImage(this.isLightTheme),
          TitleRow((this.isLightTheme?"Good Afternoon!":"Good Evening!"), false, this._context),
      ],
    );
  }
}