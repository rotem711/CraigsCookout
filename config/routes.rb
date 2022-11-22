Rails.application.routes.draw do
  # CRUD:
  # CRUD: CREATE READ UPDATE DELETE
  # RAILS VERSION:
  # SHUD: SHOW INDEX UPDATE DELETE
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # We can limit the CRUD methods we allow:
  # resources :cookouts, only: [:index, :create]
  # TODO: Create the route for the 'show' route for the cookouts controller
  # This is what the backend is providing for the user's session that allows it to know that the user corresponds to this particular 'user_id' value:
  # session["user_id"]
  # NOTE: By just using 'resources :cookouts' we can then allow for ALL CRUD methods so that I can also allow a 'show' route
  resources :cookouts

  # NOTE: I commented this section out since these routes are provided through the 'resources' macro:
  # This is the ':index' route provided by the 'resources' macro:
  # get "/cookouts", to: "cookouts#index"
  # This is the ':create' route provided by the 'resources' macro:
  # post "/cookouts", to: "cookouts#create"

  # WHAT THIS MEANS FOR THE FRONTEND:
  # On the frontend, I need to make a frontend 'get' request for '/cookouts':
  # On the frontend, I need to make a frontend 'post' request for '/cookouts'
  resources :foods, only: [:index, :create]
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
