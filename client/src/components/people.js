import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
const _ = require('underscore');

class People extends Component {
  constructor() {
    super();
    this.reversed = false;
    this.state = {
      people: []
    };

    var host = window.location.hostname;
    this.connection = new WebSocket('ws://'+host+':9090/');
    // this.connection = new WebSocket('ws://localhost:9090/');
    console.log(host);
  }

  //----------------------------------------------------------------------------
  // Runs automatically when the component is mounted
  //----------------------------------------------------------------------------
  componentDidMount() {
    // fetch returns a 'promise'
    /*
    fetch('/api/recipients')
      .then(res => res.json())
      .then(people => this.setState({people: people}, () => 
        console.log('People fetched...', people)));
    */

    this.connection.onmessage = (evt) => {
      // console.log(evt.data)
      // const data = JSON.parse(JSON.stringify(evt.data))
      const data = JSON.parse(evt.data)
      console.log(data);
      this.setState({people: data});
    }
  }
  
  //----------------------------------------------------------------------------
  //
  //----------------------------------------------------------------------------
  onSort(evt, sortKey) 
  {
    let people = this.state.people;
    if(['first', 'last'].includes(sortKey))
    {
      if(!this.reversed)
        people =_.sortBy(this.state.people, (obj) => obj.name[sortKey]);
      else
        people =_.sortBy(this.state.people, (obj) => obj.name[sortKey]).reverse();
    }
    else
    {
      if(!this.reversed)
      {
        people =_.sortBy(this.state.people, sortKey);
      }
      else
      {
        // people.sort((b, a) => a[sortKey].localeCompare(b[sortKey]));
        people =_.sortBy(this.state.people, sortKey).reverse();
      }
    }

    this.setState({people});
    this.reversed = !this.reversed;
  }

  //----------------------------------------------------------------------------
  //
  //----------------------------------------------------------------------------
  makeTables(num) {
    let tables = [];
    for(let i = 0; i < num; ++i)
    {
      tables.push(this.makeTable()); 
    }

    return tables;
  }

  //----------------------------------------------------------------------------
  //
  //----------------------------------------------------------------------------
  makeTable() {
    const classes = 'table table-striped table-hover';
    // Returns a component
    return (
        <div>
          <h2>Recipients</h2>
          <table className={classes}>
            <thead className="thead-light">
              <tr>
                <th onClick={e => this.onSort(e, 'first')} 
                  style={{width: "20%", cursor: 'pointer'}} >
                    <span>First Name</span>
                    <span className="fa fa-sort" style={{"font-size":"32px"}}></span>
                </th>
                <th onClick={e => this.onSort(e, 'last')} 
                  style={{width: "20%", cursor: 'pointer'}}>
                    <span>Last Name</span>
                    <span className="fa fa-sort" style={{"font-size":"32px"}}></span>
                </th>
                <th onClick={e => this.onSort(e, 'birth')} style={{cursor: 'pointer'}}>
                  <span>Birth</span>
                  <span className="fa fa-sort" style={{"font-size":"32px"}}></span>
                </th>
                <th>Death</th>
                <th>Contributions</th>
                <th>Awards</th>
              </tr>
            </thead>

            <tbody>
              {this.state.people.map((person, index) => 
                <tr key={person.id}>
                  <td>{person.name.first}</td>
                  <td>{person.name.last}</td>
                  <td>{person.birth}</td>
                  <td>{person.death}</td>
                  <td>{person.contribs.join()}</td>
                  <td>{person.awards.map(award => 
                    award.year + "-" + award.by 
                  )} 
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    )
  }

  render() {
    return (
      <div className="App-container">
        {this.makeTables(1)}
      </div>
    )
  }

  render1() {
    const columns = [
      {
        dataField: "id",
        text: "ID"
      },
      {
        dataField: "firstName",
        text: "First Name"
      },
      {
        dataField: "lastName",
        text: "Last Name"
      }
    ];

    return (
      <div className="container" style={{marginTop: 50}}>
        <BootstrapTable 
          keyField='id'
          data={this.state.people}
          columns={columns} 
        />
      </div>
    );
  }
}

export default People;
