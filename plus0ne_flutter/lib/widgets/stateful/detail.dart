import 'package:flutter/material.dart';
import '../../globals/Model.dart';
import '../../globals/globals.dart' as global;
import '../stateless/message.dart';
import '../stateless/datetimeRow.dart';
import '../stateless/addressCard.dart';
import '../stateless/editableTitle.dart';
import "./eventImage.dart";
import '../../globals/APIs.dart' as API;
import '../../globals/Event.dart';

class Detail extends StatefulWidget {
  AppModel _model;
  BuildContext _context;
  Detail(this._model, this._context);
  State createState() => _DetailState();
}

class _DetailState extends State<Detail> {
  @override
  void initState() {
    API.getEvent("81111e90-881e-11e9-8b9f-1fc89124a7c3").then((result) {
      Event event = new Event(result.id, result.name, result.date, result.time,
          result.address, result.email);
      Event eventRef = new Event(result.id, result.name, result.date,
          result.time, result.address, result.email);
      widget._model.setEvent(event);
      widget._model.setEventRef(eventRef);
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
          height: MediaQuery.of(context).size.height - 80,
          color: Theme.of(context).backgroundColor,
          child: Container(
            margin: EdgeInsets.only(
                left: global.pageMargin, right: global.pageMargin),
            child: Column(
              children: <Widget>[
                EventImage(),
                DatetimeRow(widget._model, false),
                AddressCard(widget._model, false),
                EditableTitle(widget._model, false),
                Message(true,
                    "Epic hicking trip this weekend. Join soon as spots are filling up fast!"),
              ],
            ),
          )),
    );
  }
}
