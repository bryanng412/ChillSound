Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [ :show ]
    resource :user, only: [ :create, :update ]
    resource :session, only: [ :create, :destroy, :show ]
    resources :songs, except: [ :new, :edit ]
    resources :likes, only: [ :create, :destroy ]
  end
end
