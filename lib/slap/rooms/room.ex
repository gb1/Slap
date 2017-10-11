defmodule Slap.Rooms.Room do
  use Ecto.Schema
  import Ecto.Changeset
  alias Slap.Rooms.Room


  schema "rooms" do
    field :description, :string
    field :room, :string

    timestamps()
  end

  @doc false
  def changeset(%Room{} = room, attrs) do
    room
    |> cast(attrs, [:room, :description])
    |> validate_required([:room, :description])
  end
end
