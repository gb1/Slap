defmodule Slap.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Slap.Users.User


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
    |> unique_constraint(:username_email, name: :users_name_email_index)
    |> downcase_value
    |> put_password_hash()      
  end

  def downcase_value(changeset) do
    update_change(changeset, :email, &String.downcase/1)
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end

end
