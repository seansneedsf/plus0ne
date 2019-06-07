import 'package:flutter/material.dart';
class AddressCard extends StatelessWidget {
  String address;
  AddressCard(this.address);

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
                    hintStyle: TextStyle(
                      color: Colors.white
                    )
                ),
                controller: TextEditingController(text: this.address),
                style: TextStyle(
                    fontSize: Theme.of(context).textTheme.subtitle.fontSize,
                    fontWeight: Theme.of(context).textTheme.subtitle.fontWeight,
                    color: Theme.of(context).textTheme.subtitle.color,
                    backgroundColor: Theme.of(context).textTheme.subtitle.backgroundColor,
                ),
                onChanged:(address){
                    //TODO: update new event name
                    print("New address: "+address);
                },
                )
        ),
    );
  }
}