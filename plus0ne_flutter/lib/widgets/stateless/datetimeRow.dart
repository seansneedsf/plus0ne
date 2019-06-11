import 'package:flutter/material.dart';
import '../../globals/Model.dart';
import "../stateless/dateTimeCard.dart";

class DatetimeRow extends StatelessWidget {
  AppModel _appModel;
  String date;
  String time;
  String dateHint = 'Date';
  String timeHint = 'Start(end) time';
  bool _enableEdit;
  DatetimeRow(this._appModel, [this._enableEdit = true]);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Flex(
        direction: Axis.horizontal,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          DateTimeCard(this._appModel, this._appModel.date, 'date',
              this.dateHint, this._enableEdit),
          DateTimeCard(this._appModel, this._appModel.time, 'time',
              this.timeHint, this._enableEdit)
        ],
      ),
    );
  }
}
