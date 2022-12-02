class LocationsController < ApplicationController
    def create 
        location = @current_user.locations.create!(location_params)
        render json: location, status: :created
    end

    def update
        location = @current_user.locations.find_by(id: params[:id])
        if location.user_id == @current_user.id
            location.update(food)
            render json: location
        else
            render json: { errors: [location.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    def index 
        locations = @current_user.locations.all

        if session[:user_id]
            render json: locations
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        location = @current_user.locations.find_by(id: params[:id])
        if location 
            render json: location
        else
            render json: { error: "Location not found" }
        end
    end

    def destroy 
        location = @current_user.locations.find_by(id: params[:id])
        if location.user_id == @current_user.id
            location.destroy
            head :no_content
        end
    end

    private 

    def location_params
        params.permit(:name)
    end

end

