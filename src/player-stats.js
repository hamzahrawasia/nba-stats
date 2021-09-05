import "./player-stats.css";



const PlayerStats = ({playerInfo, stats, statCompare, playerNumber}) => {
    //  debugger;
  return(
    // <div>
        <div className={"stat-card"+playerNumber}>

        <div>
        <h1 className='name-label'>{playerInfo.name}</h1>
        </div>
        <div>
        <h2 className='team-label'>{playerInfo.teamName + " | " + playerInfo.position} </h2>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>PPG: </h3>
        <h3 className={"stat"+statCompare["ppgCompare"]}>{stats.data[0].pts}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>RPG: </h3>
        <h3 className={"stat"+statCompare["rpgCompare"]}>{stats.data[0].reb}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>APG: </h3>
        <h3 className={"stat"+statCompare["apgCompare"]}>{stats.data[0].ast}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>STL: </h3>
        <h3 className={"stat"+statCompare["spgCompare"]}>{stats.data[0].stl}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>BLK: </h3>
        <h3 className={"stat"+statCompare["bpgCompare"]}>{stats.data[0].blk}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>FG%: </h3>
        <h3 className={"stat"+statCompare["fgCompare"]}>{(stats.data[0].fg_pct * 100).toFixed(1)}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>3PT%: </h3>
        <h3 className={"stat"+statCompare["threesCompare"]}>{(stats.data[0].fg3_pct * 100).toFixed(1)}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>FT%: </h3>
        <h3 className={"stat"+statCompare["ftCompare"]}>{(stats.data[0].ft_pct * 100).toFixed(1)}</h3>
        </div>
        {/* <br></br> */}
        <div>
        <h3 className='stat-label'>TO: </h3>
        <h3 className={"stat"+statCompare["tovCompare"]}>{stats.data[0].turnover}</h3>
        </div>
        </div>
        
    // </div> 
  )
}
export default PlayerStats;