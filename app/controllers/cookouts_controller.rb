class CookoutsController < ApplicationController
    def index 
        render json: Cookout.all
    end

    def create 
        cookout = @current_user.cookouts.create!(cookout_params)
        render json: cookout, status: :created
    end

    private 

    def cookout_params
        params.permit(:name, :start_time, :end_time)
    end
end
