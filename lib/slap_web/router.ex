defmodule SlapWeb.Router do
  use SlapWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SlapWeb do
    pipe_through :api

    resources "/messages", MessageController, except: [:new, :edit]
  end
end
