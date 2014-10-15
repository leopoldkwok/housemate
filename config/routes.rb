Rails.application.routes.draw do

  root :to => 'home#index'

  devise_for :users



  # for some reason needed this.
    devise_scope :user do
      get 'users/sign_out' => "devise/sessions#destroy"
    end

    resources :abodes


resources :bills

get '*path', to: 'home#index'

end
