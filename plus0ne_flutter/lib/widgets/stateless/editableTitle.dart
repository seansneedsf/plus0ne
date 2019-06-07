import 'package:flutter/material.dart';

class EditableTitle extends StatelessWidget {
    String title;
    EditableTitle(this.title);
    @override
    Widget build(BuildContext context) {
        return Container(
            color: Theme.of(context).backgroundColor,
            child: TextField(
                decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: "Event Name.",
                    hintStyle: TextStyle(
                      color: Colors.white
                    )
                ),
                controller: TextEditingController(text: this.title),
                style: TextStyle(
                    fontSize: Theme.of(context).textTheme.title.fontSize,
                    fontWeight: Theme.of(context).textTheme.title.fontWeight,
                    color: Theme.of(context).textTheme.title.color,
                    backgroundColor: Theme.of(context).textTheme.title.backgroundColor,
                ),
                onChanged:(title){
                    //TODO: update new event name
                    print("New event name: "+title);
                },
            )
        );
    }
}