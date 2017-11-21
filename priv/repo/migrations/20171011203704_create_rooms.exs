defmodule Slap.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :room, :string
      add :description, :string

      timestamps()
    end

    create unique_index(:rooms, [:room])

  end
end
