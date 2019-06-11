import 'package:flutter/material.dart';

class DayNightImage extends StatelessWidget {
  bool isLightTheme;
  DayNightImage(this.isLightTheme);

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: <Widget>[
        Container(
          width: MediaQuery.of(context).size.width,
          child: (isLightTheme
              ? Image.asset("lib/assets/graphics/sun.png")
              : Image.asset("lib/assets/graphics/moon.png")),
        ),
      ],
    ));
  }
}
