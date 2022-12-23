class CookoutsController < ApplicationController
    def create 
        # byebug

        # Previously UNWORKING code to show the problem I fixed
        # cookout = @current_user.cookouts.create!(cookout_params)

        # NOTE: To step through the 'byebug' for this issue
        # 1. I put a byebug at the very top
        # 2. I then printed out '@current_user' and "@current_user.cookouts"
        # 3. I then realized the 'Cookout' model isn't tied to a user anymore since everyone needs to access a given cookout

        # TODOs: 
        # 1. Change all mentions of '#@current_user' to 'Cookout.(method)'
        # 2. Basically use all of the '@current_user' sections that currently exist within the 'cookouts_controller' 
        # and place that into the 'foods_controller'

        # Reason being: 
        # A cookout doesn't belong to a person
        # However, foods belong to a person

        cookout = Cookout.create!(cookout_params)
        render json: cookout, status: :created
    end

    def update
        # Previous line of code that I had earlier:
        # cookout = Cookout.cookouts.find_by(id: params[:id])
        # byebug

        cookout = Cookout.find_by(id: params[:id])
        user_id = @current_user.id

        if cookout.users.find_by(id: user_id) 
            cookout.update(cookout_params) 
            render json: cookout
        # if cookout
        #     cookout.update(cookout_params)
        #     render json: cookout
        else
            render json: { errors: [cookout.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    # Add full CRUD capability for this model
    def index 
        # byebug
        cookouts = Cookout.all

        if session[:user_id]
        # if @current_user
            render json: cookouts
        else
            # TODO: 
            # For whatever reason, I'm not able to authenticate successfully for a fetch
            # request to the '/cookouts' route, so I need to fix this:
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        cookout = Cookout.find_by(id: params[:id])
        if cookout 
            render json: cookout
        else
            render json: { error: "Cookout not found" }
        end
    end

    # TODO:
    # Fix this error that appears when I attempt to delete a cookout that has foods associated with it
    # ActiveRecord::InvalidForeignKey (SQLite3::ConstraintException: FOREIGN KEY constraint failed):
    # Likely Reason: This is because each cookout has 'foods' associated with it that are tied to a specific 'cookout_id'
    def destroy 
        # byebug
        # TODO: I need to somehow brute force the rollback to allow the associated foods to be dropped from the database
        cookout = Cookout.find_by(id: params[:id])
        user_id = @current_user.id

        # cookout = Cookout.find_by(id: params[:id])
        # Idea: 
        # Maybe I can just find all of the foods via 'cookout.foods', destroy them, and THEN destroy the cookout
        # That way, Rails doesn't complain of my scorched earth kind of method of removing everything associated with the cookout

        # NOTE:
        # I tried checking 'puts JSON.pretty_generate(cookout.foods.methods)' output but I can't see anything relevant in this scenario
        # I also tried checking 'rails routes' but can't find a more specific method for deleting other than 'cookout.foods.destroy'

        # Workflow Idea:
        # We have to loop through the 'cookout.foods'
        # Then, grab all of the 'id' values for each food
        # Then, we need to call the 'destroy' method for each 'food'
        # Then, we can just destroy the 'cookout' since there would be no 'foods' left that are associated with it

        # NOTE: 
        # We can use 'dependent' in the 'cookout.rb' model to allow a cookout to be destroyed along with its associated 'foods'
        # NOTE: We want to use the 'dependent: ' parameter since we want 'foods' to be destroyed if a cookout is destroyed:
        # Look for 'dependent':
        # https://guides.rubyonrails.org/association_basics.html
        if cookout.users.find_by(id: user_id) 
        # if cookout
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
