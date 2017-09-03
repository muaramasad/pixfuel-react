import React, { Component } from 'react';
import Navbarcomp from './Navbarcomp';
import Cardcomp from './Cardcomp';
import ReactPaginate from 'react-paginate';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      offset: 0,
      totalCount: 0
    }
  }
  loadResourcesFromServer() {
      $.ajax({
        url      : this.props.url,
        data     : {per_page: this.props.perPage, offset: this.state.offset},
        dataType : 'json',
        type     : 'GET',

        success: (data,status,request) => {
          this.setState({
            resources: data,
            pageCount: Math.ceil(request.getResponseHeader('X-WP-Total') / this.props.perPage),
          });
        },

        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
})
}
componentDidMount() {
    // let dataURL = "http://pixfuel.dev/wp-json/wp/v2/resources?_embed";
    // fetch(dataURL)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       resources: res, pageCount: Math.ceil(data.res.total_count / data.meta.limit)}
    //     })
    //   })
    this.loadResourcesFromServer();
  }
  handlePageClick = (resources) => {
    let selected = resources.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
      this.loadResourcesFromServer();
    });
  };
renderRow(item) {
  let items = item.map((resources, index) => {
      return <Cardcomp key={resources.id} title={resources.title.rendered} imgUrl={resources.acf.image} descriptions={resources.acf.descriptions}  link={resources.acf.link_or_url}/>;
  })
return (
      <div className="row">
        {items}
      </div>
)
}
render() {
  let itemsChunk = _.chunk(this.state.resources,3);
  let itemResources = itemsChunk.map((resources, index) => {
      return this.renderRow(resources);
  })
return (
      <div>
        <Navbarcomp  />
        <div className="container mt-5">
          {itemResources}
          <nav aria-label="Page navigation example">
          <ReactPaginate previousLabel={"previous"}
                         nextLabel={"next"}
                         breakLabel={<a href="">...</a>}
                         breakClassName={"break-me"}
                         pageCount={this.state.pageCount}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.handlePageClick}
                         containerClassName={"pagination"}
                         subContainerClassName={"page-item"}
                         activeClassName={"active"} />
                         </nav>
        </div>
      </div>
    )
  }
}
export default App;
