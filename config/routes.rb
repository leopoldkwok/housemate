Rails.application.routes.draw do
  root :to => 'home#index'

resources :bills

get '*path', to: 'home#index'

end
