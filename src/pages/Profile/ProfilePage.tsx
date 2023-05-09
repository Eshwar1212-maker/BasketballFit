import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import MonthlyWorkouts from "../../components/MonthlyWorkouts";
import { ThemeContext } from "../../context/ThemeContext";

type MonthToMax = {
  [key: string]: number;
};

interface MonthData {
  month: string;
  days: number;
}


//q:Can you change the state variables in this component(React tsx app), so that all of the months states, and the ones in the useeffect hook, are camelcased with exercises, because i am fetching how many exercises a user made each month, so, you can rewrite january to januaryExercises, and setJanuary to setJanuaryExercises, for all the states, and update them at the end of the useeffect so that the states are set with the right values       
//q:Are you doing it?   



const ProfilePage = () => {
  const today = new Date();
  const [allworkouts, setAllworkouts] = useState<any[]>([]);
  const [createdAccount, setCreatedAccount] = useState<string | undefined>('');
  const { currentUser } = useContext(AuthContext);
  const [intenseMonth, setIntenseMonth] = useState("")
  const [intenseMonthValue, setIntenseMonthValue] = useState(0)
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
        setAllworkouts(workouts);

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

        for (let i = 0; i < workouts.length; i++) {
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('01/2023')) {
            januaryCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('02/2023')) {
            februaryCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('03/2023')) {
            marchCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('04/2023')) {
            aprilCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('05/2023')) {
            mayCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('06/2023')) {
            juneCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('07/2023')) {
            julyCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('08/2023')) {
            augustCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('09/2023')) {
            septemberCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('10/2023')) {
            octoberCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('11/2023')) {
            novemberCount += 1;
          }
          if (dayjs(workouts[i].date).format("MM/YYYY").includes('12/2023')) {
            decemberCount += 1;
          }
        }
        setJanuary(januaryCount)
        setFebruary(februaryCount)
        setMarch(marchCount)
        setApril(aprilCount)
        setMay(mayCount);
        setJune(juneCount)
        setJuly(julyCount)
        setAugust(augustCount)
        setSeptember(septemberCount)
        setOctober(octoberCount)
        setNovember(novemberCount)
        setDecember(decemberCount)
      });
  }, []);

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



  // Format the creation time using dayjs
  const formattedDate = dayjs(currentUser?.metadata.creationTime).format("MM/DD/YYYY");
  // console.log("Created account:  " + createdAccount);
  const theme = {
    background: "#000025",
    text: "#ffffff",
    stroke: "#4d4d4d",
    line: "#82ca9d",
  };



  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };


  let mapMonthToMax: MonthToMax = {
    "january": january,
    "february": february,
    "march": march,
    "april": april,
    "may": may,
    "june": june,
    "july": july,
    "august": august,
    "september": september,
    "october": october,
    "november": november,
    "december": december
  }


  let highestMonth = '';
  let highestValue = 0;



  useEffect(() => {
    function getHighestMonth() {
      for (const month in mapMonthToMax) {
        if (mapMonthToMax[month] > highestValue) {

          highestMonth = month;
          highestValue = mapMonthToMax[month];
          setIntenseMonth(highestMonth)
        }
      }
      setIntenseMonth(highestMonth)
      setIntenseMonthValue(highestValue)

    }
    getHighestMonth()
  }, [mapMonthToMax])





  return (
    <div className="flex flex-wrap justify-center h-full">
      <div 
      className={"w-full md:w-auto py-[100px] my-9 flex items-center flex-col gap-11 justify-center border-2border-black p-4 rounded-2xl px-[70px]"}
      >
        <div className="rounded-2xl border-4 border-slate-500 flex flex-col text-center md:flex-row gap-4 w-full md:w-[600px] shadow-lg">
          <div className="flex items-center flex-col p-3 text-center">
            <img
              className="w-[42px] h-[42px] rounded-3xl"
              src={currentUser?.photoURL ?? ""}
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl">{currentUser?.displayName}</h1>
            <p className="mb-4 text-[12px]">
              Currently logged in as {currentUser?.email}
            </p>
            <button
              onClick={logOut}
              className="py-2 px-4 bg-red-800 rounded-xl text-white"
            >
              Log Out
            </button>
          </div>
          <div className="hidden sm:block border-l border-gray-500"></div>
          <div className="flex flex-col gap-8 py-[80px]">
            <p>Account created on <span className="underline">{formattedDate}</span></p>
          </div>
        </div>
        <div>
          <div>
            
          </div>
        <div className=" justify-center gap-11 text-center">
            <h1 className="text-2xl">Monthly workouts</h1>
            <h1 className="underline">Days you hit the gym each month this year</h1>
          </div>
       <div className=" flex-col justify-center rounded-xl gap-11">
        <div>
        <MonthlyWorkouts />

        </div>

          <div>


          <div className="text-center justify-center gap-11">
            <h1 className="text-2xl">Workout intensity</h1>
            <h1 className="">Total exercises each month</h1>
          </div>
          <div className="hidden lg:flex justify-center rounded-xl">
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
                    value="Total Excericses"
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
          </div>
          <div className="md:hidden">
          <ResponsiveContainer width={360} height={450}>
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
                    value="Total Excericses"
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
          </div>
          {
            allworkouts.length > 100 &&
            <p
              className="text-md text-center max-w-[500px] mx-auto py-6">Currently,
              <span className="font-bold underline">{intenseMonth}</span> {" "}
              is when you had the most volume and intensity for your workouts for this year. You have a total of {allworkouts.length} workouts logged with us. 
            </p>
          }
          {intenseMonthValue === 0 &&
            <>
              <p
                className="text-md text-center max-w-[500px] mx-auto py-6"
              >Welcome to Basketball fit {currentUser?.displayName}! Right now your chart is empty because you did not start using our calender yet!
                add workouts to your calender. You can go over there right now, add a workout for today, and come back here and see the chart change. Volume and intensity are calculated
                based off of how many workouts you totally do.
                You will see over time which months you workout the hardest, and based off of your performacne on the court,
                or just your performance in the gym, you can see what volume your body needs! Navigate here to our <span className="underline"><Link to="/UsersWorkouts">Calender</Link> </span>
                to get started!

              </p>
            </>
          }
          {allworkouts.length < 100 ? (allworkouts.length &&
            <>
              <p
                className="text-md text-center max-w-[500px] mx-auto py-6 text-sm">Currently,{"        "}
                <span className="font-bold underline">{intenseMonth}</span> {"    "}
                is when you had the most volume and intensity for your workouts. However, since you have not been using our platform for that long yet<span className="underline font-semibold">(you have only added {allworkouts.length} {allworkouts.length === 1 ? "exercise" : "exercises"} with us)</span>, you wont be able to
                see what months you have worked out the most. Use our workout  <span className="underline"><Link to="/UsersWorkouts">calender</Link> </span> for at least few months consistently, and based off of how you feel, you can see how much volume your body needs, and
                what months you have been working out the most based off of this chart!
              </p>
            </>)
            : <></>
          }
        </div>
      </div>
      </div>
      </div>

    </div>
  );
};
export default ProfilePage;
