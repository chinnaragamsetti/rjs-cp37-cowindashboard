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
      this.setState(prevState => ({
        apiStatus: apiStatusConstants.success,
        coverage: [...prevState.coverage, coverageData],
        age: [...prevState.age, ageData],
        gender: [...prevState.gender, genderData],
      }))
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
    const {coverageData, ageData, genderData} = this.state
    console.log(coverageData)
    return (
      <>
        <VaccinationCoverage coverageData={coverageData} />
        <VaccinationByGender genderData={genderData} />
        <VaccinationByAge ageData={ageData} />
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
      <p className="failuretext">Something Went Wrong</p>
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
        <p className="mainhead">CoWIN Vaccination in India</p>
        {this.renderlist()}
      </div>
    )
  }
}

export default CowinDashboard
