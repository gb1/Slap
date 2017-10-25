defmodule SlapWeb.UserView do
  use SlapWeb, :view
  alias SlapWeb.UserView

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email}
  end

  def render("error.json", _) do
    %{error: "Error registering user"}
  end
end
