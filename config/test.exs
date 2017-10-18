use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :slap, SlapWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Secret key for Guardian
config :guardian, Guardian,
  secret_key: "JblUh3aVxT+V1pTf8AZCuWl+MnkzYpX4Y8ZzXuEmD5siQMYS3F4xQd8o8QjY9Ink"


# Configure your database
config :slap, Slap.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "slap_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
