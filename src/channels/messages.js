import { Channel } from "@anycable/web";

export default class MessagesChannel extends Channel {
  static identifier = "MessagesChannel";

  async speak(message) {
    return this.perform("receive", { message });
  }

  receive(data) {
    this.emit("message", data.messages);
  }
}
