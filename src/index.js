import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { Button } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

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
          <Recipe key={index} name={recipe.name} ingredients={recipe.ingredients} />
        )
    });
    return (
      <Well>
        {recipes}
        <Button bsStyle="primary">Add recipe</Button>
      </Well>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipes: []};
  }
  componentWillMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    this.setState({recipes: recipes});
  }
  render() {
    return (
      <RecipeBox recipes={this.state.recipes}/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
