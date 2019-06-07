import 'package:flutter/material.dart';

class TitleRow extends StatelessWidget {
    String title;
    bool alignCenter;
    BuildContext _context;
    TitleRow(this.title, this.alignCenter, this._context);

    @override
    Widget build(BuildContext context) {
        return GestureDetector(
            onTap: (){
                Scaffold.of(this._context).showSnackBar(
                    SnackBar(
                        content: Text('You clicked on the title bar!'),
                        action: SnackBarAction(
                            label: 'Ok', onPressed:(){}),
                    )
                );
            },
            child: Container(
                alignment: (this.alignCenter?Alignment(0.0, 0.0):Alignment(-1.0, 0.0)),
                width: MediaQuery.of(context).size.width,
                height: 68,
                decoration: BoxDecoration(
                    color: Theme.of(context).backgroundColor
                ),
                child:
                    Padding(
                        padding: EdgeInsets.only(left: 12),
                        child: Text(
                            this.title, 
                            style: TextStyle(
                                    fontSize: 36,
                                    fontWeight: FontWeight.w600,
                                    ),
                        ),
                    )
            ),
        );
    }
}