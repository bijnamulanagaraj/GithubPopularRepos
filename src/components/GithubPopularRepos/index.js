import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTab: 'ALL',
    filteredList: [],
    isActive: true,
    failed: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    try {
      const {activeTab} = this.state
      const response = await fetch(
        `https://apis.ccbp.in/popular-repos?language=${activeTab}`,
      )
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        this.successDetails(data.popular_repos)
      }
    } catch (e) {
      this.failureDetails()
    }
  }

  clickButton = id => {
    this.setState(
      {activeTab: id, isActive: true, failed: false},
      this.getDetails,
    )
  }

  successDetails = listDetails => {
    const newDetails = listDetails.map(item => ({
      name: item.name,
      id: item.id,
      issuesCount: item.issues_count,
      forksCount: item.forks_count,
      starsCount: item.stars_count,
      avatarUrl: item.avatar_url,
    }))
    this.setState({filteredList: newDetails, isActive: false})
  }

  failureDetails = () => {
    this.setState({failed: true, isActive: true})
  }

  render() {
    const {filteredList, isActive, failed, activeTab} = this.state
    return (
      <div className="main-container">
        <h1 className="title">Popular</h1>
        <ul className="list-items-container">
          {languageFiltersData.map(item => (
            <LanguageFilterItem
              key={item.id}
              itemDetails={item}
              clicked={this.clickButton}
              activeId={activeTab}
            />
          ))}
        </ul>

        {isActive && (
          <>
            {!failed && (
              <div data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#0284c7"
                  height={80}
                  width={80}
                />
              </div>
            )}

            {failed && (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
                  alt="failure view"
                  className="failure-img"
                />
                <h1 className="failed-image-title">Something Went Wrong</h1>
              </>
            )}
          </>
        )}

        {!isActive && (
          <ul className="repos-list">
            {filteredList.map(item => (
              <RepositoryItem key={item.id} repoDetails={item} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default GithubPopularRepos
