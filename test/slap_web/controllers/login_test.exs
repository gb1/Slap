defmodule SlapWeb.LoginTest do
  use SlapWeb.ConnCase

  alias Slap.Users
  alias Slap.Users.User

  @create_attrs %{email: "some email", name: "some name", password: "some password"}
  @session_attrs %{email: "some email", password: "some password"}
  @invalid_session_attrs %{email: "some email", password: "some wrong password"}
  
  def fixture(:user) do
    {:ok, user} = Users.create_user(@create_attrs)
    user
  end
  
  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "test logging in..." do

    setup [:create_user]
    
    test "login test", %{conn: conn} do
      conn = post conn, session_path(conn, :create), @session_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]
    end

    test "invalid login test", %{conn: conn} do
      conn = post conn, session_path(conn, :create), @invalid_session_attrs
      assert json_response(conn, 401)["error"] == "Invalid email or password"
    end
    
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end

end