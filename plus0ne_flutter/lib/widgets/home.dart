import 'package:flutter/material.dart';
import "./stateless/dayNightImage.dart";
import "./stateless/titleRow.dart";
import './stateful/createEventInput.dart';
import "./stateful/conversations.dart";
import 'package:scoped_model/scoped_model.dart';
import '../globals/Model.dart';

class Home extends StatelessWidget {
  BuildContext _context;
  AppModel _appModel;
  Home(this._appModel, this._context);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: ScopedModel<AppModel>(
        model: this._appModel,
        child: Container(
          height: MediaQuery.of(context).size.height - 80,
          color: Theme.of(context).backgroundColor,
          child: Column(
            children: <Widget>[
              DayNightImage(this._appModel.isLightTheme),
              TitleRow(
                  (this._appModel.isLightTheme
                      ? "Good Afternoon!"
                      : "Good Evening!"),
                  true,
                  this._context),
              ScopedModelDescendant<AppModel>(
                builder: (context, child, model) => Conversations(model),
              ),
              ScopedModelDescendant<AppModel>(
                builder: (context, child, model) =>
                    CreateEventInput(model, context),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
