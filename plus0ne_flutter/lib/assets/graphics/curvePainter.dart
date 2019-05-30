import 'package:flutter/material.dart';
import 'dart:math';

class CurvePainter extends CustomPainter{
    final Color canvasColor,backgroundColor;
    final double width;
    final double height;
    CurvePainter({
        this.canvasColor,
        this.backgroundColor,
        this.width,
        this.height,
    });
    @override
    void paint(Canvas canvas, Size size){
        Rect rect = new Rect.fromLTRB(0.0, 0.0, width, height);
        final colorsArray = [canvasColor.withOpacity(1.00),backgroundColor.withOpacity(1.00)];
        final Gradient gradient = new LinearGradient(
            colors: colorsArray,
            begin: FractionalOffset.topCenter,
            end: FractionalOffset.bottomCenter,
        );
        /**
         * Layout for the base of the shape. Curve will go on top and cut out whatever is unnecessary.
         * We then compute the percentage of the space the points take up relative to the maximum width and height and
         * store those as points.
         */
        final List<Point> boxPath = [Point(375.0,5.0),Point(375.0,65.0),Point(0.0,65.0),Point(0.0,18.0)];
        final List<Point> boxDerivatives = new List();
        for(int i = 0; i < boxPath.length; i++){
            boxDerivatives.add(Point(boxPath.elementAt(i).x/width,boxPath.elementAt(i).y/height));
        }
        /**
         * Layout for the curve of the shape. Percentages are once again computed relative to the maximum width and height.
         */
        final List<Point> pointPath = [Point(28.25,9.11), Point(45.05,5.45), Point(62.53,3.09), Point(79.89,2.6), Point(96.29,4.54), Point(110.94,9.48), Point(123.0,18.0), Point(149.97,36.37), Point(182.0,49.5), Point(217.0,58.5), Point(248.88,57.87), Point(276.48,53.44), Point(301.0,43.0), Point(344.19,12.94), Point(362.8,3.84), Point(369.91,2.84), Point(375.0,5.0)];
        final List<Point> pathDerivatives = new List();
        for(int i = 0; i < pointPath.length; i++){
            pathDerivatives.add(Point(pointPath.elementAt(i).x/width,pointPath.elementAt(i).y/height));
        }
        /**
         * Converts the gradient to a Paint object.
         */
        final painter = new Paint()..shader = gradient.createShader(rect);

        var path = Path();
        /**
         *  Move the path pointer to our intended location, and begin drawing the frame of the shape.
         */
        for(int i = 0; i < boxDerivatives.length;i++){
            if(i == 0){
                path.moveTo(boxDerivatives.elementAt(i).x*size.width,boxDerivatives.elementAt(i).y*size.height);
            }
            else{
                path.lineTo(boxDerivatives.elementAt(i).x*size.width,boxDerivatives.elementAt(i).y*size.height);
            }
        }
        /**
         *  From the previous point we left off from we draw the Cubic Bezier curves and continue off at each point until we reach the end.
         */
        for(int i = 0; (i+2)<pathDerivatives.length; i+=2){
            path.cubicTo(pathDerivatives.elementAt(i).x*size.width, pathDerivatives.elementAt(i).y*size.height, pathDerivatives.elementAt(i+1).x*size.width, pathDerivatives.elementAt(i+1).y*size.height, pathDerivatives.elementAt(i+2).x*size.width, pathDerivatives.elementAt(i+2).y*size.height);
        }
        /**
         * Close the path.
         */
        path.close();
        /**
         * Draw the path using the color `painter`
         */
        canvas.drawPath(path,painter);
    }

    @override
    bool shouldRepaint(CustomPainter oldDelegate){
        return false;
    }
}