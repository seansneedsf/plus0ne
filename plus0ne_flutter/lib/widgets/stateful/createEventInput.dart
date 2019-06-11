import 'package:flutter/material.dart';
import '../../globals/Model.dart';
import '../../globals/conversation.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import '../../globals/globals.dart' as global;
import '../../globals/APIs.dart' as API;

class CreateEventInput extends StatefulWidget {
  AppModel appModel;
  BuildContext _context;
  CreateEventInput(this.appModel, this._context);
  State createState() => _CreateEventInputState();
}

class _CreateEventInputState extends State<CreateEventInput> {
  final TextEditingController _controller = new TextEditingController();
  var focusNode = new FocusNode();
  @override
  void initState() {
    API.getEvent('').then((event) {
      widget.appModel.event = event;
    });
    var response = API.getBotMessage(widget.appModel.conversationIndex);
    response.then((response) {
      widget.appModel.pushConversation(Conversation(true, response.message),
          widget.appModel.scrollableController);
      widget.appModel.setConversationIndex(int.parse(response.index) + 1);
      response = API.getBotMessage(widget.appModel.conversationIndex);
      response.then((response) {
        widget.appModel.pushConversation(Conversation(true, response.message),
            widget.appModel.scrollableController);
        widget.appModel.setConversationIndex(int.parse(response.index) + 1);
      });
    });
  }

  handleUserInput(detail) async {
    if (widget.appModel.conversationIndex > 6) {
      _controller.clear();
      return;
    }
    widget.appModel.pushConversation(
        Conversation(false, detail), widget.appModel.scrollableController);
    var response = await API.getBotMessage(widget.appModel.conversationIndex);
    widget.appModel.pushConversation(Conversation(true, response.message),
        widget.appModel.scrollableController);
    widget.appModel.setConversationIndex(int.parse(response.index) + 1);
    _controller.clear();
    FocusScope.of(context).requestFocus(focusNode);
    print("User input: " + widget.appModel.conversationIndex.toString());
    if (widget.appModel.conversationIndex == 3) {
      print('Cobersation index 3' + detail);
      widget.appModel.event.name = detail;
    } else if (widget.appModel.conversationIndex == 4) {
      widget.appModel.event.date = detail;
    } else if (widget.appModel.conversationIndex == 5) {
      widget.appModel.event.time = detail;
    } else if (widget.appModel.conversationIndex == 6) {
      widget.appModel.event.address = detail;
    } else if (widget.appModel.conversationIndex == 7) {
      widget.appModel.event.email = detail;
      API.createEvent(widget.appModel.event);
      Scaffold.of(widget._context).showSnackBar(SnackBar(
        content: Text(
            'Congurations! You are all set for your event. Please check you email address to verify.'),
        action: SnackBarAction(label: 'Ok', onPressed: () {}),
      ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Theme.of(context).backgroundColor,
        height: 68,
        alignment: Alignment(0, 0),
        child: Column(
          children: <Widget>[
            Divider(height: 1, color: Colors.grey),
            Container(
              margin: EdgeInsets.only(
                left: global.pageMargin,
                right: global.pageMargin,
                top: 6,
              ),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: TextField(
                      focusNode: focusNode,
                      autofocus: true,
                      controller: _controller,
                      decoration: InputDecoration(
                          hintText:
                              "Type or tell me what you want your event to be called.",
                          hintStyle: new TextStyle(
                            color: Theme.of(context).textTheme.body1.color,
                            fontSize:
                                Theme.of(context).textTheme.body1.fontSize,
                            fontWeight: FontWeight.normal,
                          ),
                          border: InputBorder.none),
                      style: TextStyle(
                        color: Theme.of(context).textTheme.body1.color,
                        backgroundColor: Theme.of(context).backgroundColor,
                        fontSize: Theme.of(context).textTheme.body1.fontSize,
                      ),
                      onChanged: (detail) {
                        print("New event detail: $detail");
                      },
                      onSubmitted: (detail) {
                        this.handleUserInput(detail);
                      },
                    ),
                  ),
                  ClipOval(
                    child: Container(
                      color: Theme.of(context).primaryIconTheme.color,
                      child: IconButton(
                        icon: Icon(FeatherIcons.mic, color: Color(0xFFFFFFFF)),
                        onPressed: () {
                          //TODO: add user response to dialogs array
                          print("Icon button clicked");
                        },
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ));
  }
}
