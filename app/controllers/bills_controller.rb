class BillsController < ApplicationController

    def index
        @bills = Bill.all

        respond_to do |format|
            format.html
            format.json { render json: @bills }
        end
end
