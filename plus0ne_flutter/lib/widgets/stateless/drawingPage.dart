import 'package:flutter/material.dart';

class DrawingPage extends StatelessWidget{
    final CustomPainter painter;
    final double height;
    DrawingPage({
        this.painter,
        this.height,
    });
    @override
    Widget build(BuildContext context) {
        return Container(
            child: Center(
                child: Container(
                    height: height,
                    color: Theme.of(context).primaryColor,
                    width: MediaQuery.of(context).size.width,
                    child: CustomPaint(
                        painter: painter,
                    ),
                ),
            ),
        );
    }
}