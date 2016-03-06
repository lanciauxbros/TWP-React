const Ship = React.createClass({
  getInitialState() {
    return {
      isActive: false
    };
  },

  render() {
    const activeClass = this.state.isActive ? 'active' : '';

    return (
      <div className={`ship-card clearfix ${activeClass}`}>
        <h2>{this.props.ship.name}</h2>
        <p className="description">
          {this.props.ship.description}
        </p>
        <button className="takeOff btn btn-primary pull-right" onClick={this.clickHandler}>{this.state.isActive ? 'Land' : 'Take Off' }</button>
      </div>
    );
  },

  clickHandler() {
    const previousState = this.state.isActive;
    this.setState({ isActive: !previousState });
  }
});

const coolShip = { id: 1, name: 'Millenium Falcon', description: 'Such a cool ship'};

ReactDOM.render(<Ship ship={coolShip} />, document.getElementById('app'));
