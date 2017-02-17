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
    let ingredients = this.props.recipe.ingredients.map(function(ingredient, index) {
      return (
        <ListGroupItem key={index}>{ingredient}</ListGroupItem>
      )
    });
    return (
      <div>
        <Panel
          bsStyle="info"
          header={this.props.recipe.name}
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
  constructor(props) {
    super(props);
    this.state = {recipes: []};

    this.save = this.save.bind(this);
  }
  componentWillMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({recipes: recipes});
  }
  save(name, ingredients) {
    if(name && ingredients) {
      let newRecipe = {name:name, ingredients:ingredients.split(',')};
      let newRecipes = this.state.recipes.concat([newRecipe]);

      this.setState({recipes: newRecipes});
      localStorage.setItem('recipes', JSON.stringify(newRecipes));
    }
  }
  render() {
    let recipes = this.state.recipes.map(function(recipe, index) {
        return (
          <Recipe
            key={index}
            recipe={recipe} />
        )
    });
    return (
      <Well>
        {recipes}
        <AddRecipe
          save={this.save} />
      </Well>
    )
  }
}

class AddRecipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {showModal: false, recipeName: '', ingredients: ''};

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.updateRecipeName = this.updateRecipeName.bind(this);
    this.updateIngredients = this.updateIngredients.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  updateRecipeName(e) {
    this.setState({recipeName: e.target.value});
  }

  updateIngredients(e) {
    this.setState({ingredients: e.target.value});
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}> Add recipe </Button>

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
                  onChange={this.updateRecipeName}
                  value={this.state.recipeName} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter ingredients separated,by,commas"
                  onChange={this.updateIngredients}
                  value={this.state.ingredients} />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={() => {this.props.save(this.state.recipeName, this.state.ingredients); this.close();}} > Save
            </Button>
            <Button
              onClick={this.close} > Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <RecipeBox />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
