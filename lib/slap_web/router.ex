defmodule SlapWeb.Router do
  use SlapWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    #look for a JWT in the head Authorization:Bearer
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    #load current user if there is a valid JWT
    plug Guardian.Plug.LoadResource
  end

  scope "/api", SlapWeb do
    pipe_through :api
    resources "/messages", MessageController, except: [:new, :edit]
    resources "/rooms", RoomController, only: [:index]
    resources "/users", UserController, only: [:create]
    resources "/rooms/:room/messages", RoomMessagesController, only: [:index]

    resources "/sessions", SessionController, only: [:create]
    # delete "/sessions", SessionController, :delete
    # post "/sessions/refresh", SessionController, :refresh
  end
end
