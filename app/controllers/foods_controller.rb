class FoodsController < ApplicationController
    def create 
        # byebug
        food = @current_user.foods.create!(food_params)
        render json: food, status: :created
    end

    def update
        food = @current_user.foods.find_by(id: params[:id])
        if food.user_id == @current_user.id
            food.update(food)
            render json: food
        else
            render json: { errors: [food.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    def index 
        foods = @current_user.foods.all

        if session[:user_id]
            render json: foods
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        food = @current_user.foods.find_by(id: params[:id])
        if food 
            render json: food
        else
            render json: { error: "Food not found" }
        end
    end

    def destroy 
        food = @current_user.foods.find_by(id: params[:id])
        if food.user_id == @current_user.id
            food.destroy
            head :no_content
        end
    end

    private 

    def food_params
        params.permit(:name)
    end

end

