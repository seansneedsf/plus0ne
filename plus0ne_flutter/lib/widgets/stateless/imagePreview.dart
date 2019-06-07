import 'package:flutter/material.dart';

class ImagePreview extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: Image.network("https://source.unsplash.com/450x180/?nature"),
    );
  }
}