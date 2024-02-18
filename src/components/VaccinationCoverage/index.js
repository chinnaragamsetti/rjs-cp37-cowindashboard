// Write your code here

import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {coverageData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={1000}
        height={300}
        data={coverageData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          iconType="square"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
        <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#fd7f0e" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
