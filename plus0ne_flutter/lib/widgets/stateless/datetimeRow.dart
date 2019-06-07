import 'package:flutter/material.dart';
import "./datetimeCard.dart";

class DatetimeRow extends StatelessWidget {
    String date;
    String time;
    String dateHint = 'Date';
    String timeHint = 'Start(end) time';
    DatetimeRow(this.date, this.time);
    @override
    Widget build(BuildContext context) {
        return Container(
            child: Row(
                children: <Widget>[
                    DateTimeCard(this.date, this.dateHint),
                    DateTimeCard(this.time, this.timeHint),
                ],
            ),
        );
    }
}