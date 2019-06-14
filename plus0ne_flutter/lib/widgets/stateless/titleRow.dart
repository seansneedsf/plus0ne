import 'package:flutter/material.dart';

class TitleRow extends StatelessWidget {
  String title;
  bool alignCenter;
  BuildContext _context;
  TitleRow(this.title, this.alignCenter, this._context);

  @override
  Widget build(BuildContext context) {
    return Container(
        alignment:
            (this.alignCenter ? Alignment(0.0, 0.0) : Alignment(-1.0, 0.0)),
        width: MediaQuery.of(context).size.width,
        height: 68,
        decoration: BoxDecoration(color: Theme.of(context).backgroundColor),
        child: Padding(
          padding: EdgeInsets.only(left: 0),
          child: Text(
            this.title,
            style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.w600,
                backgroundColor: Theme.of(context).backgroundColor),
          ),
        ));
  }
}
