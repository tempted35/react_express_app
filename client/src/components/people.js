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
  }

  // Runs automatically when the component is mounted
  componentDidMount() {
    // fetch returns a 'promise'
    fetch('/api/recipients')
      .then(res => res.json())
      .then(people => this.setState({people: people}, () => 
        console.log('People fetched...', people)));
  }
  
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

  makeTables(num) {
    let tables = [];
    for(let i = 0; i < num; ++i)
    {
      tables.push(this.makeTable()); 
    }

    return tables;
  }

  makeTable() {
    const classes = 'table table-striped table-hover';
    // Returns a component
    return (
        <div className="panel panel-default">
          <h2>Recipients</h2>
          <table className={classes}>
            <thead className="thead-light">
              <tr>
                <th onClick={e => this.onSort(e, 'first')}>
                  <span>First Name</span>
                  <span className="fa fa-sort"></span>
                </th>
                <th onClick={e => this.onSort(e, 'last')}>
                  <span>Last Name</span>
                  <span className="fa fa-sort"></span>
                </th>
                <th onClick={e => this.onSort(e, 'birth')}>
                  <span>Birth</span>
                  <span className="fa fa-sort"></span>
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
      <div className="container">
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
