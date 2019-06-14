import 'package:flutter/material.dart';
import '../../globals/Model.dart';
import '../../globals/globals.dart' as global;
import '../stateless/message.dart';
import '../stateless/datetimeRow.dart';
import '../stateless/addressCard.dart';
import '../stateless/editableTitle.dart';
import '../stateless/inviteGuestInput.dart';
import "./eventImage.dart";
import '../../globals/APIs.dart' as API;
import '../../globals/Event.dart';
import 'dart:convert';

class Preview extends StatefulWidget {
  AppModel _model;
  BuildContext _context;
  Preview(this._model, this._context);
  State createState() => _PreviewState();
}

class _PreviewState extends State<Preview> {
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

  handleCancel() {
    print("Cancel event:" + widget._model.eventRef.date);
    var eventRef = widget._model.eventRef;
    Event event = new Event(eventRef.id, eventRef.name, eventRef.date,
        eventRef.time, eventRef.address, eventRef.email);
    widget._model.setEvent(event);
    Scaffold.of(widget._context).showSnackBar(SnackBar(
      content: Text('Event details are set back to original!'),
      action: SnackBarAction(label: 'Ok', onPressed: () {}),
    ));
  }

  handleUpdate() async {
    bool result = await API.updateEvent(widget._model.event);
    var eventRefNew = widget._model.event;
    Event eventRef = new Event(
        eventRefNew.id,
        eventRefNew.name,
        eventRefNew.date,
        eventRefNew.time,
        eventRefNew.address,
        eventRefNew.email);
    if (result) {
      widget._model.setEventRef(eventRef);
      Scaffold.of(widget._context).showSnackBar(SnackBar(
        content: Text('Event details are updated!'),
        action: SnackBarAction(label: 'Ok', onPressed: () {}),
      ));
    }
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
            height: MediaQuery.of(context).size.height,
            child: ListView(
              children: <Widget>[
                Message(true,
                    "Here’s your preview! You can customize it to your liking. Then, invite your first guest!"),
                EventImage(),
                DatetimeRow(widget._model),
                AddressCard(widget._model),
                EditableTitle(widget._model),
                Message(true,
                    "Epic hicking trip this weekend. Join soon as spots are filling up fast!"),
                InviteGuestInput(widget._model, widget._context),
                Container(
                    child: Opacity(
                  opacity: (widget._model.showSaveCancel ? 1 : 0),
                  child: Container(
                    padding: EdgeInsets.only(bottom: 24),
                    child: Flex(
                      direction: Axis.horizontal,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: <Widget>[
                        Container(
                          margin: EdgeInsets.only(right: 12),
                          child: RaisedButton(
                            child: Text('Save'),
                            onPressed: () {
                              this.handleUpdate();
                            },
                          ),
                        ),
                        Container(
                            margin: EdgeInsets.only(left: 12),
                            child: RaisedButton(
                              child: Text('Cancel'),
                              onPressed: () {
                                this.handleCancel();
                              },
                            ))
                      ],
                    ),
                  ),
                ))
              ],
            ),
          )),
    );
  }
}
