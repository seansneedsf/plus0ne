import 'package:flutter/material.dart';

class EventImage extends StatefulWidget {
  State createState() => _EventImageState();
}

class _EventImageState extends State<EventImage> {
  bool _loading = true;
  Image _image = new Image.network(
      "https://source.unsplash.com/450x180/?nature",
      fit: BoxFit.cover);
  @override
  void initState() {
    _image.image.resolve(new ImageConfiguration()).addListener((_, __) {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      height: 200,
      child: _loading
          ? new Text(
              "Loading...",
              style: TextStyle(fontSize: 36),
            )
          : _image, //TODO: Replace text with loader
    );
  }
}
