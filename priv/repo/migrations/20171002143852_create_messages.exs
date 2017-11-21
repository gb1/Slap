defmodule Slap.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :name, :string
      add :email, :string
      add :message, :text
      add :room, :string

      timestamps()
    end

  end
end
