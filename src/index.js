import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class Recipe extends React.Component {
  render() {
    let ingredients = this.props.ingredients.map(function(ingredient, index) {
      return (
        <ListGroupItem key={index}>{ingredient}</ListGroupItem>
      )
    });
    return (
      <div>
        <Panel
          bsStyle="info"
          header={this.props.name}
          collapsible>
            <h3 className="text-center">Ingredients</h3>
            <hr/>
            <ListGroup>
              {ingredients}
            </ListGroup>
        </Panel>
      </div>
    )
  }
}

class RecipeBox extends React.Component {
  render() {
    let recipes = this.props.recipes.map(function(recipe, index) {
        return (
          <Recipe
            key={index}
            name={recipe.name}
            ingredients={recipe.ingredients} />
        )
    });
    return (
      <Well>
        {recipes}
        <AddRecipe
          save={this.props.save} updateNewRecipeName={this.props.updateNewRecipeName}
          updateNewIngredients={this.props.updateNewIngredients}/>
      </Well>
    )
  }
}

class AddRecipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {showModal: false};

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}
        >
          Add recipe
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Recipe</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Recipe Name"
                  onChange={this.props.updateNewRecipeName}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter ingredients separated,by,commas"
                  onChange={this.props.updateNewIngredients}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={() => {this.props.save(); this.close();}}
            >
              Save
            </Button>
            <Button
              onClick={this.close}
            >
                Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes: []};

    this.save = this.save.bind(this);
    this.updateNewRecipeName = this.updateNewRecipeName.bind(this);
    this.updateNewIngredients = this.updateNewIngredients.bind(this);
  }
  componentWillMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({recipes: recipes});
  }
  save() {
    if(this.state.recipeName && this.state.ingredients) {
      let newIngredients = this.state.ingredients.split(',');
      let newRecipes = this.state.recipes.concat([{name: this.state.recipeName, ingredients: newIngredients}]);

      this.setState({recipes: newRecipes});
      localStorage.setItem('recipes', JSON.stringify(newRecipes));
    }
  }
  updateNewRecipeName(e) {
    this.setState({recipeName: e.target.value});
  }
  updateNewIngredients(e) {
    this.setState({ingredients: e.target.value});
  }
  render() {
    return (
      <RecipeBox
        recipes={this.state.recipes}
        save={this.save}
        updateNewRecipeName={this.updateNewRecipeName}
        updateNewIngredients={this.updateNewIngredients}
        />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
