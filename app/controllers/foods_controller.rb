class FoodsController < ApplicationController
    def index
        render json: Food.all
    end

    def create
        food = @current_user.foods.create!(food_params)
        render json: food, status: :created 
    end

    private 

    def food_params
        params.permit(:name) 
    end
end
