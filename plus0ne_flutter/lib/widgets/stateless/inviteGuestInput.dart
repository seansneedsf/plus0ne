import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import '../../globals/globals.dart' as global;
import '../../globals/APIs.dart' as API;
import '../../globals/Model.dart';

class InviteGuestInput extends StatelessWidget {
  AppModel _appModel;
  BuildContext _context;
  final _formKey = GlobalKey<FormState>();
  TextEditingController _controller = new TextEditingController();
  InviteGuestInput(this._appModel, this._context);

  handleInviteGuest(email) {
    Pattern pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    RegExp regex = new RegExp(pattern);
    if (!regex.hasMatch(email)) {
      Scaffold.of(this._context).showSnackBar(SnackBar(
        content: Text('Please enter a valid email address!'),
        action: SnackBarAction(label: 'Ok', onPressed: () {}),
      ));
    } else {
      API.addGuest(this._appModel.event.id, email);
      Scaffold.of(this._context).showSnackBar(SnackBar(
        content: Text('You invited a guest to your event!'),
        action: SnackBarAction(label: 'Ok', onPressed: () {}),
      ));
    }
    _controller.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          Stack(
            children: <Widget>[
              Container(
                width: MediaQuery.of(context).size.width * 0.52,
                child: Card(
                  color: Colors.grey,
                  child: Container(
                      padding: EdgeInsets.fromLTRB(
                          global.messageBoxPadding['left'],
                          6,
                          global.messageBoxPadding['right'],
                          6),
                      child: Form(
                        key: _formKey,
                        child: TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: _controller,
                          decoration: InputDecoration(
                              hintText: "Invite your first guest!",
                              hintStyle: TextStyle(
                                color: Theme.of(context).textTheme.body1.color,
                                fontSize:
                                    Theme.of(context).textTheme.body1.fontSize,
                                // fontWeight: FontWeight.normal,
                              ),
                              border: InputBorder.none),
                          style: TextStyle(
                            color: Theme.of(context).textTheme.body1.color,
                            fontSize:
                                Theme.of(context).textTheme.body1.fontSize,
                            backgroundColor: Colors.grey,
                          ),
                          onFieldSubmitted: (email) {
                            print("Submit emai $email");
                            this.handleInviteGuest(email);
                          },
                        ),
                      )),
                ),
                margin: EdgeInsets.only(right: 22, top: 12),
              ),
              Positioned(
                right: 0,
                child: Container(
                  margin: EdgeInsets.only(),
                  child: CircleAvatar(
                    child:
                        Icon(FeatherIcons.userPlus, color: Color(0xFFFFFFFF)),
                    backgroundColor: Theme.of(context).primaryIconTheme.color,
                    radius: 22,
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}

// child: Container(
//                                     child: Card(
//                                         child: TextField(
//                                             decoration: InputDecoration(
//                                                 hintText: "Invite your first guest",
//                                                 hintStyle: new TextStyle(
//                                                     color: Theme.of(context).textTheme.subhead.color,
//                                                     fontSize: Theme.of(context).textTheme.subhead.fontSize,
//                                                     // fontWeight: FontWeight.normal,
//                                                 ),
//                                                 border: InputBorder.none
//                                             ),
//                                             style: TextStyle(
//                                                 color: Theme.of(context).textTheme.subhead.color,
//                                                 fontSize: Theme.of(context).textTheme.subhead.fontSize,
//                                                 backgroundColor: Colors.grey
//                                             ),
//                                         ),
//                                         margin: EdgeInsets.only(right: 22, top: 12),
//                                         color: Colors.grey,
//                                     ),
//                                 )
