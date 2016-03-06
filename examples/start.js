const Ship = React.createClass({
  render() {
    return (
      <div className="ship-card clearfix">
        <h2>Millenium Falcon</h2>
        <p className="description">
          This is a pretty cool ship
        </p>
      </div>
    );
  },
});

ReactDOM.render(<Ship />, document.getElementById('app'));
