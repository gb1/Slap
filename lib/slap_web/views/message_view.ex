defmodule SlapWeb.MessageView do
  use SlapWeb, :view
  alias SlapWeb.MessageView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      room: message.room,
      name: message.name,
      message: message.message,
      posted: message.inserted_at}
  end
end
