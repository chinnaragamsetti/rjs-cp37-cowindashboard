import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {ageData} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="50%"
        data={ageData}
        startAngle={0}
        endAngle={360}
        outerRadius="80%"
        dataKey="count"
      >
        <Cell name="18-44" fill="#fecba6" />
        <Cell name="44-60" fill="#b3d23f" />
        <Cell name="Above 60" fill="#a44c9e" />
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

export default VaccinationByAge
