class CookoutsController < ApplicationController
    def index 
        render json: Cookout.all
    end

    def create 
        # byebug
        cookout = @current_user.cookouts.create!(cookout_params)
        render json: cookout, status: :created
    end

    private 

    def cookout_params
        params.permit(:name, :start_time, :end_time)
    end

    # Add full CRUD capability for this model
end
