const Ship = React.createClass({
  render() {
    return (
      <div className="ship-card clearfix">
        <h2>{this.props.ship.name}</h2>
        <p className="description">
          {this.props.ship.description}
        </p>
      </div>
    );
  },
});

const coolShip = { id: 1, name: 'Millenium Falcon', description: 'Such a cool ship'};

ReactDOM.render(<Ship ship={coolShip} />, document.getElementById('app'));
