defmodule SlapWeb.UserView do
  use SlapWeb, :view
  alias SlapWeb.UserView

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email}
  end
end
