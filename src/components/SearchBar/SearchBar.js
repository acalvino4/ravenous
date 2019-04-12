import React from 'react'
import './SearchBar.css'

const sortByOptions = {
    "Best Match": "best_match",
    "Hightest Rated": "rating",
    "Most Reviewed": "review_count"
}


class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        }
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy===sortByOption) {
            return 'active'
        } else {
            return ''
        }
    }

    handleSortByChange(sortByOption,event) {
        this.setState({sortBy: sortByOption}, this.handleSearch.bind(this, event))
    }
    
    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value})
    }

    handleTermEnter(event) {
        event.preventDefault()
        if (event.keyCode === 13) {
            document.getElementsByClassName("location")[0].focus()
        }
    }

    handleLocationEnter(event) {
        event.preventDefault()
        if (event.keyCode === 13) {
            document.getElementsByClassName("SearchBar-submit")[0].click()
        }
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy)
        event.preventDefault()
    }

    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionValue = sortByOptions[sortByOption]
            return (
                <li
                    key={sortByOptionValue}
                    className={this.getSortByClass(sortByOptionValue)}
                    onClick={this.handleSortByChange.bind(this,sortByOptionValue)}
                >
                    {sortByOption}
                </li>
            )
        })
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input
                        className="key-terms"
                        placeholder="Search Businesses"
                        onChange={this.handleTermChange}
                        onKeyUp={this.handleTermEnter}
                    />
                    <input
                        className="location"
                        placeholder="Where?"
                        onChange={this.handleLocationChange}
                        onKeyUp={this.handleLocationEnter}
                    />
                </div>
                <div
                    className="SearchBar-submit"
                    onClick={this.handleSearch}
                >
                    <button>Let's Go</button>
                </div>
            </div>
        )
    }
}

export default SearchBar