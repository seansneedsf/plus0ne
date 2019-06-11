import 'package:flutter/material.dart';
import '../../globals/globals.dart' as global;
import '../../globals/Model.dart';
import '../../globals/Event.dart';

class DateTimeCard extends StatelessWidget {
  String _detail;
  String _hint;
  bool _enableEdit;
  String _inputType;
  AppModel _appModel;
  Event _eventLocal;
  DateTimeCard(this._appModel, this._detail, this._inputType,
      [this._hint = '', this._enableEdit = true]);

  handleChange(detail) {
    this._eventLocal = this._appModel.event;
    switch (this._inputType) {
      case 'date':
        this._eventLocal.date = detail;
        break;
      case 'time':
        this._eventLocal.time = detail;
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width:
          (MediaQuery.of(context).size.width - (global.pageMargin * 2)) * 0.5,
      child: Card(
          color: Theme.of(context).textTheme.subhead.backgroundColor,
          child: TextField(
            textAlign: TextAlign.center,
            decoration: InputDecoration(
                border: InputBorder.none,
                hintText: this._hint,
                hintStyle: TextStyle(color: Colors.white)),
            controller: TextEditingController(text: this._detail),
            style: TextStyle(
              fontSize: Theme.of(context).textTheme.subhead.fontSize,
              fontWeight: Theme.of(context).textTheme.subhead.fontWeight,
              color: Theme.of(context).textTheme.subhead.color,
            ),
            enabled: this._enableEdit,
            onChanged: (detail) {
              this.handleChange(detail);
            },
            onSubmitted: (detail) {
              this._appModel.setEvent(this._eventLocal);
            },
          )),
    );
  }
}
