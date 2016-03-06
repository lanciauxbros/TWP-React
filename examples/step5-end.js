const apiEndpoint = 'http://swapi.co/api/starships/';
function makeRequest(url, successCallback, errorCallback) {
  superagent.get(url)
         .end(function(err, res) {
            if (res.ok) {
              successCallback(res.body);
            } else {
              // Oh no!
              errorCallback(err, res.body);
            }
          });
}

function loadShips(callback) {
  makeRequest(apiEndpoint, (ships) => {
    const shipsToRender = ships.results.slice(0, 10);
    // Only return useful information.
    callback(shipsToRender.map((ship, shipIndex) => {
      return { id: shipIndex, name: ship.name, description: ship.starship_class };
    }));
  });
}

const Ship = React.createClass({
  render() {
    const activeClass = this.props.isActive ? 'active' : '';

    return (
      <div className={`ship-card clearfix ${activeClass}`}>
        <h2>{this.props.ship.name}</h2>
        <p className="description">
          {this.props.ship.description}
        </p>
        <button className="takeOff btn btn-primary pull-right" onClick={this.clickHandler}>{this.props.isActive ? 'Land' : 'Take Off' }</button>
      </div>
    );
  },

  clickHandler() {
    this.props.toggleActiveShip(this.props.ship.id);
  }
});

const ShipContainer = React.createClass({
  getInitialState() {
    return {
      filter: '',
      ships: [],
      activeShipId: null,
      loading: true
    };
  },

  componentDidMount() {
    loadShips((ships) => {
      this.setState({ ships: ships, loading: false })
    });
  },

  render() {
    const ships = this.state.ships.filter((ship) => {
      return ship.name.toLowerCase().indexOf(this.state.filter) !== -1;
    }).map((ship) => {
      const isActive = ship.id === this.state.activeShipId;
      return (
        <Ship key={'ship-' + ship.id} ship={ship} isActive={isActive} toggleActiveShip={this.toggleActiveShip} />
      );
    });
    return (
      <div className="container">
        <input value={this.state.filter} placeholder="Filter..." onChange={this.updateFilter} />
        { ships.length > 0 ? ships :
        this.state.loading ? <h2>Loading!</h2> : <h2>No ships!</h2>
        }
      </div>
    );
  },

  updateFilter(event) {
    this.setState({ filter: event.target.value });
  },

  toggleActiveShip(id) {
    if (this.state.activeShipId === id) {
      this.setState({ activeShipId: null });
    } else {
      this.setState({ activeShipId: id });
    }
  }
});


ReactDOM.render(<ShipContainer />, document.getElementById('app'));
