defmodule SlapWeb.UserController do
  use SlapWeb, :controller

  alias Slap.Users
  alias Slap.Users.User

  action_fallback SlapWeb.FallbackController

  def create(conn, %{"user" => user_params}) do

    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      new_conn = conn
      |> Guardian.Plug.api_sign_in(user, :access)
      
      jwt = Guardian.Plug.current_token(new_conn)

      new_conn
      |> put_status(:created)
      |> render(SlapWeb.SessionView, "show.json", user: user, jwt: jwt)

      # |> put_status(:created)
      # |> put_resp_header("location", user_path(conn, :show, user))
      # |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

end
