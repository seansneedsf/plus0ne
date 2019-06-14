import 'package:flutter/material.dart';
import '../../globals/Model.dart';

class AddressCard extends StatelessWidget {
  bool _enableEdit;
  AppModel _appModel;
  AddressCard(this._appModel, [this._enableEdit = true]);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Card(
          color: Theme.of(context).textTheme.subtitle.backgroundColor,
          child: TextField(
            textAlign: TextAlign.center,
            decoration: InputDecoration(
                border: InputBorder.none,
                hintText: "Address",
                hintStyle: TextStyle(color: Colors.white)),
            controller: TextEditingController(text: this._appModel.address),
            style: TextStyle(
              fontSize: Theme.of(context).textTheme.subtitle.fontSize,
              fontWeight: Theme.of(context).textTheme.subtitle.fontWeight,
              color: Theme.of(context).textTheme.subtitle.color,
              backgroundColor:
                  Theme.of(context).textTheme.subtitle.backgroundColor,
            ),
            enabled: this._enableEdit,
            onChanged: (address) {
              //TODO: update new event name
              print("New address: $address");
            },
            onSubmitted: (address) {
              print('address is' + address);
              this._appModel.setEventAddress(address);
            },
          )),
    );
  }
}
