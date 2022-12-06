class FoodsController < ApplicationController
    def create 
        # byebug
        # Previous attempt:
        # Food.create!(food_params)
        # NOTE:
        # This works within a Byebug console but is blocked by the fact that 'cookout_id' is not allowed:
        # @current_user.foods.create!(food_params)

        # '@current_user' provides the 'user_id'
        # TODO
        # Take off the bang operator, !, and use byebug (and type food.full_messages) to figure out what's missing 
        # (which is most likely that you haven't provided a 'user_id' or 'cookout_id'
        # food = @current_user.foods.create!(food_params)

        # Debugging the 'Food' issue's output:
        # .7.4 :003 > f = Food.create
        # => #<Food id: nil, user_id: nil, cookout_id: nil, name: nil, created_at: nil, updated_at: nil>
        # 2.7.4 :004 > f.errors.full_messages
        # => ["User must exist", "Cookout must exist", "Name can't be blank"] 
        food = @current_user.foods.create(food_params)
        
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
        # NOTE: I added ':cookout_id' to try to prevent weird creation validation issues:
        # params.permit(:name, :cookout_id)
        # The resulting error from this will show that the nested 'food' key is an issue, but its not really a problem so it can be ignored:
        # "food"=>{"cookout_id"=>2, "name"=>"Burgers"}
        params.permit(:name, :cookout_id)
    end

end

