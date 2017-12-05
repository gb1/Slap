defmodule SlapWeb.RoomChannel do
  use Phoenix.Channel
  alias Slap.Messages
  alias SlapWeb.Presence
  require IEx

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> room, _message, socket) do
    IO.puts "joined..."
    send(self(), :after_join)
    {:ok, socket}
  end
  
  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, "socket.assigns.user_id", %{
      online_at: inspect(System.system_time(:seconds))
    })
    IO.puts "updating presence..."
    IO.inspect socket
    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body, "token" => token, "room" => room}, socket) do
    {:ok, sub} = Guardian.decode_and_verify(token)
    {:ok, user} = Slap.GuardianSerializer.from_token(sub["sub"])
    
    {:ok, message} = Messages.create_message(%{room: room, name: user.name, email: user.email, message: body})

    broadcast! socket, "new_msg", 
    %{room: room, name: user.name, email: user.email, message: body,
      gravatar: Gravatar.new(message.email) |> to_string,
      posted: Timex.format!(message.inserted_at, "{ANSIC}") }

    {:noreply, socket}

  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end