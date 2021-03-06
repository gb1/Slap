# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :slap,
  ecto_repos: [Slap.Repo]

# Config for Guardian
config :guardian, Guardian,
  issuer: "Slap",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Slap.GuardianSerializer

# Configures the endpoint
config :slap, SlapWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "t48vlusdvItoldKtk7TSlDYgocX/7oN2dhjDe5crWMC61sJkITqywlFHncJ1YLnb",
  render_errors: [view: SlapWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Slap.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
