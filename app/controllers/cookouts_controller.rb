class CookoutsController < ApplicationController
    def create 
        # byebug
        # Previously UNWORKING code to show the problem I fixed
        # cookout = @current_user.cookouts.create!(cookout_params)

        # NOTE: To step through the 'byebug' for this issue
        # 1. I put a byebug at the very top
        # 2. I then printed out '@current_user' and "@current_user.cookouts"
        # 3. I then realized the 'Cookout' model isn't tied to a user anymore since everyone needs to access a given cookout

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
