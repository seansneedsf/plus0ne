class BotMessage {
  final String message;
  final String index;

  BotMessage(this.message, this.index);
  BotMessage._({this.message, this.index});
  factory BotMessage.fromJson(Map<String, dynamic> json) {
    return new BotMessage._(message: json["message"], index: json["index"]);
  }
}
