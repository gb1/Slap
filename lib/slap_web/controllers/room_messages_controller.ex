defmodule SlapWeb.RoomMessagesController do
  use SlapWeb, :controller

  alias Slap.Messages
  alias Slap.Messages.Message

  plug Guardian.Plug.EnsureAuthenticated, handler: SlapWeb.SessionController
  
  action_fallback SlapWeb.FallbackController

  def index(conn, %{"room" => room}) do
    messages = Messages.get_room_messages(room)
    render(conn, "index.json", messages: messages)
  end
end
