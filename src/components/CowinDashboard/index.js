// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coverage: [],
    age: [],
    gender: [],
  }

  componentDidMount() {
    this.getRender()
  }

  getRender = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // console.log(response)
    if (response.ok === true) {
      const coverageData = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const ageData = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      const genderData = data.vaccination_by_gender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coverage: coverageData,
        age: ageData,
        gender: genderData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderChartsList = () => {
    const {coverage, age, gender} = this.state
    console.log(coverage)
    return (
      <>
        <div className="coveragecontainer">
          <h1 className="coverage">Vaccination Coverage</h1>
          <VaccinationCoverage coverageData={coverage} />
        </div>
        <div className="coveragecontainer">
          <h1 className="coverage">Vaccination by gender</h1>{' '}
          <VaccinationByGender genderData={gender} />
        </div>
        <div className="coveragecontainer">
          <h1 className="coverage">Vaccination by age</h1>
          <VaccinationByAge ageData={age} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failurecont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureimage"
      />
      <h1 className="failuretext">Something Went Wrong</h1>
    </div>
  )

  renderlist = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderChartsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="maincontainer">
        <div className="logocont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logotext">Co-WIN</p>
        </div>
        <h1 className="mainhead">CoWIN Vaccination in India</h1>

        {this.renderlist()}
      </div>
    )
  }
}

export default CowinDashboard
