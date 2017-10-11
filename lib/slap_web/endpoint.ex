defmodule SlapWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :slap

  socket "/socket", SlapWeb.UserSocket

  # plug Plug.Static.IndexHtml, at: "/docs"

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
   #plug Plug.Static,
   #  at: "/", from: :slap, gzip: false,
   #  only: ~w(css fonts images js favicon.ico robots.txt)

  plug Plug.Static.IndexHtml,
  at: "/"

  plug Plug.Static,
  at: "/",
  from: "priv/app/",
  only: ~w(index.html favicon.ico static)

  plug Plug.Static,
  at: "/view",
  from: "priv/app/view"

  plug Plug.Static,
  at: "/controller",
  from: "priv/app/controller"

  plug Plug.Static,
  at: "/libs",
  from: "priv/app/libs"


  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_slap_key",
    signing_salt: "nEXM2gWv"

  plug SlapWeb.Router

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      #port = 4444
      {:ok, Keyword.put(config, :http, [:inet6, port: port])}
    else
      {:ok, config}
    end
  end
end
