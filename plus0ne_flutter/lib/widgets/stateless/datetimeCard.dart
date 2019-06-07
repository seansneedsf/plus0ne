import 'package:flutter/material.dart';
class DateTimeCard extends StatelessWidget {
  String detail;
  String hint;
  DateTimeCard(this.detail, this.hint);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: MediaQuery.of(context).size.width/2,
        child: Card(
            color: Theme.of(context).textTheme.subhead.backgroundColor,
            child: TextField(
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: this.hint,
                    hintStyle: TextStyle(
                      color: Colors.white
                    )
                ),
                controller: TextEditingController(text: this.detail),
                style: TextStyle(
                    fontSize: Theme.of(context).textTheme.subhead.fontSize,
                    fontWeight: Theme.of(context).textTheme.subhead.fontWeight,
                    color: Theme.of(context).textTheme.subhead.color,
                ),
                onChanged:(detail){
                    //TODO: update new event name
                    print("New detail: "+detail);
                },
                )
        ),
    );
  }
}