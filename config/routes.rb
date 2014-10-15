Rails.application.routes.draw do

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}
  # root :to => 'assets#index'



  root :to => 'home#index'





  # for some reason needed this.
    devise_scope :user do
      get 'users/sign_out' => "devise/sessions#destroy"
    end


    # devise_scope :user do
    #   get 'users/sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
    # end


  # get 'assets/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products


    resources :abodes

resources :bills

get '*path', to: 'home#index'

end
