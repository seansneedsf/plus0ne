import 'package:flutter/material.dart';
import 'package:plus0ne/widgets/stateless/dialogueBox.dart';

class ChatBot extends StatefulWidget{
    ChatBot({Key key}): super(key:key);
    @override
    ChatBotState createState() => new ChatBotState();
}

class ChatBotState extends State<ChatBot>{
    final TextEditingController chatController = new TextEditingController();
    final List<DialogueBox> messages = <DialogueBox>[];

    void handleSubmit(String text){
        chatController.clear();
        DialogueBox message = new DialogueBox(
            text: text,
        );
        setState((){
            messages.insert(0,message);
        });
    }

    Widget chatEnvironment(){
        return IconTheme(
            data: new IconThemeData(color: Colors.blue),
            child: new Container(
                margin: const EdgeInsets.symmetric(horizontal:8.0),
                child: new Row(
                    children: <Widget>[
                        new Flexible(
                            fit: FlexFit.tight,
                            flex: 2,
                            child: new TextField(
                                decoration: new InputDecoration.collapsed(hintText: "Start typing ..."),
                                controller: chatController,
                                onSubmitted: handleSubmit,
                            ),
                        ),
                        new Container(
                            margin: const EdgeInsets.symmetric(horizontal: 4.0),
                            child: new IconButton(
                                icon: new Icon(Icons.send),

                                onPressed: ()=> handleSubmit(chatController.text),

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
                new Container(decoration: new BoxDecoration(
                    color: Theme.of(context).cardColor,
                ),
                    child: chatEnvironment(),)
            ],
        );
    }
}