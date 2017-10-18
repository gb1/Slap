defmodule SlapWeb.UserControllerTest do
  use SlapWeb.ConnCase

  alias Slap.Users
  alias Slap.Users.User

  @create_attrs %{email: "some email", name: "some name", password: "some password"}
  @update_attrs %{email: "some updated email", name: "some updated name", password: "some password"}
  @invalid_attrs %{email: nil, name: nil, password_hash: nil}

  def fixture(:user) do
    {:ok, user} = Users.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      
      conn = post conn, user_path(conn, :create), user: @create_attrs
      
      assert %{"id" => id} = json_response(conn, 201)["data"]

      # conn = get conn, user_path(conn, :show, id)
      # assert json_response(conn, 200)["data"] == %{
      #   "id" => id,
      #   "email" => "some email",
      #   "name" => "some name"}
    end

    # test "renders errors when data is invalid", %{conn: conn} do
    #   conn = post conn, user_path(conn, :create), user: @invalid_attrs
    #   assert json_response(conn, 422)["errors"] != %{}
    # end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
