import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';



 const MonthlyWorkouts = () => {
  const { currentUser } = useContext(AuthContext);
  const [allWorkouts, setAllWorkouts] = useState([])
  const [january, setJanuary] = useState(0);
  const [february, setFebruary] = useState(0);
  const [march, setMarch] = useState(0);
  const [april, setApril] = useState(0);
  const [may, setMay] = useState(0);
  const [june, setJune] = useState(0);
  const [july, setJuly] = useState(0);
  const [august, setAugust] = useState(0);
  const [september, setSeptember] = useState(0);
  const [october, setOctober] = useState(0);
  const [november, setNovember] = useState(0);
  const [december, setDecember] = useState(0);
  const [volumeFeedback, setvolumeFeedback] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/workouts/user/${currentUser?.uid}/`)
      .then((res) => res.json())
      .then((workouts) => {
        setAllWorkouts(workouts);
        let januaryCount = 0;
        let februaryCount = 0;
        let marchCount = 0;
        let aprilCount = 0;
        let mayCount = 0;
        let juneCount = 0;
        let julyCount = 0;
        let augustCount = 0;
        let septemberCount = 0;
        let octoberCount = 0;
        let novemberCount = 0;
        let decemberCount = 0;
        console.log(dayjs(workouts[30].date).format("MM/DD//YYYY"));
        console.log("starting loop ");

        let uniqueDays = new Set();
        for (let i = 0; i < workouts.length; i++) {
          console.log(dayjs(workouts[i].date).format("MM/DD/YYYY"));
          let workoutDate = dayjs(workouts[i].date).format("MM/DD/YYYY");
          if (!uniqueDays.has(workoutDate)) {
            uniqueDays.add(workoutDate);
            let month = parseInt(dayjs(workouts[i].date).format("MM"));
            if (month === 1) {
              januaryCount++;
              setJanuary(januaryCount);
            }
            if (month === 2) {
              februaryCount++;
              setFebruary(februaryCount);
            }
            if (month === 3) {
              marchCount++;
              setMarch(marchCount);
            }
            if (month === 4) {
              aprilCount++;
              setApril(aprilCount);
            }
            if (month === 5) {
              mayCount++;
              setMay(mayCount);
            }
            if (month === 6) {
              juneCount++;
              setJune(juneCount);
            }
            if (month === 7) {
              julyCount++;
              setJuly(julyCount);
            }
            if (month === 8) {
              augustCount++;
              setAugust(augustCount);
            }
            if (month === 9) {
              septemberCount++;
              setSeptember(septemberCount);
            }
            if (month === 10) {
              octoberCount++;
              setOctober(octoberCount);
            }
            if (month === 11) {
              novemberCount++;
              setNovember(novemberCount);
            }
            if (month === 12) {
              decemberCount++;
              setDecember(decemberCount);
            }}}
            

      })
  }, []);
  console.log(january);
  console.log(february);
  console.log(march);
  console.log(april);
  console.log(may);
  

  const data = [
    {
      name: "1",
      month: january
    },
    {
      name: "2",
      month: february
    },
    {
      name: "3",
      month: march
    },
    {
      name: "4",
      month: april
    },
    {
      name: "5",
      month: may
    },
    {
      name: "6",
      month: june
    },
    {
      name: "7",
      month: july
    },
    {
      name: "8",
      month: august
    },
    {
      name: "9",
      month: september
    },
    {
      name: "10",
      month: october
    },
    {
      name: "11",
      month: november
    }, {
      name: "12",
      month: december
    }

  ]
  const theme = {
    background: "#000025",
    text: "#ffffff",
    stroke: "#4d4d4d",
    line: "#82ca9d",
  };
  
  
  
  return (
    <>
    <ResponsiveContainer width={677} height={450}>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{ background: theme.background }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke={theme.stroke} />
      <XAxis dataKey="name" stroke={theme.text} />
      <YAxis stroke={theme.text}>
        <Label
          value="Days Worked Out"
          position="insideLeft"
          angle={-90}
          style={{
            textAnchor: "middle",
            fontSize: "16px",
            fontWeight: "bold",
            fill: theme.text,
          }}
        />
      </YAxis>
      <Label
        angle={-90}
        value="Exercises"
        position="insideLeft"
        style={{ textAnchor: "middle", fill: theme.text }}
      />

      <Tooltip
        contentStyle={{ background: theme.background, borderColor: theme.stroke }}
        itemStyle={{ color: theme.text }}
        labelStyle={{ color: theme.text }}
      />
      <Legend
        wrapperStyle={{
          color: theme.text,
        }}
      />
      <Line type="monotone" dataKey="month" stroke={theme.line} />
    </LineChart>
  </ResponsiveContainer>
  <p className="text-center">You have hit the gym 18 times in may!</p>
    </>
    
  )
}
export default MonthlyWorkouts;


