defmodule Slap.Messages.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Slap.Messages.Message


  schema "messages" do
    field :message, :string
    field :name, :string
    field :room, :string

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:name, :message, :room])
    |> validate_required([:name, :message, :room])
  end
end
