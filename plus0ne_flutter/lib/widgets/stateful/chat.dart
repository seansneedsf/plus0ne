import 'package:flutter/material.dart';
import 'package:feather_icons_flutter/feather_icons_flutter.dart';
import 'package:plus0ne/widgets/stateless/message.dart';
import 'package:flutter_dialogflow/dialogflow_v2.dart';

class Chat extends StatefulWidget{
    Chat({Key key}): super(key:key);
    @override
    ChatState createState() => new ChatState();
}

class ChatState extends State<Chat>{
    final TextEditingController chatController = new TextEditingController();
    final List<Message> messages = <Message>[];
    FocusNode focusNode;

    void Response(query) async {
        chatController.clear();
        AuthGoogle authGoogle = await AuthGoogle(fileJson: "lib/assets/keys/plus0nefinalproject-eea746d71853.json").build();
        Dialogflow dialogflow =Dialogflow(authGoogle: authGoogle,language: Language.english);
        AIResponse response = await dialogflow.detectIntent(query);
        Message message = new Message(
            text: response.getMessage(),
        );
        setState(() {
            messages.insert(0, message);
        });
    }

    void handleSubmit(String text){
        chatController.clear();
        Message message = new Message(
            text: text,
        );
        setState((){
            messages.insert(0,message);
            FocusScope.of(context).requestFocus(new FocusNode());
        });
        Response(text);
    }

    Widget chatEnvironment(){
        return IconTheme(
            data: Theme.of(context).primaryIconTheme,
            child: new Container(
                margin: const EdgeInsets.symmetric(horizontal:8.0,vertical: 15.0),
                child: new Row(
                    children: <Widget>[
                        new Flexible(
                            fit: FlexFit.loose,
                            flex:2,
                            child: new TextField(
                                decoration: new InputDecoration(
                                    suffixIcon: new IconButton(
                                        icon: const Icon(Icons.arrow_upward),
                                        onPressed: ()=> handleSubmit(chatController.text),
                                    ),
                                    border: InputBorder.none,
                                    hintText: "Type or tell me what you want your event to be called.",
                                    hintStyle: new TextStyle(
                                        color: Colors.black,
                                        fontSize: 10.0,
                                        fontWeight: FontWeight.normal,
                                    ),
                                    fillColor: Colors.white,
                                    filled: true,
                                ),
                                maxLines: null,
                                controller: chatController,
                                onSubmitted: handleSubmit,
                                onTap: (){},
                            ),
                        ),
                        new Container(
                            margin: const EdgeInsets.symmetric(horizontal: 4.0),
                            child: new IconButton(
                                icon: new Icon(
                                    FeatherIcons.mic,
                                    color: Theme.of(context).primaryIconTheme.color,
                                ),
                                onPressed: null,
                            ),
                            decoration: BoxDecoration(
                                color: Theme.of(context).primaryColor,
                                borderRadius: BorderRadius.all(Radius.circular(25)),
                            ),
                        )
                    ],
                ),
            ),
        );
    }

    @override
    Widget build(BuildContext context) {
        return new Column(
            children: <Widget>[
                new Flexible(
                    child: ListView.builder(
                        padding: new EdgeInsets.all(8.0),
                        reverse: true,
                        itemBuilder: (_, int index) => messages[index],
                        itemCount: messages.length,
                    ),
                ),
                new Divider(
                    height: 1.0,
                ),
                new Container(
                    decoration: new BoxDecoration(
                        color: Theme.of(context).backgroundColor.withOpacity(1.0),
                    ),
                    child: chatEnvironment(),
                ),
            ],
        );
    }
}