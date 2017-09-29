defmodule SlapWeb.Router do
  use SlapWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SlapWeb do
    pipe_through :api
  end
end
