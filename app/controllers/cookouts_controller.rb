class CookoutsController < ApplicationController
    def create 
        # byebug
        # Issues to figure out:
        # is @current_user and #.cookouts working 
        # is cookout_params working
        # The problem was that you should not make it user specific, since you want EVERYONE to access a given cookout
        # cookout = @current_user.cookouts.create!(cookout_params)
        # TODO: Change all mentions of '#@current_user' to 'Cookout.(method)'
        cookout = Cookout.create!(cookout_params)
        render json: cookout, status: :created
    end

    def update
        cookout = @current_user.cookouts.find_by(id: params[:id])
        if cookout.user_id == @current_user.id
            cookout.update(cookout_params)
            render json: cookout
        else
            render json: { errors: [cookout.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    # Add full CRUD capability for this model
    def index 
        cookouts = @current_user.cookouts.all

        if session[:user_id]
            render json: cookouts
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        cookout = @current_user.cookouts.find_by(id: params[:id])
        if cookout 
            render json: cookout
        else
            render json: { error: "Cookout not found" }
        end
    end

    def destroy 
        cookout = @current_user.cookouts.find_by(id: params[:id])
        if cookout.user_id == @current_user.id
            cookout.destroy
            head :no_content
        end
    end

    private 

    def cookout_params
        # byebug
        params.permit(:name, :start_time, :end_time)
    end

end
