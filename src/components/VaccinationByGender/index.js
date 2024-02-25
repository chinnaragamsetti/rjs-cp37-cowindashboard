import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {genderData} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="50%"
        data={genderData}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="80%"
        dataKey="count"
        className="gender"
      >
        <Cell name="Male" fill="#fecba6" />
        <Cell name="Female" fill="#b3d23f" />
        <Cell name="Others" fill="#a44c9e" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByGender
