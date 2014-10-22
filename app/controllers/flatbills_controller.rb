class FlatbillsController < ApplicationController
respond_to :json

    def index
    respond_with flatbills
    end

    private

    def flatbills
    Flatbill.where(abode_id: current_user.abode_id) if user_signed_in?  
    end

end