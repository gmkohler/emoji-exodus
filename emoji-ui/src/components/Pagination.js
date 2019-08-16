import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PaginationActions from '../store/actions/Pagination';
import { totalPageNumberSelector } from '../store/selectors/Pagination';
import './Pagination.css';

class PaginationBase extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPageNumber: PropTypes.number.isRequired,
    paginationActions: PropTypes.shape({
      setCurrentPage: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super(...arguments);
    this._onInputChange = this._onInputChange.bind(this);
  }

  _onInputChange(e) {
    const { setCurrentPage } = this.props.paginationActions;
    const pageNum = parseInt(e.target.value);
    if (isNaN(pageNum)) {
      setCurrentPage(pageNum);
    }
  }

  render() {
    const { currentPage, totalPageNumber } = this.props;

    return (
      <div className="pagination-container">
        <label>
          Page
          <input
            name="current-page"
            value={currentPage}
            onChange={this._onInputChange}
          />
        </label>
        / {totalPageNumber}
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    totalPageNumber: totalPageNumberSelector(state),
    currentPage: state.pagination.currentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return { paginationActions: bindActionCreators(PaginationActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationBase);
