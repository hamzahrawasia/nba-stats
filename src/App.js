import React, { useState } from "react";
import PlayerStats from './player-stats';
import './App.css';

const api = {
  playerBase: "https://www.balldontlie.io/api/v1/"
}

var years =[]; //create array of all possible seasons that the api has stats available for
for(var i=2020; i>=1979; i--){
  years.push(i);
}

function App() {
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState('');
  const [stats, setStats] = useState({});
  const [playerID, setPlayerID] = useState(0);
  const [playerInfo, setPlayerInfo] = useState({
    name: '',
    position: '',
    teamName: ''
  })
  const [showStats, setShowStats] = useState(false);

  const [statCompare, setStatCompare] = useState({
    ppgCompare: 0,
    rpgCompare: 0,
    apgCompare: 0,
    spgCompare: 0,
    bpgCompare: 0,
    fgCompare: 0,
    threesCompare: 0,
    ftCompare: 0,
    tovCompare: 0

  })
  const [selectSeason, setSelectSeason] = useState(2020); // for the users selection from drop down list

  var years2 =[];
for(var i=2020; i>=1979; i--){
  years2.push(i);
}

  const [query2, setQuery2] = useState('');
  const [stats2, setStats2] = useState({});
  const [playerID2, setPlayerID2] = useState(0);
  const [playerInfo2, setPlayerInfo2] = useState({
    name: '',
    position: '',
    teamName: ''
  })
  const [showStats2, setShowStats2] = useState(false);
  const [statCompare2, setStatCompare2] = useState({
    ppgCompare: 0,
    rpgCompare: 0,
    apgCompare: 0,
    spgCompare: 0,
    bpgCompare: 0,
    fgCompare: 0,
    threesCompare: 0,
    ftCompare: 0,
    tovCompare: 0,

  })
  const [selectSeason2, setSelectSeason2] = useState(2020);


  const search = event => {
    let statistics; // to store array with all the stats for player 1 to avoid async state errors
    if (event.key === "Enter"){
    try{
      fetch(`${api.playerBase}/players?search=${query}`)
      .then(response => response.json())
      .then(data => {
        setQuery('');
        setPlayerID(data.data[0].id);
        setPlayerInfo({name: data.data[0].first_name + ' ' + data.data[0].last_name, 
        position: data.data[0].position,
        teamName: data.data[0].team.full_name
      });
    
      // console.log(data);
      fetch(`${api.playerBase}season_averages?season=${selectSeason}&player_ids[]=${data.data[0].id}`)
      .then(response => response.json())
      .then(data =>{
        setStats(data);
        // statistics = data;
        setShowStats(true);
      
     
        })

         if (showStats2){ // check to see if a second player has already been searched, if true then compare stats between players
          compareValues(data, stats2);
        }
      })
      
    }
    catch{
      setHasError(true);

    }
    }
    }
  
  
  const search2 = event => {
    let statistics2; // to store array with all the stats for player 1 to avoid async state errors
    if (event.key === "Enter"){
      fetch(`${api.playerBase}/players?search=${query2}`)
      .then(response => response.json())
      .then(data => {
        setQuery2('');
        setPlayerID2(data.data[0].id);
        setPlayerInfo2({name: data.data[0].first_name + ' ' + data.data[0].last_name, 
        position: data.data[0].position,
        teamName: data.data[0].team.full_name
      });
      fetch(`${api.playerBase}season_averages?season=${selectSeason2}&player_ids[]=${data.data[0].id}`)
      .then(response => response.json())
        .then(data =>{
          setStats2(data);
         // statistics2 = data;
      // 
      setShowStats2(true);
      if (showStats){ 
        compareValues(stats, data);
      }
      })
      })
      
    }
  }

  const compareValues = (firstStat, secondStat) => { // to pass comparisions to player-stats class to display the numbers as red or green

    if (firstStat.data[0].pts > secondStat.data[0].pts){
      setStatCompare(statCompare => ({...statCompare, ppgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, ppgCompare: 2}));
    } else if(secondStat.data[0].pts > firstStat.data[0].pts){
      setStatCompare(statCompare => ({...statCompare, ppgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, ppgCompare: 1}));
    } 
    if (firstStat.data[0].reb > secondStat.data[0].reb){
      setStatCompare(statCompare =>({...statCompare, rpgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, rpgCompare: 2}));
    } else if(secondStat.data[0].reb > firstStat.data[0].reb){
      setStatCompare(statCompare =>({...statCompare, rpgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, rpgCompare: 1}));
    } 
    if (firstStat.data[0].ast > secondStat.data[0].ast){
      setStatCompare(statCompare =>({...statCompare, apgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, apgCompare: 2}));
    } else if(secondStat.data[0].ast > firstStat.data[0].ast){
      setStatCompare(statCompare =>({...statCompare, apgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, apgCompare: 1}));
    } 
    if (firstStat.data[0].stl > secondStat.data[0].stl){
      setStatCompare(statCompare =>({...statCompare, spgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, spgCompare: 2}));
    } else if(secondStat.data[0].stl > firstStat.data[0].stl){
      setStatCompare(statCompare =>({...statCompare, spgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, spgCompare: 1}));
    } 
    if (firstStat.data[0].blk > secondStat.data[0].blk){
      setStatCompare(statCompare =>({...statCompare, bpgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, bpgCompare: 2}));
    } else if(secondStat.data[0].blk > firstStat.data[0].blk){
      setStatCompare(statCompare =>({...statCompare, bpgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, bpgCompare: 1}));
    } 
    if (firstStat.data[0].fg_pct > secondStat.data[0].fg_pct){
      setStatCompare(statCompare =>({...statCompare, fgCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, fgCompare: 2}));
    } else if(secondStat.data[0].fg_pct > firstStat.data[0].fg_pct){
      setStatCompare(statCompare =>({...statCompare, fgCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, fgCompare: 1}));
    } 
    if (firstStat.data[0].fg3_pct > secondStat.data[0].fg3_pct){
      setStatCompare(statCompare =>({...statCompare, threesCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, threesCompare: 2}));
    } else if(secondStat.data[0].fg3_pct > firstStat.data[0].fg3_pct){
      setStatCompare(statCompare =>({...statCompare, threesCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, threesCompare: 1}));
    } 
    if (firstStat.data[0].ft_pct > secondStat.data[0].ft_pct){
      setStatCompare(statCompare =>({...statCompare, ftCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, ftCompare: 2}));
    } else if(secondStat.data[0].ft_pct > firstStat.data[0].ft_pct){
      setStatCompare(statCompare =>({...statCompare, ftCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, ftCompare: 1}));
    } 
    if (firstStat.data[0].turnover > secondStat.data[0].turnover){
      setStatCompare(statCompare =>({...statCompare, tovCompare: 2}));
      setStatCompare2(statCompare2 =>({...statCompare2, tovCompare: 1}));
    } else if(secondStat.data[0].turnover > firstStat.data[0].turnover){
      setStatCompare(statCompare =>({...statCompare, tovCompare: 1}));
      setStatCompare2(statCompare2 =>({...statCompare2, tovCompare: 2}));
    } 
  }
// function season(e){
//   // var myList=document.getElementById("myList");
//   // setSelectSeason(myList.options[myList.selectedIndex].text);
//   setSelectSeason(e.target.value);
// }
// function season2(){
//   var myList2=document.getElementById("myList2");
//   setSelectSeason2(myList2.options[myList2.selectedIndex].text);
// }

  return (
    <div className='background'>
    <div className="App">
      <div className="wrapper">
        {/* <form className="select-season">
          Select a season:
          <select className="option" id="myList" onChange="season()">
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
          </select>
        </form> */}
        {/* <h1>NBA Stats Comparision</h1> */}
      <div className="search-box">
      <form className="select-season">
          Season:  
          <select id="myList" onChange={e => setSelectSeason(e.target.value)}>
            {years.map((year,index) => // create an option for each value in the years array
          <option key={index}>{year}</option> ) 
          }
            {/* <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option> */}
          </select>
        </form>
        {/* <input
        type="text"
        className="season"
        placeholder="Season..."
        /> */}
         <input
         type="text"
         className="search-bar"
         placeholder="Enter Player Name..."
         onChange={e => setQuery(e.target.value)}
         value={query}
         onKeyPress={search}
         />
       </div>
       <div className="search-box2">
       <form className="select-season2">
          Season:  
          <select id="myList2" onChange={e => setSelectSeason2(e.target.value)}>
          {years2.map((year2,index2) =>
          <option key={index2}>{year2}</option> ) 
          }
            {/* <option>2020</option>
            <option>2019</option>
            <option>2018</option> */}
          </select>
        </form>
       <input
         type="text"
         className="search-bar2"
         placeholder="Enter Player Name..."
         onChange={e => setQuery2(e.target.value)}
         value={query2}
         onKeyPress={search2}
         />
         </div>
         </div>
         {hasError && <h2>Error</h2>}
       <div className="cards-wrapper">
         
           {showStats && <PlayerStats playerInfo={playerInfo} stats={stats} statCompare={statCompare} playerNumber={1} />}
           {showStats2 && <PlayerStats playerInfo={playerInfo2} stats={stats2} statCompare={statCompare2} playerNumber={2}/>}
           </div>
    </div>
    </div>
  );
}

export default App;

// learned to deal with state and the problems with asynchronous state,
// like when trying to access state values to compare the stats, had to call the function after fetching the api and setting values of all variables neeeded