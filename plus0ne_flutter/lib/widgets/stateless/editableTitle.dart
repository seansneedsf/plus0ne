import 'package:flutter/material.dart';
import '../../globals/Model.dart';

class EditableTitle extends StatelessWidget {
  bool enableEdit;
  AppModel _appModel;
  EditableTitle(this._appModel, [this.enableEdit = true]);
  @override
  Widget build(BuildContext context) {
    return Container(
        color: Theme.of(context).backgroundColor,
        child: TextField(
          decoration: InputDecoration(
              border: InputBorder.none,
              hintText: "Event Name.",
              hintStyle: TextStyle(color: Colors.white)),
          controller: TextEditingController(text: this._appModel.name),
          style: TextStyle(
            fontSize: Theme.of(context).textTheme.title.fontSize,
            fontWeight: Theme.of(context).textTheme.title.fontWeight,
            color: Theme.of(context).textTheme.title.color,
            backgroundColor: Theme.of(context).textTheme.title.backgroundColor,
          ),
          enabled: this.enableEdit,
          // onChanged:(title){
          //     //TODO: update new event name
          //     print("New event name: "+title);
          // },
          onSubmitted: (title) {
            this._appModel.setEventName(title);
          },
        ));
  }
}
