defmodule SlapWeb.RoomMessagesView do
  use SlapWeb, :view
  require IEx
  alias SlapWeb.RoomMessagesView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, RoomMessagesView, "message.json")}
  end

  def render("message.json", %{room_messages: message}) do
    %{id: message.id,
      room: message.room,
      name: message.name,
      email: message.email,
      gravatar: Gravatar.new(message.email) |> to_string,
      message: message.message,
      posted: Timex.format!(message.inserted_at, "{ANSIC}")}
  end
end
