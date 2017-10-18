defmodule SlapWeb.RoomController do
  use SlapWeb, :controller

  alias Slap.Rooms
  alias Slap.Rooms.Room

  plug Guardian.Plug.EnsureAuthenticated, handler: SlapWeb.SessionController

  action_fallback SlapWeb.FallbackController

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

end
